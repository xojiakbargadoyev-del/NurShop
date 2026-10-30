"use client";

import { useEffect, useMemo, useState } from "react";

const paymentMethods = [
  { value: "BANK_CARD", label: "Bank kartasi" },
  { value: "CASH", label: "Naqd pul" },
  { value: "INSTALLMENT", label: "Bo‘lib to‘lash" }
];

export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("BANK_CARD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("nurshop_cart") || "[]");
    setItems(stored);
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const total = subtotal + 35000;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!items.length) {
      setError("Savat bo‘sh. Avval mahsulot tanlang.");
      return;
    }

    setSubmitting(true);
    setError("");

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        customerPhone,
        customerEmail,
        address,
        notes,
        paymentMethod,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity }))
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Buyurtma yaratishda xatolik yuz berdi.");
      setSubmitting(false);
      return;
    }

    localStorage.setItem("nurshop_customer_email", customerEmail || "");
    localStorage.setItem("nurshop_cart", JSON.stringify([]));
    window.location.href = "/orders";
  };

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-slate-900">Buyurtma berish</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ism</label>
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="Ismingiz" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Telefon</label>
              <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="+998 99 123 45 67" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email (ixtiyoriy)</label>
              <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="name@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Manzil</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="min-h-[110px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="To‘liq manzil" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Izoh</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-[80px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="Qo‘shimcha izoh" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">To‘lov usuli</label>
              <div className="grid gap-3 md:grid-cols-3">
                {paymentMethods.map((method) => (
                  <label key={method.value} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                    <input type="radio" name="paymentMethod" value={method.value} checked={paymentMethod === method.value} onChange={() => setPaymentMethod(method.value)} />
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
            <div className="flex justify-between"><span>Mahsulotlar</span><span>{subtotal.toLocaleString("uz-UZ")} so‘m</span></div>
            <div className="flex justify-between"><span>Yetkazib berish</span><span>35 000 so‘m</span></div>
            <div className="flex justify-between"><span>Jami</span><span className="font-bold text-white">{total.toLocaleString("uz-UZ")} so‘m</span></div>
          </div>

          <div className="mt-6 rounded-2xl bg-blue-500/10 p-4 text-sm text-blue-100">
            Tanlangan to‘lov: <span className="font-semibold text-white">{paymentMethods.find((method) => method.value === paymentMethod)?.label}</span>
          </div>

          {error ? <div className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</div> : null}

          <button type="submit" disabled={submitting} className="mt-8 w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-60">
            {submitting ? "Yuborilmoqda..." : "Buyurtmani tasdiqlash"}
          </button>
        </aside>
      </form>
    </main>
  );
}
