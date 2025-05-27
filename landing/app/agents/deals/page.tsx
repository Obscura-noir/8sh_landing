"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AgentDealsPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [deals, setDeals] = useState<any[]>([]);
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
      // Получить сделки агента
      const { data: dealsData } = await supabase
        .from('agent_deals')
        .select('*')
        .eq('agent_id', user.id)
        .order('created_at', { ascending: false });
      setDeals(dealsData || []);
      setLoading(false);
    };
    checkAgent();
  }, [router]);

  // Фейковые сделки для демо
  const fakeDeals = [
    { id: 1, client: 'ООО Ромашка', pair: 'USD → EUR', amount: 5000, rate: '1.08', time: 30, status: 'В работе', created_at: new Date().toISOString() },
    { id: 2, client: 'ИП Иванов', pair: 'RUB → AED', amount: 120000, rate: '0.032', time: 60, status: 'Исполнено', created_at: new Date(Date.now()-86400000).toISOString() },
    { id: 3, client: 'LLC Global', pair: 'EUR → USD', amount: 8000, rate: '1.12', time: 5, status: 'Ожидает', created_at: new Date(Date.now()-172800000).toISOString() },
    { id: 4, client: 'ООО Альфа', pair: 'USD → CNY', amount: 20000, rate: '7.25', time: 30, status: 'Отменено', created_at: new Date(Date.now()-259200000).toISOString() },
    { id: 5, client: 'ИП Петров', pair: 'HP → AED', amount: 1000000, rate: '80.07', time: 5, status: 'В работе', created_at: new Date(Date.now()-3600000).toISOString() },
  ];

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4">Загрузка...</div>;
  if (!profile) return null;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Мои сделки</h1>
      {(deals.length === 0 ? fakeDeals : deals).length === 0 ? (
        <div className="text-gray-500">У вас пока нет сделок.</div>
      ) : (
        <table className="min-w-full border text-sm bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Дата</th>
              <th className="border px-2 py-1">Клиент</th>
              <th className="border px-2 py-1">Пара</th>
              <th className="border px-2 py-1">Сумма</th>
              <th className="border px-2 py-1">Курс</th>
              <th className="border px-2 py-1">Время</th>
              <th className="border px-2 py-1">Статус</th>
            </tr>
          </thead>
          <tbody>
            {(deals.length === 0 ? fakeDeals : deals).map(deal => (
              <tr key={deal.id}>
                <td className="border px-2 py-1">{new Date(deal.created_at).toLocaleString('ru-RU')}</td>
                <td className="border px-2 py-1">{deal.client}</td>
                <td className="border px-2 py-1">{deal.pair}</td>
                <td className="border px-2 py-1">{deal.amount}</td>
                <td className="border px-2 py-1">{deal.rate}</td>
                <td className="border px-2 py-1">{deal.time} мин</td>
                <td className="border px-2 py-1">{deal.status || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 