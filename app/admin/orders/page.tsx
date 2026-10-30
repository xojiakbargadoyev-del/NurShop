"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const term = search.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerPhone.toLowerCase().includes(term)
      );
    });
  }, [orders, search]);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    loadOrders();
  };

  return (
    <main className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Buyurtmalar</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Barcha buyurtmalar</h1>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:max-w-xs" placeholder="Qidiruv..." />
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Buyurtma</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Mijoz</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Telefon</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">To‘lov</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Holat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 text-slate-900">{order.orderNumber}</td>
                <td className="px-4 py-3 text-slate-700">{order.customerName}</td>
                <td className="px-4 py-3 text-slate-700">{order.customerPhone}</td>
                <td className="px-4 py-3 text-slate-700">{order.paymentMethod}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                  >
                    <option value="PENDING">Yangi</option>
                    <option value="CONFIRMED">Tasdiqlangan</option>
                    <option value="PREPARING">Tayyorlanmoqda</option>
                    <option value="DELIVERED">Yetkazilgan</option>
                    <option value="CANCELLED">Bekor qilingan</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
