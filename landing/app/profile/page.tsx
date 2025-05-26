"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PaymentRequest {
  id: string;
  user_id: string;
  status?: string;
  sender_name: string;
  sender_tax_id: string;
  sender_country: string;
  sender_address: string;
  sender_bank_name: string;
  sender_account_number: string;
  sender_swift_bic: string;
  recipient_name: string;
  recipient_tax_id: string;
  recipient_country: string;
  recipient_address: string;
  recipient_bank_name: string;
  recipient_account_number: string;
  recipient_swift_bic: string;
  amount: number;
  currency: string;
  purpose: string;
  hs_code: string;
  execution_date: string;
  additional_conditions: string;
  created_at?: string;
  updated_at?: string;
  completed_at?: string;
  rejection_reason?: string;
}

const initialForm: Omit<PaymentRequest, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'completed_at' | 'rejection_reason' | 'status'> = {
  sender_name: '',
  sender_tax_id: '',
  sender_country: '',
  sender_address: '',
  sender_bank_name: '',
  sender_account_number: '',
  sender_swift_bic: '',
  recipient_name: '',
  recipient_tax_id: '',
  recipient_country: '',
  recipient_address: '',
  recipient_bank_name: '',
  recipient_account_number: '',
  recipient_swift_bic: '',
  amount: 0,
  currency: '',
  purpose: '',
  hs_code: '',
  execution_date: '',
  additional_conditions: '',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ email: string; name?: string; company?: string; id?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmClose, setConfirmClose] = useState(false);
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
      fetchRequests();
    }
    // eslint-disable-next-line
  }, [profile?.id]);

  const fetchRequests = async () => {
    setReqLoading(true);
    const { data, error } = await supabase
      .from('payment_requests')
      .select('*')
      .eq('user_id', profile?.id)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setRequests(data as PaymentRequest[]);
    }
    setReqLoading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    // Простейшая валидация
    if (!form.sender_name || !form.recipient_name || !form.amount || !form.currency) {
      setFormError('Заполните обязательные поля: отправитель, получатель, сумма, валюта');
      return;
    }
    const { error, data } = await supabase.from('payment_requests').insert([
      {
        ...form,
        user_id: profile?.id,
      }
    ]).select();
    if (error) {
      setFormError(error.message);
      return;
    }
    setForm(initialForm);
    setShowModal(false);
    if (data && data[0]) {
      setRequests((prev) => [data[0] as PaymentRequest, ...prev]);
    } else {
      fetchRequests();
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
      <div className="flex gap-4 mb-6">
        <button className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition" onClick={() => setShowModal(true)}>
          Создать новую заявку
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition" onClick={() => setShowRequestsModal(true)}>
          Список заявок
        </button>
      </div>
      {reqLoading ? (
        <div>Загрузка заявок...</div>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 mb-6">У вас пока нет заявок.</div>
      ) : (
        <ul className="mb-8">
          {requests.map(req => (
            <li key={req.id} className="border rounded p-4 mb-3">
              <div><b>Отправитель:</b> {req.sender_name}</div>
              <div><b>Получатель:</b> {req.recipient_name}</div>
              <div><b>Сумма:</b> {req.amount} {req.currency}</div>
              <div><b>Назначение:</b> {req.purpose}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(req.created_at ?? '').toLocaleString('ru-RU')}</div>
            </li>
          ))}
        </ul>
      )}

      {/* Модальное окно создания заявки */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={e => {
            if (e.target === e.currentTarget) setConfirmClose(true);
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setConfirmClose(true)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Создание заявки</h2>
            <form className="space-y-4" onSubmit={handleCreateRequest}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Отправитель</h3>
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_name" placeholder="Наименование отправителя" value={form.sender_name} onChange={handleFormChange} required />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_tax_id" placeholder="ИНН отправителя" value={form.sender_tax_id} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_country" placeholder="Страна отправителя" value={form.sender_country} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_address" placeholder="Адрес отправителя" value={form.sender_address} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_bank_name" placeholder="Банк отправителя" value={form.sender_bank_name} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_account_number" placeholder="Счет отправителя" value={form.sender_account_number} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="sender_swift_bic" placeholder="SWIFT/BIC отправителя" value={form.sender_swift_bic} onChange={handleFormChange} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Получатель</h3>
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_name" placeholder="Наименование получателя" value={form.recipient_name} onChange={handleFormChange} required />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_tax_id" placeholder="ИНН получателя" value={form.recipient_tax_id} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_country" placeholder="Страна получателя" value={form.recipient_country} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_address" placeholder="Адрес получателя" value={form.recipient_address} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_bank_name" placeholder="Банк получателя" value={form.recipient_bank_name} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_account_number" placeholder="Счет получателя" value={form.recipient_account_number} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="recipient_swift_bic" placeholder="SWIFT/BIC получателя" value={form.recipient_swift_bic} onChange={handleFormChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Платёж</h3>
                  <input className="mb-2 w-full border rounded px-3 py-2" name="amount" type="number" placeholder="Сумма" value={form.amount} onChange={handleFormChange} required />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="currency" placeholder="Валюта" value={form.currency} onChange={handleFormChange} required />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="purpose" placeholder="Назначение платежа" value={form.purpose} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="hs_code" placeholder="ТНВЭД" value={form.hs_code} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="execution_date" type="date" placeholder="Дата исполнения" value={form.execution_date} onChange={handleFormChange} />
                  <input className="mb-2 w-full border rounded px-3 py-2" name="additional_conditions" placeholder="Дополнительные условия" value={form.additional_conditions} onChange={handleFormChange} />
                </div>
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition">Создать заявку</button>
            </form>
          </div>
          {/* Модальное подтверждение закрытия */}
          {confirmClose && (
            <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                <div className="mb-4 text-lg">Вы уверены, что хотите закрыть неоформленную заявку?</div>
                <div className="flex justify-center gap-4">
                  <button className="bg-primary text-white px-6 py-2 rounded" onClick={() => { setShowModal(false); setConfirmClose(false); setForm(initialForm); }}>
                    Да
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded" onClick={() => setConfirmClose(false)}>
                    Нет
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Модальное окно списка заявок */}
      {showRequestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl relative overflow-y-auto max-h-[90vh]">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowRequestsModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Существующие заявки</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">Дата</th>
                    <th className="border px-2 py-1">Отправитель</th>
                    <th className="border px-2 py-1">Получатель</th>
                    <th className="border px-2 py-1">Сумма</th>
                    <th className="border px-2 py-1">Валюта</th>
                    <th className="border px-2 py-1">Назначение</th>
                    <th className="border px-2 py-1">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req.id}>
                      <td className="border px-2 py-1">{new Date(req.created_at ?? '').toLocaleString('ru-RU')}</td>
                      <td className="border px-2 py-1">{req.sender_name}</td>
                      <td className="border px-2 py-1">{req.recipient_name}</td>
                      <td className="border px-2 py-1">{req.amount}</td>
                      <td className="border px-2 py-1">{req.currency}</td>
                      <td className="border px-2 py-1">{req.purpose}</td>
                      <td className="border px-2 py-1">{req.status || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 