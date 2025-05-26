'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, UserPlus, CreditCard, Send } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Create a Multi-Currency Account in 1 Minute',
    details: ['Only email and phone number required'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    number: 2,
    icon: CreditCard,
    title: 'Fund Your Account Any Way in One Country and Currency',
    details: [
      'Issue invoices to any company domestically or internationally',
      'Transfer within banks or payment systems in any country',
      'Deposit cash at offices in 35+ cities worldwide',
      'Transfer cryptocurrency'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    number: 3,
    icon: Send,
    title: 'Transfer Money to Another Country and Currency',
    details: [
      'Issue invoices to any company domestically or internationally',
      'Transfer within banks or payment systems in any country',
      'Receive cash at office or by courier',
      'Transfer cryptocurrency'
    ],
    color: 'from-green-500 to-emerald-500'
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
            Easy Payments and Transfers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GlobalPay infrastructure includes dozens of corporate and individual accounts 
            in banks and payment systems worldwide, plus cash offices with withdrawal services.
          </p>
          <p className="text-lg font-semibold text-primary mt-4">
            This allows us to solve any payment-related tasks.
          </p>
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
