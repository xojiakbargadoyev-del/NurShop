"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.products || []);
    if (data.products?.[0]) setCategoryId(data.products[0].categoryId);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl,
        categoryId
      })
    });

    const data = await res.json();
    setMessage(data.message || data.error || "");
    if (res.ok) {
      setName("");
      setSlug("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setImageUrl("");
      loadProducts();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    loadProducts();
  };

  return (
    <main className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Mahsulotlar</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Mahsulotlarni boshqarish</h1>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.3fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-bold text-slate-900">Yangi mahsulot qo‘shish</h2>
          <div className="space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Mahsulot nomi" />
            <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="slug" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Tavsif" />
            <div className="grid gap-4 md:grid-cols-2">
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Narx" />
              <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Sotuvda" />
            </div>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Rasm URL" />
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3">
              <option value="">Kategoriya tanlang</option>
              <option value="elektronika">Elektronika</option>
              <option value="uy-jihozlari">Uy jihozlari</option>
              <option value="maishiy-texnika">Maishiy texnika</option>
            </select>
            <button type="submit" className="w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white">Saqlash</button>
            {message && <p className="text-sm text-red-600">{message}</p>}
          </div>
        </form>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nomi</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Narx</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Sotuvda</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 text-slate-900">{product.name}</td>
                  <td className="px-4 py-3 text-slate-700">{product.price.toLocaleString("uz-UZ")} so‘m</td>
                  <td className="px-4 py-3 text-slate-700">{product.stock}</td>
                  <td className="px-4 py-3">
                    <button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">Tahrirlash</button>
                    <button onClick={() => handleDelete(product.id)} className="ml-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">O‘chirish</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
