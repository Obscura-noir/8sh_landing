"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function NewDealPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
    client: '',
    pair: '',
    amount: '',
    rate: '',
    time: '30',
    comment: '',
    sender_country: '',
    recipient_country: '',
    sender_bank: '',
    recipient_bank: '',
    sender_tax_id: '',
    recipient_tax_id: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAgent = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, company, role")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
      setLoading(false);
    };
    checkAgent();
  }, [router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    // TODO: добавить в Supabase таблицу agent_deals
    // await supabase.from('agent_deals').insert([{ ...form, agent_id: profile.id }]);
    setSuccess(true);
    setTimeout(() => router.push('/agents/dashboard'), 1500);
  };

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4">Загрузка...</div>;
  if (!profile) return null;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Новая заявка на обмен</h1>
      <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
        Демо-режим: заявки не сохраняются, данные только для примера.
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Клиент</label>
          <input name="client" value={form.client} onChange={handleChange} className="input w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Валютная пара</label>
          <input name="pair" value={form.pair} onChange={handleChange} className="input w-full border rounded px-3 py-2" placeholder="HP → AED" required />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Сумма</label>
            <input name="amount" value={form.amount} onChange={handleChange} className="input w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Курс</label>
            <input name="rate" value={form.rate} onChange={handleChange} className="input w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Страна отправителя</label>
            <input name="sender_country" value={form.sender_country} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Страна получателя</label>
            <input name="recipient_country" value={form.recipient_country} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Банк отправителя</label>
            <input name="sender_bank" value={form.sender_bank} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Банк получателя</label>
            <input name="recipient_bank" value={form.recipient_bank} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">ИНН отправителя</label>
            <input name="sender_tax_id" value={form.sender_tax_id} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">ИНН получателя</label>
            <input name="recipient_tax_id" value={form.recipient_tax_id} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Комментарий</label>
          <textarea name="comment" value={form.comment} onChange={handleChange} className="input w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Время исполнения</label>
          <select name="time" value={form.time} onChange={handleChange} className="input w-full border rounded px-3 py-2">
            <option value="5">5 мин</option>
            <option value="30">30 мин</option>
            <option value="60">60 мин</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full">Отправить запрос</button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">Заявка отправлена! (демо)</div>}
      </form>
    </div>
  );
} 