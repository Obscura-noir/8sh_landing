'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const industries = [
  { name: 'Финансы', avgEmployees: 50, avgProcesses: 5, avgSavings: 3.5 },
  { name: 'Строительство', avgEmployees: 75, avgProcesses: 4, avgSavings: 2.8 },
  { name: 'Сельское хозяйство', avgEmployees: 100, avgProcesses: 6, avgSavings: 4.2 },
  { name: 'Розничная торговля', avgEmployees: 40, avgProcesses: 4, avgSavings: 2.5 },
  { name: 'Производство', avgEmployees: 150, avgProcesses: 7, avgSavings: 5.5 },
]

const processes = [
  'Обработка документов',
  'Клиентский сервис',
  'Аналитика и отчетность',
  'Контроль качества',
  'Логистика и планирование',
  'HR и рекрутинг',
]

export default function Calculator() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedIndustry, setSelectedIndustry] = useState(0)
  const [employees, setEmployees] = useState(50)
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>(['Обработка документов'])
  
  const calculateSavings = () => {
    const industry = industries[selectedIndustry]
    const processCount = selectedProcesses.length
    const baseSavings = industry.avgSavings * 1000000
    const employeeFactor = employees / industry.avgEmployees
    const processFactor = processCount / industry.avgProcesses
    
    return Math.round(baseSavings * employeeFactor * processFactor / 100000) * 100000
  }

  const savings = calculateSavings()
  const roi = Math.round((savings / 500000) * 100)
  const paybackPeriod = Math.round(500000 / (savings / 12))

  return (
    <section id="calculator" className="py-20 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Рассчитайте вашу экономию от ИИ
          </h2>
          <p className="text-xl text-gray-600">
            Узнайте потенциальный эффект для вашего бизнеса
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Выберите вашу отрасль
                  </label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {industries.map((industry, idx) => (
                      <option key={idx} value={idx}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество сотрудников: {employees}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="250"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10</span>
                    <span>250</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Процессы для автоматизации
                  </label>
                  <div className="space-y-2">
                    {processes.map((process) => (
                      <label key={process} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedProcesses.includes(process)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProcesses([...selectedProcesses, process])
                            } else {
                              setSelectedProcesses(selectedProcesses.filter(p => p !== process))
                            }
                          }}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-700">{process}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results section */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Ваша потенциальная экономия
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-lg text-white">
                    <p className="text-sm opacity-90">Экономия в год</p>
                    <p className="text-3xl font-bold">
                      {new Intl.NumberFormat('ru-RU').format(savings)} ₽
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className="text-2xl font-bold text-gray-900">{roi}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Окупаемость</p>
                      <p className="text-2xl font-bold text-gray-900">{paybackPeriod} мес.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      * Расчет основан на средних показателях наших клиентов
                    </p>
                    <a href="#contact" className="btn-primary w-full">
                      Получить точный расчет
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
