"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
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
      // Получить статистику агента (пример)
      const { data: statsData } = await supabase.rpc('agent_dashboard_stats', { agent_id: user.id });
      setStats(statsData);
      setLoading(false);
    };
    checkAgent();
  }, [router]);

  if (loading) return <div className="max-w-3xl mx-auto py-12 px-4">Загрузка...</div>;
  if (!profile) return null;

  // Фейковые агрегированные данные
  const fakeStats = {
    active_deals: 2,
    income_month: 1200,
    usd_eur_rate: '1.08',
    total_deals: 5,
    total_amount: 1418000,
    avg_rate: '33.3',
    clients: 4,
    top_pairs: [
      { pair: 'USD → EUR', count: 2 },
      { pair: 'HP → AED', count: 1 },
      { pair: 'USD → CNY', count: 1 },
      { pair: 'RUB → AED', count: 1 },
    ]
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">{stats?.active_deals ?? fakeStats.active_deals}</div>
          <div className="text-gray-500">Активные заявки</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">${stats?.income_month ?? fakeStats.income_month}</div>
          <div className="text-gray-500">Доходность за месяц</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">{stats?.usd_eur_rate ?? fakeStats.usd_eur_rate}</div>
          <div className="text-gray-500">USD/EUR</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">{stats?.total_deals ?? fakeStats.total_deals}</div>
          <div className="text-gray-500">Всего сделок</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">{stats?.total_amount ?? fakeStats.total_amount}</div>
          <div className="text-gray-500">Сумма сделок</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold mb-2">{stats?.avg_rate ?? fakeStats.avg_rate}</div>
          <div className="text-gray-500">Средний курс</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold mb-2">Топ валютные пары</div>
          <ul>
            {(stats?.top_pairs ?? fakeStats.top_pairs).map((p: any) => (
              <li key={p.pair} className="flex justify-between border-b py-1"><span>{p.pair}</span><span className="text-gray-500">{p.count}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold mb-2">Клиентов</div>
          <div className="text-2xl font-bold">{stats?.clients ?? fakeStats.clients}</div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => router.push('/agents/newdeal')}>+ Создать новую заявку</button>
    </div>
  );
} 