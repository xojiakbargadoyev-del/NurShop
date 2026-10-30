const products = [
  { id: "P-101", name: "AirPods Pro", stock: 48, price: "2 990 000 so‘m" },
  { id: "P-102", name: "Smart TV 55\"", stock: 15, price: "8 950 000 so‘m" },
  { id: "P-103", name: "Mikroto‘lqinli pech", stock: 33, price: "1 950 000 so‘m" }
];

export default function AdminProductsPage() {
  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Mahsulotlar</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Mahsulotlarni boshqarish</h1>
        </div>
        <button className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white">Yangi mahsulot</button>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nomi</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Narx</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Sotuvda</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Harakatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3 text-slate-900">{product.id}</td>
                <td className="px-4 py-3 text-slate-800">{product.name}</td>
                <td className="px-4 py-3 text-slate-700">{product.price}</td>
                <td className="px-4 py-3 text-slate-700">{product.stock}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Tahrirlash</button>
                  <button className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">O‘chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
