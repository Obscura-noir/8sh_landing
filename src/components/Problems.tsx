'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { XMarkIcon } from '@heroicons/react/24/outline'

const problems = [
  {
    title: 'Западные AI-сервисы перестали работать в России',
    description: 'ChatGPT, Claude, Midjourney больше недоступны',
  },
  {
    title: 'Российские аналоги кажутся сложными и непонятными',
    description: 'Не знаете, с чего начать и как внедрить',
  },
  {
    title: 'Нет технических специалистов для внедрения',
    description: 'Сложно найти и дорого содержать AI-команду',
  },
  {
    title: 'Страшно инвестировать — вдруг не окупится?',
    description: 'Непонятно, какой будет реальный эффект',
  },
  {
    title: 'Конкуренты уже используют AI, а вы отстаете',
    description: 'Теряете клиентов и упускаете возможности',
  },
]

export default function Problems() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="problems" className="py-20 lg:py-32 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Знакомые проблемы?
          </h2>
          <p className="text-xl text-gray-600">
            Мы понимаем вызовы, с которыми сталкивается ваш бизнес
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <XMarkIcon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
