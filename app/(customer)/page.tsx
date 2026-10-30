import Link from "next/link";
import { ArrowRight, Search, ShoppingBag, User } from "lucide-react";

const featured = [
  { name: "Smart Home", description: "Mahsulotlarni tanlang", href: "/catalog" },
  { name: "Oila uchun", description: "Quyoshli va arzon uskunalar", href: "/catalog" },
  { name: "Yangi mahsulotlar", description: "Eng ko‘p so‘raladiganlar", href: "/catalog" }
];

export default function HomePage() {
  return (
    <main className="bg-slate-50">
      <section className="container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            NurShop • Zamonaviy online-do‘kon
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Hayotingizga <span className="text-blue-600">qulaylik</span> va <span className="text-blue-600">sifat</span> olib keling.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Turli xil elektronika, uy jihozlari va kundalik ehtiyoj buyumlari. Tez yetkazib berish, qulay to‘lov va professional xizmat.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/catalog" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white shadow-soft transition hover:bg-blue-700">
              Katalogni ko‘rish <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-slate-300">
              Biz bilan bog‘lanish
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
            <div>
              <div className="text-2xl font-bold text-slate-900">12k+</div>
              <div>Mijozlar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">350+</div>
              <div>Mahsulot</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <div>Qo‘llab-quvvatlash</div>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-5 shadow-soft">
          <div className="rounded-[24px] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Mavsumli taklif</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">-30% chegirma</h2>
              </div>
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <ShoppingBag size={22} />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {featured.map((item) => (
                <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-blue-100 to-slate-200" />
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Katalog</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Mashhur mahsulotlar</h2>
          </div>
          <Link href="/catalog" className="text-sm font-medium text-blue-600">Barchasini ko‘rish</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[1,2,3].map((item) => (
            <div key={item} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="h-56 rounded-2xl bg-gradient-to-br from-blue-100 to-slate-200" />
              <div className="mt-4">
                <p className="text-sm text-slate-500">Elektronika</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Noutbuk Pro</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">6 990 000 so‘m</span>
                  <button className="rounded-full bg-blue-600 px-3 py-2 text-sm font-medium text-white">Savatga</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
