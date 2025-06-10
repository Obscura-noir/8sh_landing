'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Tab } from '@headlessui/react'
import { 
  BanknotesIcon, 
  BuildingOfficeIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const industries = [
  {
    name: 'Финансы',
    icon: BanknotesIcon,
    solutions: [
      'Автоматический скоринг клиентов (YandexGPT)',
      'ИИ-антифрод система (собственная разработка)',
      'Роботизация отчетности (GigaChat)',
    ],
    case: {
      company: 'МФО "Быстрые деньги"',
      result: 'сократила время одобрения займов с 2 часов до 5 минут',
      metric: '-95% времени',
    },
  },
  {
    name: 'Строительство',
    icon: BuildingOfficeIcon,
    solutions: [
      'Распознавание дефектов на стройке (VisionLabs)',
      'Оптимизация графиков и логистики (ИИ-планировщик)',
      'Автоматизация сметной документации',
    ],
    case: {
      company: 'СК "СтройГарант"',
      result: 'снизила количество переделок на 40%',
      metric: '-40% брака',
    },
  },
  {
    name: 'Сельское хозяйство',
    icon: GlobeAltIcon,
    solutions: [
      'Мониторинг состояния посевов через дроны + ИИ',
      'Прогнозирование урожайности и оптимальных сроков',
      'Умная система полива и удобрений',
    ],
    case: {
      company: 'Агрохолдинг "Нива"',
      result: 'увеличил урожайность на 25%',
      metric: '+25% урожая',
    },
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Industries() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="industries" className="py-20 lg:py-32 bg-gray-50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            ИИ-решения для вашей отрасли
          </h2>
          <p className="text-xl text-gray-600">
            Готовые кейсы и проверенные решения
          </p>
        </motion.div>

        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-center gap-4 mb-12">
            {industries.map((industry) => (
              <Tab
                key={industry.name}
                className={({ selected }) =>
                  classNames(
                    'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all',
                    selected
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  )
                }
              >
                <industry.icon className="w-5 h-5" />
                {industry.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {industries.map((industry, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-8 shadow-xl',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Наши решения для {industry.name.toLowerCase()}
                      </h3>
                      <ul className="space-y-4">
                        {industry.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Реальный кейс
                        </h4>
                        <p className="text-gray-700 mb-4">
                          <span className="font-medium">{industry.case.company}</span>{' '}
                          {industry.case.result}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-bold gradient-text">
                            {industry.case.metric}
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 text-sm text-gray-600">
                              <ClockIcon className="w-4 h-4" />
                              <span>Результат за 1 месяц</span>
                            </div>
                            <div className="flex gap-2 text-sm text-gray-600">
                              <ShieldCheckIcon className="w-4 h-4" />
                              <span>Полностью легально</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
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
