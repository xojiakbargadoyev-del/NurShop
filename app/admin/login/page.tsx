"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@nurshop.uz");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setError("Email yoki parol noto‘g‘ri. Iltimos, admin ma’lumotlarini tekshiring.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

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
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="admin@nurshop.uz" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Parol</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="********" required />
          </div>

          {error ? <div className="rounded-xl bg-red-100 p-3 text-sm text-red-700">{error}</div> : null}

          <button type="submit" className="w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white">
            Kirish
          </button>
        </form>
      </div>
    </main>
  );
}
