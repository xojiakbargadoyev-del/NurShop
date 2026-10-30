"use client";

import { FormEvent } from "react";

export default function AdminLoginPage() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Login form tayyor. Real auth uchun NextAuth konfiguratsiyasi kerak.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">NurShop</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Admin kirish</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="admin@nurshop.uz" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Parol</label>
            <input type="password" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="********" />
          </div>

          <button type="submit" className="w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white">
            Kirish
          </button>
        </form>
      </div>
    </main>
  );
}
