import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

const products = [
  {
    id: "1",
    name: "AirPods Pro",
    category: "Elektronika",
    price: 2990000,
    description: "Zaruriy audio va qulay wireless funksiyalarga ega premium quloqchinlar."
  },
  {
    id: "2",
    name: "Smart TV 55\"",
    category: "Uy jihozlari",
    price: 8950000,
    description: "Ultra HD, 4K displey va ajoyib tasvir sifati."
  },
  {
    id: "3",
    name: "Mikroto‘lqinli pech",
    category: "Maishiy texnika",
    price: 1950000,
    description: "Samarali ishi, zamonaviy dizayn va ko‘p funksiyalar."
  },
  {
    id: "4",
    name: "Konditsioner Mini",
    category: "Sovutgich",
    price: 6890000,
    description: "Tez sovutish va engil o‘rnatish uchun qulay mahsulot."
  }
];

export default function CatalogPage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Katalog</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Mahsulotlar</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-slate-400" />
            <input placeholder="Qidiruv..." className="ml-2 w-48 border-0 bg-transparent outline-none" />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700">
            <SlidersHorizontal size={18} /> Kategoriya
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {['Barchasi', 'Elektronika', 'Uy jihozlari', 'Maishiy texnika', 'Aksesuarlar'].map((category) => (
          <button key={category} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-600">
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-slate-200" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">{product.price.toLocaleString('uz-UZ')} so‘m</span>
                <Link href={`/products/${product.id}`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                  Batafsil
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
