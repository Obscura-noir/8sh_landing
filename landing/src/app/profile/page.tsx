"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

type Order = {
  id: string;
  user_id: string;
  status: string;
  date: string;
  amount: number;
  currency: string;
  recipient: string;
  sender_name: string;
  sender_tin: string;
  sender_country: string;
  sender_address: string;
  sender_bank: string;
  sender_account: string;
  sender_currency: string;
  receiver_name: string;
  receiver_tin: string;
  receiver_country: string;
  receiver_address: string;
  receiver_bank: string;
  receiver_account: string;
  receiver_currency: string;
  payment_purpose: string;
  payment_amount: string;
  payment_currency: string;
  tnved: string;
  terms: string;
  deadline: string;
  jurisdiction: string;
  bank_restrictions: string;
  created_at?: string;
  updated_at?: string;
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
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order|null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userIdError, setUserIdError] = useState('');

  // Загрузка заявок из Supabase
  useEffect(() => {
    if (tab === 'orders') {
      fetch('/api/orders?user_id=demo-user-id')
        .then(res => res.json())
        .then(data => {
          if (data.ok) setOrders(data.orders);
        });
    }
  }, [tab]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (data?.user?.id) setUserId(data.user.id);
      else setUserIdError('Ошибка авторизации. Войдите заново.');
    });
  }, []);

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
            <button className="mt-4 px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/';
              }}
            >Выйти</button>
          </div>
        )}
        {tab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl flex flex-col items-center">
            <div className="flex w-full justify-between items-center mb-6">
              <div className="text-2xl font-bold">Заявки</div>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700" onClick={() => setShowOrderModal(true)}>Создать новую заявку</button>
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
                    <th className="px-4 py-2 text-left">Действия</th>
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
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-indigo-600 underline" onClick={() => setEditingOrder(o)}>Редактировать</button>
                        <button className="text-red-600 underline" onClick={async () => {
                          await fetch('/api/orders', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: o.id }) });
                          setOrders(orders => orders.filter(ord => ord.id !== o.id));
                        }}>Отменить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <OrderEditModal order={editingOrder} onClose={() => setEditingOrder(null)} onSaved={updated => {
              setOrders(orders => orders.map(o => o.id === updated.id ? updated : o));
              setEditingOrder(null);
            }} />
            <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} onCreated={order => { setOrders([order, ...orders]); setShowOrderModal(false); }} userId={userId} userIdError={userIdError} />
          </div>
        )}
      </main>
    </div>
  );
}

function OrderModal({ open, onClose, onCreated, userId, userIdError }: { open: boolean; onClose: () => void; onCreated: (order: Order) => void; userId: string|null; userIdError: string }) {
  const [form, setForm] = useState({
    sender_name: '',
    sender_tin: '',
    sender_country: '',
    sender_address: '',
    sender_bank: '',
    sender_account: '',
    sender_currency: '',
    receiver_name: '',
    receiver_tin: '',
    receiver_country: '',
    receiver_address: '',
    receiver_bank: '',
    receiver_account: '',
    receiver_currency: '',
    payment_purpose: '',
    payment_amount: '',
    payment_currency: '',
    tnved: '',
    terms: '',
    deadline: '',
    jurisdiction: '',
    bank_restrictions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!userId) {
      setError(userIdError || 'Ошибка: не удалось получить user_id');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user_id: userId }),
      });
      const data = await res.json();
      if (data.ok) {
        onCreated({
          ...form,
          id: data.id,
          user_id: userId,
          status: 'draft',
          date: new Date().toISOString().slice(0, 10),
          amount: Number(form.payment_amount),
          currency: form.payment_currency,
          recipient: form.receiver_name,
        } as Order);
      } else {
        setError(data.error || 'Ошибка');
      }
    } catch {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Создание заявки</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="col-span-2 text-lg font-semibold mb-2">Отправитель</div>
          <input name="sender_name" value={form.sender_name} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Наименование отправителя" required />
          <input name="sender_tin" value={form.sender_tin} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="ИНН отправителя" />
          <input name="sender_country" value={form.sender_country} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Страна отправителя" />
          <input name="sender_address" value={form.sender_address} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Адрес отправителя" />
          <input name="sender_bank" value={form.sender_bank} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Банк отправителя" />
          <input name="sender_account" value={form.sender_account} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Счет отправителя" />
          <input name="sender_currency" value={form.sender_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта отправителя" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Получатель</div>
          <input name="receiver_name" value={form.receiver_name} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Наименование получателя" required />
          <input name="receiver_tin" value={form.receiver_tin} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="ИНН получателя" />
          <input name="receiver_country" value={form.receiver_country} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Страна получателя" />
          <input name="receiver_address" value={form.receiver_address} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Адрес получателя" />
          <input name="receiver_bank" value={form.receiver_bank} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Банк получателя" />
          <input name="receiver_account" value={form.receiver_account} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Счет получателя" />
          <input name="receiver_currency" value={form.receiver_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта получателя" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Детали платежа</div>
          <input name="payment_purpose" value={form.payment_purpose} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Назначение платежа" />
          <input name="payment_amount" value={form.payment_amount} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Сумма" />
          <input name="payment_currency" value={form.payment_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта" />
          <input name="tnved" value={form.tnved} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="ТНВЭД" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Условия платежа</div>
          <input name="terms" value={form.terms} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Условия" />
          <input name="deadline" value={form.deadline} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Крайний срок" type="date" />
          <input name="jurisdiction" value={form.jurisdiction} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Ограничения по юрисдикциям" />
          <input name="bank_restrictions" value={form.bank_restrictions} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Ограничения по банкам" />

          {error && <div className="col-span-2 text-red-600 text-sm">{error}</div>}
          <button type="submit" className="col-span-2 bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60" disabled={loading || !userId}>{loading ? "Создание..." : "Создать заявку"}</button>
        </form>
      </div>
    </div>
  );
}

function OrderEditModal({ order, onClose, onSaved }: { order: Order|null; onClose: () => void; onSaved: (order: Order) => void }) {
  const [form, setForm] = useState(order || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { setForm(order); }, [order]);
  if (!order || !form) return null;
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => f ? { ...f, [e.target.name]: e.target.value } : f);
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.ok) {
        onSaved(form as Order);
      } else {
        setError(data.error || 'Ошибка');
      }
    } catch {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Редактировать заявку</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="col-span-2 text-lg font-semibold mb-2">Отправитель</div>
          <input name="sender_name" value={form.sender_name} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Наименование отправителя" required />
          <input name="sender_tin" value={form.sender_tin} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="ИНН отправителя" />
          <input name="sender_country" value={form.sender_country} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Страна отправителя" />
          <input name="sender_address" value={form.sender_address} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Адрес отправителя" />
          <input name="sender_bank" value={form.sender_bank} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Банк отправителя" />
          <input name="sender_account" value={form.sender_account} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Счет отправителя" />
          <input name="sender_currency" value={form.sender_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта отправителя" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Получатель</div>
          <input name="receiver_name" value={form.receiver_name} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Наименование получателя" required />
          <input name="receiver_tin" value={form.receiver_tin} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="ИНН получателя" />
          <input name="receiver_country" value={form.receiver_country} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Страна получателя" />
          <input name="receiver_address" value={form.receiver_address} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Адрес получателя" />
          <input name="receiver_bank" value={form.receiver_bank} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Банк получателя" />
          <input name="receiver_account" value={form.receiver_account} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Счет получателя" />
          <input name="receiver_currency" value={form.receiver_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта получателя" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Детали платежа</div>
          <input name="payment_purpose" value={form.payment_purpose || ''} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Назначение платежа" />
          <input name="payment_amount" value={form.payment_amount} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Сумма" />
          <input name="payment_currency" value={form.payment_currency} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Валюта" />
          <input name="tnved" value={form.tnved} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="ТНВЭД" />

          <div className="col-span-2 text-lg font-semibold mt-4 mb-2">Условия платежа</div>
          <input name="terms" value={form.terms} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Условия" />
          <input name="deadline" value={form.deadline} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Крайний срок" type="date" />
          <input name="jurisdiction" value={form.jurisdiction} onChange={handleChange} className="border rounded px-3 py-2 col-span-1" placeholder="Ограничения по юрисдикциям" />
          <input name="bank_restrictions" value={form.bank_restrictions} onChange={handleChange} className="border rounded px-3 py-2 col-span-2" placeholder="Ограничения по банкам" />

          {error && <div className="col-span-2 text-red-600 text-sm">{error}</div>}
          <button type="submit" className="col-span-2 bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60" disabled={loading}>{loading ? "Сохранение..." : "Сохранить"}</button>
        </form>
      </div>
    </div>
  );
} 