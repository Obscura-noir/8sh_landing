'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')
    const form = e.currentTarget as typeof e.currentTarget & {
      name: { value: string }
      company: { value: string }
      phone: { value: string }
      telegram: { value: string }
      comment: { value: string }
    }
    const formData = {
      name: form.name.value,
      company: form.company.value,
      phone: form.phone.value,
      telegram: form.telegram.value,
      comment: form.comment.value
    }
    try {
      const res = await fetch('/api/agent-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        setTimeout(() => { setIsModalOpen(false); setStatus('idle') }, 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Background Pattern + SVG Graphics */}
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        {/* Animated Gradient Circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse-slow2"></div>
        {/* SVG Abstract Waves */}
        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="220" fill="url(#glow)" />
          <ellipse cx="300" cy="300" rx="180" ry="60" fill="#3B82F6" fillOpacity="0.07" />
          <ellipse cx="300" cy="300" rx="120" ry="40" fill="#06B6D4" fillOpacity="0.09" />
          <ellipse cx="300" cy="300" rx="60" ry="20" fill="#fff" fillOpacity="0.08" />
        </svg>
        {/* Floating Dots */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full opacity-60 animate-float1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full opacity-50 animate-float2"></div>
        <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-primary rounded-full opacity-40 animate-float3"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <span className="text-primary font-semibold">отправляйте</span>
              <span className="text-gray-600">и получайте</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Международные платежи для бизнеса без ограничений
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
              Платежи без SWIFT в Китай, Турцию и ОАЭ
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Быстрые международные переводы для ВЭД, импорта и экспорта. Обеспечиваем надёжные расчёты по всему миру.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn btn-primary text-lg px-8 py-4">
                Оставить заявку на платёж
              </Link>
              <Link href="/login" className="btn btn-secondary text-lg px-8 py-4">
                Войти
              </Link>
              <button
                className="btn btn-success text-lg px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                style={{ minWidth: 180 }}
                onClick={() => setIsModalOpen(true)}
              >
                Стать Агентом
              </button>
            </div>
          </motion.div>
          {/* Image/Illustration + Glow/Neon effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
              {/* Glow behind icon */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/40 to-secondary/30 rounded-full blur-3xl animate-pulse-slow2 z-0"></div>
              {/* Card Icon with neon border */}
              <div className="relative z-10 w-32 h-32 bg-white rounded-full mx-auto mb-4 shadow-lg flex items-center justify-center border-4 border-primary/30 animate-glow">
                <svg className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="7" y="14" width="2" height="2" rx="1" fill="currentColor" />
                  <rect x="11" y="14" width="2" height="2" rx="1" fill="currentColor" />
                </svg>
              </div>
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white p-4 rounded-lg shadow-lg border border-green-100 animate-float1"
              >
                <p className="text-sm font-semibold text-gray-900">USD → EUR</p>
                <p className="text-2xl font-bold text-success">$5,000</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 bg-white p-4 rounded-lg shadow-lg border border-gray-100 animate-float2"
              >
                <p className="text-sm font-semibold text-gray-900">45+ стран</p>
                <p className="text-xs text-gray-600">Покрытие по всему миру</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Модальное окно */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in border-2 border-green-200">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-3xl" onClick={() => setIsModalOpen(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-center">Заявка на регистрацию агента</h2>
              <form id="agent-form" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Имя Фамилия *</label>
                  <input name="name" type="text" required className="input w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-green-200 transition" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Компания *</label>
                  <input name="company" type="text" required className="input w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-green-200 transition" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Телефон *</label>
                  <input name="phone" type="tel" required className="input w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-green-200 transition" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Telegram *</label>
                  <input name="telegram" type="text" required className="input w-full rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-green-200 transition" />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 font-medium">Комментарий *</label>
                  <textarea name="comment" required className="input w-full min-h-[80px] rounded-xl border-2 border-green-300 focus:border-green-500 focus:ring-green-200 transition" />
                </div>
                <button type="submit" className="btn btn-success w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl" disabled={isLoading}>{isLoading ? 'Отправка...' : 'Отправить заявку'}</button>
              </form>
              {status === 'success' && <div className="text-green-600 text-center mt-3">Заявка отправлена!</div>}
              {status === 'error' && <div className="text-red-600 text-center mt-3">Ошибка отправки. Попробуйте позже.</div>}
            </div>
          </div>
        )}
        {/* После hero-блока — SEO-абзац */}
        <div className="mt-8 max-w-2xl mx-auto text-center text-base text-gray-700">
          Paynix — это современная платформа для международных расчетов, созданная специально для российского бизнеса. Мы помогаем импортерам и экспортерам проводить платежи в 60 стран мира, обходя ограничения традиционных банковских систем. Наша инфраструктура включает десятки корпоративных счетов и прямые договоры с финансовыми институтами по всему миру.
        </div>
        {/* SEO-текстовый блок для повышения плотности ключевых слов */}
        <div className="mt-12 max-w-3xl mx-auto text-gray-700 text-base leading-7 bg-white/80 rounded-xl shadow p-6">
          <strong>Paynix</strong> — это современная платформа для международных платежей и переводов для бизнеса, ВЭД, импорта и экспорта. Мы помогаем компаниям проводить <b>платежи без SWIFT</b> в <b>Китай</b>, <b>Турцию</b>, <b>ОАЭ</b> и ещё 60 стран мира, обходя ограничения и блокировки традиционных банков. Наши решения позволяют легально осуществлять <b>международные переводы для ВЭД</b> с учётом всех требований валютного контроля и законодательства.<br /><br />
          Благодаря прямым договорам с финансовыми институтами и корпоративным счетам в разных юрисдикциях, мы обеспечиваем быстрые расчёты — от 1 дня, с минимальной комиссией и прозрачными тарифами. Для каждого клиента доступен персональный менеджер, который поможет оформить инвойс, подготовить документы и выбрать оптимальный маршрут платежа.<br /><br />
          <b>Paynix</b> — это не только платёжная система, но и образовательный хаб: мы публикуем инструкции, гайды и FAQ по международным переводам, валютному контролю, санкциям и обходу ограничений. Наши клиенты — это более 12 000 компаний, которые уже оценили надёжность, безопасность и скорость работы платформы.<br /><br />
          Если вы ищете легальные альтернативы SWIFT, хотите снизить риски блокировок и санкций, оптимизировать комиссии и тарифы, а также получить экспертную поддержку по ВЭД — <b>Paynix</b> станет вашим надёжным партнёром для международных расчётов.
        </div>
        {/* Визуальный FAQ-блок на главной */}
        <div className="mt-12 max-w-2xl mx-auto bg-gray-50 rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-primary">Часто задаваемые вопросы</h2>
          <div className="mb-4">
            <div className="font-semibold text-gray-900 mb-1">Как быстро проходят международные платежи через Paynix?</div>
            <div className="text-gray-700">Обычно от 1 рабочего дня, в зависимости от страны назначения и валюты. Мы используем прямые каналы и корпоративные счета для ускорения переводов.</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-gray-900 mb-1">Какие документы нужны для перевода?</div>
            <div className="text-gray-700">Для большинства платежей требуется инвойс, контракт и подтверждение назначения платежа. Персональный менеджер поможет собрать все необходимые документы.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Можно ли отправить платеж без SWIFT?</div>
            <div className="text-gray-700">Да, Paynix предлагает альтернативные маршруты для международных переводов без использования SWIFT, что позволяет обходить ограничения и блокировки.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Tailwind animation utilities (add to globals.css or tailwind config):
.animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-pulse-slow2 { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-glow { box-shadow: 0 0 32px 8px #3B82F6AA, 0 0 64px 16px #06B6D455; }
.animate-float1 { animation: float1 7s ease-in-out infinite; }
.animate-float2 { animation: float2 9s ease-in-out infinite; }
.animate-float3 { animation: float3 11s ease-in-out infinite; }
@keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
@keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(14px); } }
@keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
*/
