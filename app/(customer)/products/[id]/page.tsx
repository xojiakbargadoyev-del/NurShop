"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [params.id]);

  if (!product) {
    return <main className="container py-12">Yuklanmoqda...</main>;
  }

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem("nurshop_cart") || "[]");
    const item = { id: product.id, name: product.name, price: product.price, quantity: 1 };
    const index = existing.findIndex((entry: any) => entry.id === product.id);
    if (index >= 0) {
      existing[index].quantity += 1;
    } else {
      existing.push(item);
    }
    localStorage.setItem("nurshop_cart", JSON.stringify(existing));
    window.location.href = "/cart";
  };

  return (
    <main className="container py-12">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
        <ArrowLeft size={16} /> Katalogga qaytish
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-100 to-slate-200 p-8">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} className="h-[420px] w-full rounded-[24px] object-cover" /> : <div className="h-[420px] rounded-[24px] bg-white/60" />}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">{product.category?.name || "Mahsulot"}</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">{product.name}</h1>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString("uz-UZ")} so‘m</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">{product.stock > 0 ? "Mavjud" : "Mavjud emas"}</span>
          </div>

          <p className="mt-6 text-lg text-slate-600">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={addToCart} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white">
              <ShoppingCart size={18} /> Savatga qo‘shish
            </button>
            <Link href="/checkout" className="rounded-full border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700">
              Buyurtma berish
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
