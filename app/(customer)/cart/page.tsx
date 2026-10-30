import Link from "next/link";

const cartItems = [
  { name: "AirPods Pro", price: 2990000, quantity: 1 },
  { name: "Smart TV 55\"", price: 8950000, quantity: 1 }
];

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-slate-900">Savat</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-100 to-slate-200" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500">Miqdor: {item.quantity}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{(item.price * item.quantity).toLocaleString('uz-UZ')} so‘m</p>
                <button className="mt-2 text-sm text-red-500">O‘chirish</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-soft">
          <h2 className="text-2xl font-bold">Umumiy</h2>
          <div className="mt-6 space-y-4 text-slate-200">
            <div className="flex justify-between">
              <span>Mahsulotlar</span>
              <span>{total.toLocaleString('uz-UZ')} so‘m</span>
            </div>
            <div className="flex justify-between">
              <span>Yetkazish</span>
              <span>35 000 so‘m</span>
            </div>
            <div className="mt-4 border-t border-slate-700 pt-4 text-xl font-bold text-white">
              <div className="flex justify-between">
                <span>Jami</span>
                <span>{(total + 35000).toLocaleString('uz-UZ')} so‘m</span>
              </div>
            </div>
          </div>

          <Link href="/checkout" className="mt-8 block rounded-full bg-blue-600 px-6 py-3 text-center font-medium text-white">
            Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
