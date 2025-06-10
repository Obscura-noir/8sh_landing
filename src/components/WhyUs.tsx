'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrophyIcon,
  CurrencyDollarIcon,
  BoltIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const advantages = [
  {
    icon: TrophyIcon,
    title: 'Эксперты в российском AI',
    description: 'Сертифицированные партнеры Яндекс, Сбер, VK',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Доступно для МСБ',
    description: 'Проекты от 150 тыс. руб, а не от миллионов',
  },
  {
    icon: BoltIcon,
    title: 'Быстрое внедрение',
    description: 'Первые результаты через 2 недели',
  },
  {
    icon: AcademicCapIcon,
    title: 'Отраслевая экспертиза',
    description: 'Понимаем специфику вашего бизнеса',
  },
  {
    icon: ChartBarIcon,
    title: 'Гарантия результата',
    description: 'ROI от 200% или вернем деньги',
  },
  {
    icon: ShieldCheckIcon,
    title: '100% легально',
    description: 'Полное соответствие 152-ФЗ и требованиям ФСБ',
  },
]

const stats = [
  { value: '50+', label: 'Внедренных проектов' },
  { value: '3.2M', label: 'Средняя экономия в год' },
  { value: '14', label: 'Дней на пилот' },
  { value: '97%', label: 'Клиентов продлевают контракт' },
]

export default function WhyUs() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Почему выбирают Цифровую Лабораторию Каталист
          </h2>
          <p className="text-xl text-gray-600">
            Мы не просто внедряем технологии — мы трансформируем бизнес
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advantages grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <advantage.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Команда экспертов с опытом в топовых компаниях
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Ex-Яндекс
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Ex-Сбер
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Ex-VK
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Ex-Mail.ru
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
