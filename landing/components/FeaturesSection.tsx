'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, CheckCircle, Lock, Plus, Minus } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Speed',
    description: 'Thanks to our extensive infrastructure, we can send money from accounts in the same country as your counterpartys account. In some cases, payments arrive instantly.',
    defaultOpen: true
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Our regular business process: building new payment chains with future reserves. If one solution stops working tomorrow, we already have an alternative ready.',
    defaultOpen: false
  },
  {
    icon: CheckCircle,
    title: 'Legality',
    description: 'We create legal payment instruments for each jurisdiction: payment agents, export-import trading houses, MSB licenses. This is what exists in our infrastructure.',
    defaultOpen: false
  },
  {
    icon: Lock,
    title: 'Security',
    description: 'We always prioritize transaction security over low costs. This is not just a declaration, but what we do every day - fulfilling our obligations.',
    defaultOpen: false
  }
]

export default function FeaturesSection() {
  const [openFeatures, setOpenFeatures] = useState<number[]>([0])

  const toggleFeature = (index: number) => {
    setOpenFeatures(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="section-padding bg-gray-50" id="features">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            GlobalPay Is
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleFeature(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      {openFeatures.includes(index) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-600"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-500 ml-4">
                    {openFeatures.includes(index) ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
