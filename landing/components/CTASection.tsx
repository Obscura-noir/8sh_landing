'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const countries = [
  'USA', 'European Countries', 'France', 'Netherlands', 'Poland', 
  'Germany', 'Canada', 'UAE', 'Thailand', 'United Kingdom', 'Russia',
  'Japan', 'Singapore', 'Switzerland', 'Australia', 'South Korea'
]

export default function CTASection() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + 1)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Оставить заявку
          </h2>
          <p className="text-xl mb-8 opacity-90">
            и совершайте международные платежи без ограничений
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            Оставить заявку на платеж
          </Link>
        </motion.div>
      </div>

      {/* Scrolling Countries */}
      <div className="mt-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10"></div>
        
        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-8 text-white/70 whitespace-nowrap"
            animate={{ x: -scrollPosition }}
            transition={{ type: "tween", ease: "linear" }}
          >
            {[...countries, ...countries].map((country, index) => (
              <span key={index} className="text-lg">
                {country}
              </span>
            ))}
          </motion.div>
        </div>
        
        <div className="overflow-hidden mt-4">
          <motion.div
            className="flex space-x-8 text-white/70 whitespace-nowrap"
            animate={{ x: scrollPosition }}
            transition={{ type: "tween", ease: "linear" }}
          >
            {[...countries.reverse(), ...countries].map((country, index) => (
              <span key={index} className="text-lg">
                {country}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
