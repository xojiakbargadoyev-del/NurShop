import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const product = {
  id: "1",
  name: "AirPods Pro",
  price: 2990000,
  description: "Premium audio va qulay ishlash. Quloqchinlar yuqori sifatli ovoz, hissiy bartaraf qilish va ultra qulay dizayn bilan birga keladi.",
  features: ["Noise cancellation", "Wireless connection", "Long battery life", "Fast charging"]
};

export default function ProductDetailPage() {
  return (
    <main className="container py-12">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
        <ArrowLeft size={16} /> Katalogga qaytish
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-100 to-slate-200 p-8">
          <div className="h-[420px] rounded-[24px] bg-white/60" />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Elektronika</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">{product.name}</h1>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString('uz-UZ')} so‘m</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Mavjud</span>
          </div>

          <p className="mt-6 text-lg text-slate-600">{product.description}</p>

          <ul className="mt-6 space-y-3 text-slate-700">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white">
              <ShoppingCart size={18} /> Savatga qo‘shish
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700">
              Buyurtma berish
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
