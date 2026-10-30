const orders = [
  { id: "#1001", date: "12.10.2026", total: "3 200 000 so‘m", status: "Yangi" },
  { id: "#1002", date: "09.10.2026", total: "8 990 000 so‘m", status: "Yetkazilgan" },
  { id: "#1003", date: "05.10.2026", total: "1 150 000 so‘m", status: "Tayyorlanmoqda" }
];

export default function OrdersPage() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold text-slate-900">Mening buyurtmalarim</h1>

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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-slate-900">{order.id}</td>
                <td className="px-6 py-4 text-slate-700">{order.date}</td>
                <td className="px-6 py-4 text-slate-700">{order.total}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
