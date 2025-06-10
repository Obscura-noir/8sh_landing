'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckIcon } from '@heroicons/react/24/outline'

const solutions = [
  {
    title: 'Подберем и настроим российские AI под ваши задачи',
    description: 'YandexGPT, GigaChat, Kandinsky — выберем оптимальное решение',
  },
  {
    title: 'Обучим сотрудников работе с новыми инструментами',
    description: 'Проведем тренинги и создадим понятные инструкции',
  },
  {
    title: 'Запустим пилот за 2 недели — увидите результат быстро',
    description: 'Начнем с одного процесса и покажем реальный эффект',
  },
  {
    title: 'Гарантируем экономию от 20% на рутинных операциях',
    description: 'Или вернем деньги — мы уверены в результате',
  },
  {
    title: 'Обеспечим полное соответствие российскому законодательству',
    description: '152-ФЗ, требования ФСБ — все будет легально',
  },
]

export default function Solutions() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="solutions" className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Мы решаем эти проблемы
          </h2>
          <p className="text-xl text-gray-600">
            Комплексный подход к внедрению AI в ваш бизнес
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {solution.title}
                </h3>
                <p className="text-gray-600">
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary text-lg">
            Начать трансформацию
          </a>
        </motion.div>
      </div>
    </section>
  )
}
