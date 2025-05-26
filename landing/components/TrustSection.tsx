'use client'

import { motion } from 'framer-motion'
import { Award, TrendingUp, Shield } from 'lucide-react'

const trustIndicators = [
  {
    name: "Lena Fox",
    title: "One of YouTube's veteran auto bloggers, started posting videos back in 2012",
    quote: "Paying to Japan through GlobalPay is more profitable than through banks.",
    image: "LF"
  },
  {
    name: "Igor Mann",
    title: "Russia's most famous marketing practitioner, speaker, author, publisher",
    quote: "How to send and receive international transfers without restrictions?",
    image: "IM"
  }
]

export default function TrustSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {trustIndicators.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-8 hover-card"
            >
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {person.quote}
                  </h3>
                  <a href="#" className="text-primary hover:text-blue-700 font-medium">
                    Read full review →
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {person.image}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-600">{person.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="#" className="btn btn-primary">
            Learn More About Guarantees
          </a>
        </motion.div>
      </div>
    </section>
  )
}
