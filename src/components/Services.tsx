'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  CogIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    title: 'AI-аудит и стратегия',
    description: 'Анализируем процессы, находим точки для автоматизации, считаем потенциальную экономию',
    icon: MagnifyingGlassIcon,
    duration: '5 дней',
    price: 'БЕСПЛАТНО',
    features: [
      'Анализ текущих процессов',
      'Карта возможностей AI',
      'Расчет ROI',
      'План внедрения'
    ],
    highlighted: false,
  },
  {
    title: 'Пилотный проект',
    description: 'Выбираем 1 процесс, внедряем AI-решение, обучаем 2-3 сотрудников',
    icon: RocketLaunchIcon,
    duration: '2 недели',
    price: 'от 150 тыс. руб',
    features: [
      'Внедрение на 1 процессе',
      'Настройка AI-модели',
      'Обучение команды',
      'Измерение результатов'
    ],
    highlighted: true,
  },
  {
    title: 'Полное внедрение',
    description: 'Масштабируем на все процессы, интегрируем с вашими системами, обучаем всю команду',
    icon: CogIcon,
    duration: '1-3 месяца',
    price: 'от 500 тыс. руб',
    features: [
      'Внедрение на все процессы',
      'Интеграция с системами',
      'Обучение всей команды',
      'Документация'
    ],
    highlighted: false,
  },
  {
    title: 'Поддержка и развитие',
    description: 'Техническая поддержка 24/7, обновление AI-моделей, добавление новых функций',
    icon: AcademicCapIcon,
    duration: 'Постоянно',
    price: 'от 50 тыс. руб/мес',
    features: [
      'Поддержка 24/7',
      'Обновление моделей',
      'Новые функции',
      'Консультации'
    ],
    highlighted: false,
  },
]

export default function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Как мы внедряем AI в ваш бизнес
          </h2>
          <p className="text-xl text-gray-600">
            От аудита до полной трансформации — выберите подходящий формат
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                service.highlighted
                  ? 'bg-gradient-to-br from-primary to-blue-700 text-white shadow-2xl scale-105'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-secondary text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Популярный выбор
                  </span>
                </div>
              )}
              
              <service.icon className={`w-12 h-12 mb-4 ${
                service.highlighted ? 'text-white' : 'text-primary'
              }`} />
              
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className={`text-sm mb-4 ${
                service.highlighted ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold">{service.price}</span>
              </div>
              <p className={`text-sm mb-6 ${
                service.highlighted ? 'text-blue-100' : 'text-gray-500'
              }`}>
                Срок: {service.duration}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckIcon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      service.highlighted ? 'text-white' : 'text-green-600'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#contact"
                className={`block text-center py-2 px-4 rounded-lg font-medium transition-all ${
                  service.highlighted
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                Выбрать
              </a>
            </motion.div>
          ))}
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
