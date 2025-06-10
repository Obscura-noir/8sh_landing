'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: 'Сколько стоит внедрение AI?',
    answer: 'Стоимость зависит от масштаба проекта. Пилотное внедрение на один процесс стоит от 150 тыс. руб, полная трансформация — от 500 тыс. руб. Но сначала мы проводим бесплатный аудит, чтобы точно рассчитать стоимость и ROI для вашего бизнеса.',
  },
  {
    question: 'Какие российские AI вы используете?',
    answer: 'Мы работаем с лучшими российскими решениями: YandexGPT для обработки текста, GigaChat от Сбера для диалоговых систем, Kandinsky для генерации изображений, VisionLabs для компьютерного зрения. Выбор конкретного решения зависит от ваших задач.',
  },
  {
    question: 'Нужны ли технические специалисты с нашей стороны?',
    answer: 'Нет, не нужны. Мы берем на себя всю техническую часть: настройку, интеграцию, поддержку. Ваша задача — только использовать готовые инструменты. Мы также обучаем ваших сотрудников работе с AI.',
  },
  {
    question: 'Как быстро окупятся инвестиции?',
    answer: 'В среднем наши проекты окупаются за 3-6 месяцев. Мы гарантируем минимальную экономию 20% на автоматизированных процессах. Если ROI будет меньше 200% — вернем деньги.',
  },
  {
    question: 'Безопасны ли российские AI для конфиденциальных данных?',
    answer: 'Абсолютно безопасны. Все решения соответствуют требованиям 152-ФЗ о персональных данных и прошли сертификацию ФСБ. Данные хранятся на российских серверах, возможна работа в закрытом контуре вашей компании.',
  },
]

export default function FAQ() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Частые вопросы
          </h2>
          <p className="text-xl text-gray-600">
            Отвечаем на важные вопросы о внедрении AI
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-6 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Остались вопросы? Мы готовы на них ответить
          </p>
          <a href="#contact" className="btn-secondary">
            Задать вопрос
          </a>
        </motion.div>
      </div>
    </section>
  )
}
