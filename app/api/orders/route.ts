import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderSchema } from "@/lib/validations";
import { sendOrderTelegramNotification } from "@/lib/telegram";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json({ orders: [] });
  }

  const orders = await prisma.order.findMany({
    where: { customerEmail: email },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = OrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Validation failed" }, { status: 400 });
  }

  const productIds = parsed.data.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Mahsulotlardan biri topilmadi" }, { status: 400 });
  }

  const productMap = new Map(products.map((product) => [product.id, product]));
  let totalPrice = 0;
  const orderItems: Array<{ productId: string; quantity: number; price: number }> = [];

  for (const item of parsed.data.items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return NextResponse.json({ error: "Mahsulot topilmadi" }, { status: 400 });
    }

    if (item.quantity > product.stock) {
      return NextResponse.json({ error: `${product.name} uchun yetarli mahsulot qolmagan` }, { status: 400 });
    }

    totalPrice += product.price * item.quantity;
    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.price
    });
  }

  const orderNumber = `NS-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        customerName: parsed.data.customerName,
        customerPhone: parsed.data.customerPhone,
        customerEmail: parsed.data.customerEmail || null,
        address: parsed.data.address,
        notes: parsed.data.notes || null,
        paymentMethod: parsed.data.paymentMethod,
        totalPrice: totalPrice + 35000,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: { include: { product: true } } }
    });

    for (const item of orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    return createdOrder;
  });

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    await sendOrderTelegramNotification({
      orderNumber,
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      paymentMethod: parsed.data.paymentMethod,
      totalPrice: totalPrice + 35000,
      items: order.items
    });
  }

  return NextResponse.json({
    message: "Buyurtma saqlandi",
    order,
    paymentStatus: parsed.data.paymentMethod === "BANK_CARD" && !process.env.PAYMENT_PROVIDER_API_KEY
      ? "Bank kartasi tanlandi, lekin to‘lov provayderi serverda konfiguratsiya qilinmagan."
      : "To‘lov usuli qabul qilindi."
  }, { status: 201 });
}
