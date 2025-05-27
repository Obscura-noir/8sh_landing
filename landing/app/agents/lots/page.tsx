"use client";
import { useState } from "react";

const fakeLots = [
  {
    id: 305,
    pair: "HP → AED",
    amount: 10000000,
    rate: 80.0695,
    min: 1000000,
    max: 10000000,
    valid_until: "30.06.2025",
    details: {
      nda: "NDA с платформой",
      licenses: "Зерно, Удобрения, General Trading, Commercial Brokers",
      jurisdiction: "ОАЭ",
      citizenship: "Без русского следа – категоричное условие",
      docs: "onboarding компании 1-2 дня",
      who: "Клиент"
    }
  },
  {
    id: 306,
    pair: "HP → USD",
    amount: 5000000,
    rate: 92.1234,
    min: 500000,
    max: 5000000,
    valid_until: "31.12.2024",
    details: {
      nda: "NDA с платформой",
      licenses: "General Trading",
      jurisdiction: "ОАЭ",
      citizenship: "Без ограничений",
      docs: "onboarding 1 день",
      who: "Клиент"
    }
  }
];

export default function LotsPage() {
  const [selected, setSelected] = useState(fakeLots[0]);
  const [form, setForm] = useState({ amount: selected.min, rate: selected.rate, time: '30' });
  const [success, setSuccess] = useState(false);

  const handleSelect = (lot: any) => {
    setSelected(lot);
    setForm({ amount: lot.min, rate: lot.rate, time: '30' });
    setSuccess(false);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="flex gap-6 max-w-7xl mx-auto py-8 px-4">
      {/* Список лотов */}
      <aside className="w-64 bg-white rounded-xl shadow p-4">
        <h2 className="font-bold mb-4">Лоты</h2>
        <ul className="space-y-2">
          {fakeLots.map(lot => (
            <li key={lot.id}>
              <button
                className={`w-full text-left p-2 rounded ${selected.id === lot.id ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelect(lot)}
              >
                <div className="font-semibold">{lot.pair}</div>
                <div className="text-xs text-gray-500">{lot.amount.toLocaleString()} {lot.pair.split('→')[1].trim()}</div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Детали лота и форма */}
      <main className="flex-1 bg-white rounded-xl shadow p-6">
        <div className="mb-4 text-lg font-semibold">ЛОТ #{selected.id} {selected.pair} {selected.amount.toLocaleString()} {selected.pair.split('→')[1].trim()} <span className="text-gray-400 text-base">[{selected.rate}]</span></div>
        <div className="mb-2 text-sm text-gray-500">Лот актуализируется по запросу. Действует до <b>{selected.valid_until}</b></div>
        <form className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 text-center text-xl font-bold">Забронировать</div>
          <div className="mb-3">
            <label className="block mb-1 font-medium">Объём</label>
            <input name="amount" type="number" min={selected.min} max={selected.max} value={form.amount} onChange={handleChange} className="input w-full border rounded px-3 py-2" required />
            <div className="text-xs text-gray-500 mt-1">от {selected.min.toLocaleString()} до {selected.max.toLocaleString()}</div>
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-medium">Курс</label>
            <input name="rate" value={form.rate} onChange={handleChange} className="input w-full border rounded px-3 py-2" required />
            <span className="text-xs text-gray-500 ml-2">Текущий</span>
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-medium">Время бронирования</label>
            <div className="flex gap-2">
              {[5,30,60].map(t => (
                <label key={t} className="flex items-center gap-1">
                  <input type="radio" name="time" value={t} checked={form.time === t.toString()} onChange={handleChange} />
                  <span>{t} мин</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Отправить запрос</button>
          {success && <div className="text-green-600 text-sm mt-2">Заявка отправлена! (демо)</div>}
        </form>
      </main>

      {/* Подробности */}
      <aside className="w-80 bg-white rounded-xl shadow p-4 text-sm">
        <div className="mb-2"><b>NDA:</b> {selected.details.nda}</div>
        <div className="mb-2"><b>Лицензии:</b> {selected.details.licenses}</div>
        <div className="mb-2"><b>Юрисдикция компании:</b> {selected.details.jurisdiction}</div>
        <div className="mb-2"><b>Гражданство директора:</b> {selected.details.citizenship}</div>
        <div className="mb-2"><b>Требования к документам:</b> {selected.details.docs}</div>
        <div className="mb-2"><b>Кто ставит верида акты:</b> {selected.details.who}</div>
      </aside>
    </div>
  );
} 