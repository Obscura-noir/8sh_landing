'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Заявка и консультация',
    description: 'Обсуждаем задачи и определяем потенциал AI',
    duration: '1 день',
  },
  {
    number: '02',
    title: 'Бесплатный аудит',
    description: 'Анализируем процессы и готовим план внедрения',
    duration: '5 дней',
  },
  {
    number: '03',
    title: 'Пилотный проект',
    description: 'Внедряем первое решение и демонстрируем результаты',
    duration: '2 недели',
  },
  {
    number: '04',
    title: 'Масштабирование',
    description: 'Расширяем на другие процессы и обучаем всю команду',
    duration: '1-3 месяца',
  },
  {
    number: '05',
    title: 'Оптимизация и рост',
    description: 'Улучшаем алгоритмы и добавляем новые возможности',
    duration: 'Постоянно',
  },
]

export default function Process() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="process" className="py-20 lg:py-32 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            5 шагов к AI-трансформации
          </h2>
          <p className="text-xl text-gray-600">
            Прозрачный процесс с измеримыми результатами на каждом этапе
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step content */}
                <div className={`flex-1 ${
                  index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                }`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg ml-16 lg:ml-0">
                    <div className={`flex items-start gap-4 ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {step.description}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {step.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step number */}
                <div className="absolute left-8 lg:left-1/2 w-16 h-16 -translate-x-1/2 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden lg:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary text-lg">
            Начать с бесплатного аудита
          </a>
        </motion.div>
      </div>
    </section>
  )
}
