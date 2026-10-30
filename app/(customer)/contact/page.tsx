export default function ContactPage() {
  return (
    <main className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Aloqa</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Biz bilan bog‘lanish</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Savollar, buyurtma va qo‘llab-quvvatlash bo‘yicha tezkor javobga muhtoj bo‘lsangiz, bizga murojaat qiling.
          </p>

          <div className="mt-8 space-y-5 text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">Telefon</p>
              <p>+998 71 123 45 67</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p>support@nurshop.uz</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Manzil</p>
              <p>Toshkent, Uzbekistan</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Xabar yuborish</h2>
          <div className="mt-5 space-y-4">
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Ismingiz" />
            <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
            <textarea className="min-h-[140px] w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Xabaringiz" />
            <button className="w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white">Yuborish</button>
          </div>
        </section>
      </div>
    </main>
  );
}
