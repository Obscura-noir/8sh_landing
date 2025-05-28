'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, UserPlus, CreditCard, Send, FileText, CheckCircle, MessageSquare, UploadCloud, Shield } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: FileText,
    title: 'Укажите параметры перевода',
    details: ['Выберите валюту (согласно контракту или инвойсу) и введите сумму. Система предложит варианты исполнения на основе доступных агентов.'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: 2,
    icon: Shield,
    title: 'Выберите подходящее предложение',
    details: [
      'Сравните условия по курсу, комиссии, сроку исполнения, рейтингу и истории работы агента.'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    number: 3,
    icon: CheckCircle,
    title: 'Подпишите договор с платформой',
    details: [
      'Достаточно одного договора с Paynix, чтобы работать со всеми агентами сети — без лишней бюрократии.'
    ],
    color: 'from-green-500 to-emerald-500'
  },
  {
    number: 4,
    icon: UserPlus,
    title: 'Подтвердите заявку',
    details: ['Оформите заявку вручную или через интерфейс платформы — по выбранным вами параметрам. Получите подтверждение от агента.'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: 5,
    icon: UploadCloud,
    title: 'Передайте необходимые документы',
    details: ['Вы можете загрузить оригинал инвойса и другие документы, необходимые для исполнения, напрямую в чате с агентом.'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: 6,
    icon: CreditCard,
    title: 'Оплатите и отслеживайте перевод',
    details: ['Произведите оплату по инструкции и следите за статусом зачисления в личном кабинете. Платформа фиксирует все действия сторон.'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: 7,
    icon: MessageSquare,
    title: 'Общайтесь при необходимости',
    details: ['Встроенный чат с агентом и поддержкой Paynix доступен в интерфейсе. Всё общение зафиксировано и защищено.'],
    color: 'from-blue-500 to-cyan-500'
  }
]

export default function HowItWorksSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <section className="section-padding bg-gray-50" id="how-it-works">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как это работает
          </h2>  
        </motion.div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover-card"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
                      {step.number}
                    </div>
                    <div className="flex items-center space-x-3">
                      <step.icon className="w-8 h-8 text-gray-600" />
                      <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  <button className="text-gray-500">
                    {expandedStep === step.number ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </button>
                </div>

                {expandedStep === step.number && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
