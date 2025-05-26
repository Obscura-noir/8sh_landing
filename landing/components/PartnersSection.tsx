'use client'

import { motion } from 'framer-motion'
import { 
  Building2, 
  ShoppingCart, 
  Truck, 
  Code2, 
  Car, 
  Home,
  Globe,
  Briefcase,
  Users,
  Palette,
  Plane,
  DollarSign
} from 'lucide-react'

const companyTypes = [
  { icon: ShoppingCart, text: 'Retail and Wholesale Trade' },
  { icon: Truck, text: 'Logistics Companies' },
  { icon: Code2, text: 'IT Companies and Marketing Agencies' },
  { icon: Car, text: 'Car Dealerships' },
  { icon: Building2, text: 'Real Estate Developers' },
]

const individualTypes = [
  { icon: Globe, text: 'Living Abroad (Permanent or Temporary)' },
  { icon: Home, text: 'Investing in Foreign Real Estate' },
  { icon: Car, text: 'Private Car Buyers' },
  { icon: Briefcase, text: 'Freelancers' },
  { icon: Users, text: 'Real Estate Agents' },
]

export default function PartnersSection() {
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
            Who We Work With
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-gray-900">Companies</h3>
            </div>
            <ul className="space-y-4">
              {companyTypes.map((type, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <type.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{type.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Individuals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover-card"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-secondary" />
              <h3 className="text-2xl font-bold text-gray-900">Individuals</h3>
            </div>
            <ul className="space-y-4">
              {individualTypes.map((type, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <type.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-gray-700">{type.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
