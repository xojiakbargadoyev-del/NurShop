import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal(""))
});

export const OrderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(5),
  customerEmail: z.string().email().optional().or(z.literal("")),
  address: z.string().min(5),
  notes: z.string().optional(),
  paymentMethod: z.enum(["BANK_CARD", "CASH", "INSTALLMENT"]),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive()
    })
  )
});
