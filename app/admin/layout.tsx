import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 bg-slate-900 p-6 text-white lg:block">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-bold">N</div>
            <div>
              <div className="text-xl font-bold">NurShop</div>
              <div className="text-xs text-slate-400">Admin panel</div>
            </div>
          </div>

          <nav className="space-y-2 text-sm">
            <Link href="/admin" className="block rounded-xl px-3 py-2 hover:bg-slate-800">Dashboard</Link>
            <Link href="/admin/products" className="block rounded-xl px-3 py-2 hover:bg-slate-800">Mahsulotlar</Link>
            <Link href="/admin/orders" className="block rounded-xl px-3 py-2 hover:bg-slate-800">Buyurtmalar</Link>
            <Link href="/" className="block rounded-xl px-3 py-2 hover:bg-slate-800">Website</Link>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-blue-600">NurShop</div>
                <div className="text-xl font-bold">Admin dashboard</div>
              </div>
              <Link href="/api/auth/signout" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Chiqish
              </Link>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
