import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2, "Nomi kamida 2 ta belgi bo‘lishi kerak"),
  slug: z.string().min(2, "Slug kamida 2 ta belgi bo‘lishi kerak"),
  description: z.string().min(10, "Tavsif kamida 10 ta belgi bo‘lishi kerak"),
  price: z.coerce.number().positive("Narx musbat bo‘lishi kerak"),
  stock: z.coerce.number().int("Sotuvdagi mahsulot soni butun son bo‘lishi kerak").nonnegative(),
  categoryId: z.string().min(1, "Kategoriya tanlanishi shart"),
  imageUrl: z.string().url("Rasm URL manzili to‘g‘ri bo‘lishi kerak").optional().or(z.literal(""))
});

export const OrderSchema = z.object({
  customerName: z.string().min(2, "Mijoz ismi kamida 2 ta harf bo‘lishi kerak"),
  customerPhone: z.string().min(5, "Telefon raqami noto‘g‘ri"),
  customerEmail: z.string().email("Email noto‘g‘ri").optional().or(z.literal("")),
  address: z.string().min(5, "Manzil kamida 5 ta belgidan iborat bo‘lishi kerak"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["BANK_CARD", "CASH", "INSTALLMENT"]),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive()
    })
  ).min(1, "Buyurtma kamida bitta mahsulotni o‘z ichiga olishi kerak")
});
