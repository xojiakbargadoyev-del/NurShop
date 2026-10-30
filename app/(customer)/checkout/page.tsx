import Link from "next/link";

const paymentMethods = [
  { value: "BANK_CARD", label: "Bank kartasi" },
  { value: "CASH", label: "Naqd pul" },
  { value: "INSTALLMENT", label: "Bo‘lib to‘lash" }
];

export default function CheckoutPage() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-slate-900">Buyurtma berish</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ism</label>
              <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="Ismingiz" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Telefon</label>
              <input className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="+998 99 123 45 67" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Manzil</label>
              <textarea className="min-h-[110px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="To‘liq manzil" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">To‘lov usuli</label>
              <div className="grid gap-3 md:grid-cols-3">
                {paymentMethods.map((method) => (
                  <label key={method.value} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                    <input type="radio" name="paymentMethod" value={method.value} />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
          <h2 className="text-2xl font-bold">Buyurtma ma’lumotlari</h2>

          <div className="mt-6 space-y-4 text-slate-200">
            <div className="flex justify-between"><span>Mahsulotlar</span><span>11 940 000 so‘m</span></div>
            <div className="flex justify-between"><span>Yetkazib berish</span><span>35 000 so‘m</span></div>
            <div className="flex justify-between"><span>Jami</span><span className="font-bold text-white">11 975 000 so‘m</span></div>
          </div>

          <div className="mt-6 rounded-2xl bg-blue-500/10 p-4 text-sm text-blue-100">
            Tanlangan to‘lov: <span className="font-semibold text-white">Bank kartasi</span>
          </div>

          <button className="mt-8 w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white">
            Buyurtmani tasdiqlash
          </button>
        </aside>
      </div>
    </main>
  );
}
