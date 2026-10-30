"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async (value: string) => {
    const response = await fetch(`/api/orders?email=${encodeURIComponent(value)}`);
    const data = await response.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    const stored = localStorage.getItem("nurshop_customer_email") || "";
    setEmail(stored);
    if (stored) {
      fetchOrders(stored);
    }
  }, []);

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-slate-900">Mening buyurtmalarim</h1>

      <div className="mt-8 flex gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full max-w-md rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email kiriting" />
        <button onClick={() => fetchOrders(email)} className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white">Qidirish</button>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Buyurtma</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sana</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Jami</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.length ? orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-slate-900">{order.orderNumber}</td>
                <td className="px-6 py-4 text-slate-700">{new Date(order.createdAt).toLocaleDateString("uz-UZ")}</td>
                <td className="px-6 py-4 text-slate-700">{order.totalPrice.toLocaleString("uz-UZ")} so‘m</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{order.status}</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Hozircha buyurtma yo‘q.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
