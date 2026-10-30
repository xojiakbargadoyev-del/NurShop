import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  const categoryNames = [
    { name: "Elektronika", slug: "elektronika" },
    { name: "Uy jihozlari", slug: "uy-jihozlari" },
    { name: "Maishiy texnika", slug: "maishiy-texnika" }
  ];

  for (const category of categoryNames) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  const admin = await prisma.user.upsert({
    where: { email: "admin@nurshop.uz" },
    update: {
      passwordHash,
      role: "ADMIN",
      name: "NurShop Admin"
    },
    create: {
      email: "admin@nurshop.uz",
      passwordHash,
      name: "NurShop Admin",
      role: "ADMIN"
    }
  });

  const electronics = await prisma.category.findUnique({
    where: { slug: "elektronika" }
  });

  const homeItems = await prisma.category.findUnique({
    where: { slug: "uy-jihozlari" }
  });

  const household = await prisma.category.findUnique({
    where: { slug: "maishiy-texnika" }
  });

  const sampleProducts = [
    {
      name: "AirPods Pro",
      slug: "airpods-pro",
      description: "Premium audio va qulay ishlash. Noise cancellation va wireless funksiyalarga ega.",
      price: 2990000,
      stock: 24,
      imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
      categoryId: electronics!.id
    },
    {
      name: "Smart TV 55\"",
      slug: "smart-tv-55",
      description: "Ultra HD, 4K displey va kuchli audio bilan zamonaviy smart TV.",
      price: 8950000,
      stock: 11,
      imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
      categoryId: homeItems!.id
    },
    {
      name: "Mikroto‘lqinli pech",
      slug: "mikrotolqinli-pech",
      description: "Tez pishirish, professional dizayn va fon maydonida qulay foydalanish.",
      price: 1950000,
      stock: 18,
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
      categoryId: household!.id
    }
  ];

  for (const product of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }

  console.log("Seeded admin and sample products:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
