"use client";
import Image from "next/image";
import { useState } from "react";

type Order = {
  id: string;
  status: string;
  date: string;
  amount: number;
  currency: string;
  recipient: string;
};

export default function ProfilePage() {
  // TODO: получить реальные данные пользователя через Supabase или context
  const user = {
    name: "Иван",
    company: "ООО Ай Эс Менеджмент",
    role: "Менеджер",
    email: "ivan@example.com",
  };
  // Пример заявок (заглушка)
  const [tab, setTab] = useState<'profile'|'orders'>('profile');
  const [orders, setOrders] = useState<Order[]>([
    // Пример заявки
    // { id: 'REQ-001', status: 'В работе', date: '2024-05-24', amount: 10000, currency: 'USD', recipient: 'ABC Ltd.' },
  ]);

  return (
    <div className="min-h-screen flex bg-[#f9f5f3]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f9f5f3] flex flex-col items-center pt-8 border-r border-gray-200">
        <Image src="/logo-realpay.png" alt="REALPAY" width={160} height={40} className="mb-8" />
        <nav className="flex flex-col gap-4 w-full px-6">
          <button onClick={() => setTab('orders')} className={`text-lg text-left ${tab==='orders' ? 'font-semibold text-indigo-700' : 'text-gray-500'}`}>Заявки</button>
          <button onClick={() => setTab('profile')} className={`text-lg text-left ${tab==='profile' ? 'font-semibold text-indigo-700' : 'text-gray-500'}`}>Профиль</button>
        </nav>
        <div className="mt-auto mb-8 text-xs text-gray-400">
          Пользовательское соглашение
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {tab === 'profile' && (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
            <div className="text-2xl font-bold mb-2">{user.name}</div>
            <div className="text-gray-500 mb-1">{user.company}</div>
            <div className="text-gray-400 mb-4">{user.role}</div>
            <div className="w-full border-t border-gray-100 my-4"></div>
            <div className="w-full flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-gray-600"><span>Email:</span> <span>{user.email}</span></div>
            </div>
            <button className="mt-4 px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Выйти</button>
          </div>
        )}
        {tab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
            <div className="flex w-full justify-between items-center mb-6">
              <div className="text-2xl font-bold">Заявки</div>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Создать новую заявку</button>
            </div>
            {orders.length === 0 ? (
              <div className="text-gray-400 py-16 text-lg">Заявки не найдены</div>
            ) : (
              <table className="w-full text-sm border rounded overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Статус</th>
                    <th className="px-4 py-2 text-left">Дата</th>
                    <th className="px-4 py-2 text-left">Сумма</th>
                    <th className="px-4 py-2 text-left">Получатель</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="px-4 py-2 font-mono">{o.id}</td>
                      <td className="px-4 py-2">{o.status}</td>
                      <td className="px-4 py-2">{o.date}</td>
                      <td className="px-4 py-2">{o.amount} {o.currency}</td>
                      <td className="px-4 py-2">{o.recipient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 