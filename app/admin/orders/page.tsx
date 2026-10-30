const orders = [
  { id: "#1001", customer: "Dilshod M", phone: "+998 90 111 22 33", payment: "Bank kartasi", status: "Yangi" },
  { id: "#1002", customer: "Nazira A", phone: "+998 91 444 55 66", payment: "Naqd pul", status: "Tasdiqlangan" },
  { id: "#1003", customer: "Samandar B", phone: "+998 93 777 88 99", payment: "Bo‘lib to‘lash", status: "Tayyorlanmoqda" }
];

export default function AdminOrdersPage() {
  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Buyurtmalar</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Barcha buyurtmalar</h1>
        </div>
        <input className="w-64 rounded-2xl border border-slate-200 px-4 py-3" placeholder="Qidiruv..." />
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 text-slate-900">{order.id}</td>
                <td className="px-4 py-3 text-slate-700">{order.customer}</td>
                <td className="px-4 py-3 text-slate-700">{order.phone}</td>
                <td className="px-4 py-3 text-slate-700">{order.payment}</td>
                <td className="px-4 py-3">
                  <select className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
                    <option>{order.status}</option>
                    <option>Yangi</option>
                    <option>Tasdiqlangan</option>
                    <option>Tayyorlanmoqda</option>
                    <option>Yetkazilgan</option>
                    <option>Bekor qilingan</option>
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
