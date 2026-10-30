"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pending = orders.filter((order) => order.status === "PENDING").length;
  const delivered = orders.filter((order) => order.status === "DELIVERED").length;

  return (
    <main className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Umumiy ko‘rinish</h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Umumiy daromad</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{totalRevenue.toLocaleString("uz-UZ")} so‘m</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Yangi buyurtmalar</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{pending}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Yetkazilgan</p>
          <p className="mt-3 text-3xl font-bold text-slate-900">{delivered}</p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Oxirgi buyurtmalar</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Buyurtma</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Mijoz</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Jami</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.slice(0, 8).map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-slate-900">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-slate-700">{order.customerName}</td>
                  <td className="px-4 py-3 text-slate-700">{order.totalPrice.toLocaleString("uz-UZ")} so‘m</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
