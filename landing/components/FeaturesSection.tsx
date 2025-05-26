'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, CheckCircle, Lock, Plus, Minus } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Скорость',
    description: 'Благодаря нашей инфраструктуре, мы отправляем деньги с местных счетов в стране получателя. В некоторых случаях платежи приходят мгновенно.',
    defaultOpen: true
  },
  {
    icon: Shield,
    title: 'Надёжность',
    description: 'Постоянно строим новые платёжные цепочки с резервами на будущее. Если одно решение перестанет работать — у нас уже есть альтернатива.',
    defaultOpen: false
  },
  {
    icon: CheckCircle,
    title: 'Законность',
    description: 'Для каждой юрисдикции мы создаём легальные платёжные инструменты: платёжные агенты, торговые дома, лицензии MSB. Всё это есть в нашей инфраструктуре.',
    defaultOpen: false
  },
  {
    icon: Lock,
    title: 'Безопасность',
    description: 'Мы всегда ставим безопасность транзакций выше низких комиссий. Это не просто слова, а ежедневная практика — выполняем все обязательства.',
    defaultOpen: false
  }
]

export default function FeaturesSection() {
  const [openFeatures, setOpenFeatures] = useState<number[]>([0])

  const toggleFeature = (index: number) => {
    setOpenFeatures(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="section-padding bg-gray-50" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GlobalPay — это
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleFeature(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      {openFeatures.includes(index) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-600"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-500 ml-4">
                    {openFeatures.includes(index) ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
