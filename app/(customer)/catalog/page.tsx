"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Barchasi");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  const categories = ["Barchasi", ...new Set(products.map((product) => product.category?.name || "Boshqa"))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "Barchasi" || product.category?.name === category;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="container py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">Katalog</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">Mahsulotlar</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <span className="text-slate-400">⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Qidiruv..." className="ml-2 w-48 border-0 bg-transparent outline-none" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-medium ${category === item ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-slate-200">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{product.category?.name || "Mahsulot"}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">{product.price.toLocaleString("uz-UZ")} so‘m</span>
                <Link href={`/products/${product.id}`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                  Batafsil
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
