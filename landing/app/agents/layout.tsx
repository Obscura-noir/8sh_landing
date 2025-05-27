"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow mb-8">
        <div className="container flex gap-6 py-4">
          <Link href="/agents/dashboard" className={`font-semibold ${pathname === "/agents/dashboard" ? "text-primary" : "text-gray-700"}`}>Дашборд</Link>
          <Link href="/agents/deals" className={`font-semibold ${pathname === "/agents/deals" ? "text-primary" : "text-gray-700"}`}>Мои сделки</Link>
          <Link href="/agents/newdeal" className={`font-semibold ${pathname === "/agents/newdeal" ? "text-primary" : "text-gray-700"}`}>Новая сделка</Link>
          <Link href="/agents/lots" className={`font-semibold ${pathname === "/agents/lots" ? "text-primary" : "text-gray-700"}`}>Лоты</Link>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
} 