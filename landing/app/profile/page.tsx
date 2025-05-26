"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Application {
  id: number;
  user_id: string;
  amount: number;
  currency: string;
  comment: string;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ email: string; name?: string; company?: string; id?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [appLoading, setAppLoading] = useState(false);
  const [form, setForm] = useState({ amount: '', currency: '', comment: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const { email, user_metadata, id } = user;
      setProfile({
        email: email || '',
        name: user_metadata?.name || '',
        company: user_metadata?.company || '',
        id
      });
      setLoading(false);
    };
    getProfile();
  }, [router]);

  useEffect(() => {
    if (profile?.id) {
      fetchApplications();
    }
    // eslint-disable-next-line
  }, [profile?.id]);

  const fetchApplications = async () => {
    setAppLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', profile?.id)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setApplications(data as Application[]);
    }
    setAppLoading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!form.amount || !form.currency) {
      setFormError('Заполните все обязательные поля');
      return;
    }
    const { error, data } = await supabase.from('applications').insert([
      {
        user_id: profile?.id,
        amount: Number(form.amount),
        currency: form.currency,
        comment: form.comment
      }
    ]).select();
    if (error) {
      setFormError(error.message);
      return;
    }
    setForm({ amount: '', currency: '', comment: '' });
    // Добавляем новую заявку в начало списка
    if (data && data[0]) {
      setApplications((prev) => [data[0] as Application, ...prev]);
    } else {
      fetchApplications();
    }
  };

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4">Загрузка...</div>;
  if (!profile) return null;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Профиль</h1>
      <div className="mb-4"><b>Email:</b> {profile.email}</div>
      <div className="mb-4"><b>Имя:</b> {profile.name}</div>
      <div className="mb-4"><b>Компания:</b> {profile.company}</div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Мои заявки</h2>
      {appLoading ? (
        <div>Загрузка заявок...</div>
      ) : applications.length === 0 ? (
        <div className="text-gray-500 mb-6">У вас пока нет заявок.</div>
      ) : (
        <ul className="mb-8">
          {applications.map(app => (
            <li key={app.id} className="border rounded p-4 mb-3">
              <div><b>Сумма:</b> {app.amount} {app.currency}</div>
              <div><b>Комментарий:</b> {app.comment || '—'}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(app.created_at).toLocaleString('ru-RU')}</div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-bold mb-2">Создать новую заявку</h2>
      <form className="space-y-4 mb-8" onSubmit={handleCreateApplication}>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="amount">Сумма</label>
          <input type="number" id="amount" name="amount" value={form.amount} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="currency">Валюта</label>
          <input type="text" id="currency" name="currency" value={form.currency} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="comment">Комментарий</label>
          <textarea id="comment" name="comment" value={form.comment} onChange={handleFormChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
        </div>
        {formError && <div className="text-red-500 text-sm">{formError}</div>}
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition">Создать заявку</button>
      </form>
    </div>
  );
} 