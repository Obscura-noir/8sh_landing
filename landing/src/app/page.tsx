"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const personas = {
  freelancer: {
    headline: "Международные платежи для фрилансеров с умной оптимизацией",
    sub: "Быстро, дешево, без банковских сложностей. Получите персональную рекомендацию за 30 секунд!",
    cta: "Рассчитать стоимость для фрилансера",
    color: "bg-indigo-600",
  },
  business: {
    headline: "Платежи для бизнеса: надежно и прозрачно",
    sub: "Стабильные маршруты, минимальные риски, прозрачные условия. Получите корпоративную рекомендацию!",
    cta: "Создать корпоративную заявку",
    color: "bg-green-600",
  },
  crypto: {
    headline: "DeFi и стейблкоины для инвесторов",
    sub: "Стабильная доходность, быстрый доступ к DeFi, подбор лучших программ.",
    cta: "Узнать о стейблкоин-программах",
    color: "bg-yellow-500",
  },
  general: {
    headline: "Международные платежи с умной оптимизацией",
    sub: "Сравните 50+ способов перевода и получите персональную рекомендацию за 30 секунд.",
    cta: "Получить рекомендацию",
    color: "bg-indigo-600",
  },
};

function detectPersona() {
  if (typeof window === "undefined") return "general";
  const url = new URL(window.location.href);
  const utm = url.searchParams.get("utm_source") || "";
  const ref = document.referrer || "";
  const campaign = url.searchParams.get("utm_campaign") || "";
  if (utm.includes("freelance") || /upwork|freelancer/i.test(ref)) return "freelancer";
  if (utm.includes("business") || navigator.language === "en") return "business";
  if (campaign.includes("crypto")) return "crypto";
  return "general";
}

export default function LandingPage() {
  const [persona, setPersona] = useState<keyof typeof personas>("general");
  const [showModal, setShowModal] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login'|'register'>('login');
  useEffect(() => {
    setPersona(detectPersona() as keyof typeof personas);
  }, []);
  const p = personas[persona];

  // Функция для отправки заявки в Telegram (заглушка)
  async function sendToTelegram(data: { name: string; company: string; contact: string; comment: string }) {
    // TODO: заменить на реальный endpoint Telegram-бота
    await fetch("/api/send-corp-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  function handleCorporateClick() {
    setShowModal(true);
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-indigo-600">8sh</span>
          <span className="text-gray-700">.ru</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#solutions" className="hover:text-indigo-600">Решения</a>
          <a href="#pricing" className="hover:text-indigo-600">Тарифы</a>
          <a href="#reviews" className="hover:text-indigo-600">Отзывы</a>
          <a href="#faq" className="hover:text-indigo-600">FAQ</a>
          <a href="#contact" className="hover:text-indigo-600">Контакты</a>
        </nav>
        <a href="#" className="px-4 py-2 rounded-md border font-semibold text-indigo-600 border-indigo-600 hover:bg-indigo-50" onClick={e => {e.preventDefault(); setShowAuth(true); setAuthMode('login')}}>Войти</a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{p.headline}</h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-4">{p.sub}</p>
          <ul className="space-y-2 text-base md:text-lg">
            <li>✅ Комиссии от 0.5%</li>
            <li>✅ Переводы от 10 минут</li>
            <li>✅ Система подбирает лучший маршрут</li>
            <li>✅ 50+ валют и способов</li>
          </ul>
          {p.cta === "Создать корпоративную заявку" ? (
            <button className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition ${p.color} hover:opacity-90`} onClick={handleCorporateClick}>{p.cta}</button>
          ) : (
            <button className={`mt-6 px-6 py-3 rounded-lg text-white font-semibold text-lg shadow-lg transition ${p.color} hover:opacity-90`}>{p.cta}</button>
          )}
          <div className="mt-4 text-gray-500 text-sm">💬 Уже помогли 5,000+ пользователям · ⭐⭐⭐⭐⭐ 4.8/5</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          {/* Иллюстрация/Smart Robot — можно заменить на SVG/картинку */}
          <div className="w-64 h-64 bg-gradient-to-br from-indigo-100 to-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-7xl">🤖</span>
          </div>
          {/* Калькулятор (stub/demo) */}
          <AICalculator />
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="solutions" className="bg-white py-12 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">❌ Знакомо?</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Банк задерживает перевод на недели</li>
              <li>• Скрытые комиссии съедают 3-5% суммы</li>
              <li>• Часами ищете надежного агента</li>
              <li>• Боитесь потерять деньги из-за санкций</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">✅ 8sh решает эти проблемы:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Система находит самый выгодный маршрут за 30 секунд</li>
              <li>• Прозрачные тарифы без скрытых комиссий</li>
              <li>• Только проверенные провайдеры с рейтингом 4.5+</li>
              <li>• Соответствие всем требованиям валютного законодательства</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Showcase Smart Features */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">🤖 Smart-возможности платформы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard title="Калькулятор" desc="Мгновенно рассчитывает лучшие маршруты перевода с учетом комиссии, скорости и надежности."/>
          <FeatureCard title="Smart Routing" desc="Система анализирует 50+ способов и выбирает оптимальный путь для вашей задачи."/>
          <FeatureCard title="Персонализация" desc="Контент и рекомендации подстраиваются под ваш профиль и цели."/>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="pricing" className="bg-white py-12 px-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center">📊 Сравнение с конкурентами</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Платформа</th>
                <th className="px-4 py-2">Комиссия</th>
                <th className="px-4 py-2">Скорость</th>
                <th className="px-4 py-2">Рекомендации</th>
                <th className="px-4 py-2">Отзывы</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-semibold">8sh.ru</td>
                <td className="px-4 py-2 text-green-600 font-bold">от 0.5%</td>
                <td className="px-4 py-2">от 10 минут</td>
                <td className="px-4 py-2">✅</td>
                <td className="px-4 py-2">4.8/5</td>
              </tr>
              <tr>
                <td className="px-4 py-2">RealPay</td>
                <td className="px-4 py-2">1.5-3%</td>
                <td className="px-4 py-2">1-7 дней</td>
                <td className="px-4 py-2">❌</td>
                <td className="px-4 py-2">4.2/5</td>
              </tr>
              <tr>
                <td className="px-4 py-2">SWIFT</td>
                <td className="px-4 py-2">2-5%</td>
                <td className="px-4 py-2">2-10 дней</td>
                <td className="px-4 py-2">❌</td>
                <td className="px-4 py-2">3.9/5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Social Proof & Reviews */}
      <section id="reviews" className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">🏆 Доверие и отзывы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ReviewCard name="Александр, фрилансер" text="Переводы стали быстрее и дешевле, чем через банк. Система реально помогает!"/>
          <ReviewCard name="Елена, директор" text="Для бизнеса — находка. Прозрачные условия, никаких скрытых комиссий."/>
          <ReviewCard name="Максим, инвестор" text="Подбор DeFi-программ — топ! Доходность выше, чем на бирже."/>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-12 px-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center">❓ Часто задаваемые вопросы</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <FAQItem q="Как работает калькулятор?" a="Он анализирует параметры перевода и подбирает оптимальный маршрут по комиссиям, скорости и надежности."/>
          <FAQItem q="Это легально?" a="Да, все маршруты соответствуют валютному законодательству и проходят compliance-проверку."/>
          <FAQItem q="Какие валюты поддерживаются?" a="Более 50 валют, включая USD, EUR, CNY, USDT и др."/>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t mt-8">© 2024 8sh.ru — Международные платежи с умной оптимизацией</footer>

      <AuthModal open={showAuth} mode={authMode} onClose={() => setShowAuth(false)} onSwitchMode={m => setAuthMode(m)} />
      <CorporateModal open={showModal} onClose={() => setShowModal(false)} onSubmit={sendToTelegram} />
    </div>
  );
}

function AICalculator() {
  const [from, setFrom] = useState("Россия");
  const [to, setTo] = useState("Китай");
  const [amount, setAmount] = useState(10000);
  const [currency, setCurrency] = useState("USD");
  // Stub recommendations
  const recs = [
    { label: "Crypto-bridge", fee: "0.8%", time: "15 мин", result: 9920 },
    { label: "Bank Transfer", fee: "1.2%", time: "2 дня", result: 9880 },
    { label: "Payment Agent", fee: "1.5%", time: "4 часа", result: 9850 },
  ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 className="font-bold text-lg mb-4">🧮 Калькулятор перевода</h3>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2">
          <input value={from} onChange={e => setFrom(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Откуда" />
          <input value={to} onChange={e => setTo(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Куда" />
        </div>
        <div className="flex gap-2">
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="border rounded px-2 py-1 w-1/2" placeholder="Сумма" />
          <input value={currency} onChange={e => setCurrency(e.target.value)} className="border rounded px-2 py-1 w-1/2" placeholder="Валюта" />
        </div>
      </div>
      <div className="text-gray-500 text-xs mb-2">🤖 Система анализирует 50+ способов...</div>
      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        {recs.map((r, i) => (
          <div key={i} className="flex justify-between items-center py-1 text-sm">
            <span className="font-medium">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {r.label}</span>
            <span>{r.fee} · {r.time} · <span className="font-bold">${r.result.toLocaleString()}</span></span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Создать заявку</button>
        <button className="flex-1 px-3 py-2 rounded border font-semibold hover:bg-gray-100">Сравнить все</button>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
      <div className="font-bold">{name}</div>
      <div className="text-gray-600">{text}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 bg-gray-50 cursor-pointer" onClick={() => setOpen(o => !o)}>
      <div className="font-semibold flex items-center justify-between">
        {q}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && <div className="mt-2 text-gray-700">{a}</div>}
    </div>
  );
}

function CorporateModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: { name: string; company: string; contact: string; comment: string }) => Promise<void> }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit({ name, company, contact, comment });
      setSuccess(true);
      setName(""); setCompany(""); setContact(""); setComment("");
    } catch {
      setError("Ошибка отправки. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Заявка на корпоративное подключение</h2>
        {success ? (
          <div className="text-green-600 font-semibold text-center py-8">Спасибо! Ваша заявка отправлена.</div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input required value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Фамилия Имя" />
            <input required value={company} onChange={e => setCompany(e.target.value)} className="border rounded px-3 py-2" placeholder="Компания" />
            <input required value={contact} onChange={e => setContact(e.target.value)} className="border rounded px-3 py-2" placeholder="Telegram или email" />
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="border rounded px-3 py-2" placeholder="Комментарий" rows={3} />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60" disabled={loading}>{loading ? "Отправка..." : "Отправить заявку"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

function AuthModal({ open, mode, onClose, onSwitchMode }: { open: boolean; mode: 'login'|'register'; onClose: () => void; onSwitchMode: (m: 'login'|'register') => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Сброс формы при каждом открытии
  useEffect(() => {
    if (open) {
      setSuccess(false);
      setError("");
      setEmail("");
      setPassword("");
      setName("");
      setCompany("");
    }
  }, [open, mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const body: any = { email, password, mode };
      if (mode === 'register') {
        body.name = name;
        body.company = company;
      }
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.ok) {
        if (mode === 'login') {
          setSuccess(true);
          setTimeout(() => { onClose(); window.open('/profile', '_blank'); }, 1000);
        } else {
          setSuccess(true);
        }
        setEmail(""); setPassword(""); setName(""); setCompany("");
      } else {
        setError(data.error || "Ошибка");
      }
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg flex w-full max-w-2xl relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-100 rounded-l-xl">
          <Image src="/login-demo.png" alt="Demo" width={320} height={320} className="object-contain" />
        </div>
        <div className="flex-1 flex flex-col justify-center p-8">
          <h2 className="text-xl font-bold mb-4 text-center">{mode === 'login' ? 'Войти' : 'Регистрация'}</h2>
          {success ? (
            <div className="text-green-600 font-semibold text-center py-8">Успешно!</div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" placeholder="Email" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded px-3 py-2" placeholder="Пароль" />
              {mode === 'register' && (
                <>
                  <input required value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Имя пользователя" />
                  <input required value={company} onChange={e => setCompany(e.target.value)} className="border rounded px-3 py-2" placeholder="Компания" />
                </>
              )}
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2 font-semibold hover:bg-indigo-700 transition disabled:opacity-60" disabled={loading}>{loading ? (mode === 'login' ? 'Вход...' : 'Регистрация...') : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}</button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <>
                Нет аккаунта? <button className="underline text-indigo-600" onClick={() => onSwitchMode('register')}>Зарегистрироваться</button>
              </>
            ) : (
              <>
                Уже есть аккаунт? <button className="underline text-indigo-600" onClick={() => onSwitchMode('login')}>Войти</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
