'use client'

import { motion } from 'framer-motion'
import { 
  Building, 
  FileText, 
  Truck, 
  Bitcoin,
  ArrowRightLeft,
  CreditCard,
  Globe,
  Banknote
} from 'lucide-react'

const paymentMethods = [
  {
    icon: ArrowRightLeft,
    title: 'Bank or Payment System Transfers',
    description: 'Transfer within any bank or payment system in any country',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'Invoice Payments',
    description: 'Issue or pay invoices to companies domestically or internationally',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Truck,
    title: 'Courier Delivery',
    description: 'Cash delivery by courier in 45 cities worldwide',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Bitcoin,
    title: 'Cryptocurrency',
    description: 'Transfer cryptocurrency anywhere in the world',
    color: 'from-orange-500 to-red-500'
  }
]

export default function PaymentMethodsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Preferred Transfer Method
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 h-full hover-card hover:bg-white">
                <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600">
                  {method.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
