const stats = [
  { label: "Umumiy daromad", value: "48.2 mln so‘m" },
  { label: "Buyurtmalar", value: "124" },
  { label: "Mijozlar", value: "3,480" },
  { label: "Mahsulotlar", value: "350" }
];

const recentOrders = [
  { id: "#1041", customer: "Zarina S", total: "1 560 000", status: "Yangi" },
  { id: "#1042", customer: "Anvar T", total: "2 990 000", status: "Tasdiqlangan" },
  { id: "#1043", customer: "Madina K", total: "420 000", status: "Tayyorlanmoqda" }
];

export default function AdminDashboardPage() {
  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Umumiy ko‘rinish</h1>
        </div>
        <button className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white">Yangi buyurtma</button>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Oxirgi buyurtmalar</h2>
          <button className="text-sm font-medium text-blue-600">Barchasini ko‘rish</button>
        </div>

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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-slate-900">{order.id}</td>
                  <td className="px-4 py-3 text-slate-700">{order.customer}</td>
                  <td className="px-4 py-3 text-slate-700">{order.total} so‘m</td>
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
