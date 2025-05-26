'use client'

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.replace('/profile');
    }
  }, [success, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">Пароль</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center mt-2">Успешный вход!</p>}
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Нет аккаунта? <a href="/register" className="text-primary hover:underline">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
} 