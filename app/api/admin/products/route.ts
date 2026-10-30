import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validations";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ProductSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Validation failed" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      ...parsed.data,
      price: Number(parsed.data.price),
      stock: Number(parsed.data.stock)
    }
  });

  return NextResponse.json({ message: "Mahsulot yaratildi", product }, { status: 201 });
}
