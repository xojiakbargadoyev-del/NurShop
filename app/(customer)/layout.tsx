import Link from "next/link";
import { ShoppingBag, Search, User } from "lucide-react";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
              N
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-900">NurShop</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/">Bosh sahifa</Link>
            <Link href="/catalog">Katalog</Link>
            <Link href="/cart">Savat</Link>
            <Link href="/orders">Buyurtmalar</Link>
            <Link href="/contact">Aloqa</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/catalog" className="rounded-full border border-slate-200 bg-white p-2 text-slate-700">
              <Search size={18} />
            </Link>
            <Link href="/cart" className="rounded-full border border-slate-200 bg-white p-2 text-slate-700">
              <ShoppingBag size={18} />
            </Link>
            <Link href="/admin/login" className="rounded-full bg-blue-600 p-2 text-white">
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="container grid gap-8 py-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">NurShop</h3>
            <p className="mt-3 text-slate-600">Modern, reliable and premium online shopping experience.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Navigatsiya</h4>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li><Link href="/catalog">Mahsulotlar</Link></li>
              <li><Link href="/orders">Buyurtmalar</Link></li>
              <li><Link href="/contact">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Kontakt</h4>
            <ul className="mt-3 space-y-2 text-slate-600">
              <li>+998 71 123 45 67</li>
              <li>support@nurshop.uz</li>
              <li>Toshkent, O‘zbekiston</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
