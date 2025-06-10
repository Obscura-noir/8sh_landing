'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const industries = [
  'Финансы',
  'Строительство',
  'Сельское хозяйство',
  'Розничная торговля',
  'Производство',
  'Другое',
]

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    industry: '',
    process: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // You would typically send this to your backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Готовы автоматизировать бизнес с российским AI?
          </h2>
          <p className="text-xl text-gray-300">
            Получите бесплатный AI-аудит за 5 дней
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Компания *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                    placeholder="ООО Компания"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                    placeholder="+7 (999) 999-99-99"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                    placeholder="email@company.ru"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-2">
                  Отрасль *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                >
                  <option value="">Выберите отрасль</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="process" className="block text-sm font-medium mb-2">
                  Какой процесс хотите автоматизировать?
                </label>
                <textarea
                  id="process"
                  name="process"
                  rows={4}
                  value={formData.process}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Опишите процесс или задачу, которую хотите решить с помощью AI"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Получить бесплатный AI-аудит
              </button>

              <p className="text-sm text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="#" className="text-primary hover:text-blue-400 underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Или свяжитесь с нами напрямую
              </h3>
              <div className="space-y-4">
                <a href="tel:+74951234567" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <PhoneIcon className="w-6 h-6 text-primary" />
                  <span>+7 (495) 123-45-67</span>
                </a>
                <a href="mailto:info@catalyst-lab.ru" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <EnvelopeIcon className="w-6 h-6 text-primary" />
                  <span>info@catalyst-lab.ru</span>
                </a>
                <div className="flex items-start gap-4 text-gray-300">
                  <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <span>Москва, ул. Тверская, д. 1</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">
                Что вы получите после заявки:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Консультацию AI-эксперта в течение 24 часов</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Детальный аудит ваших процессов за 5 дней</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">План внедрения AI с расчетом экономии</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">3 варианта решений под ваш бюджет</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
