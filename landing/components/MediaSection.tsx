'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const mediaLogos = [
  { name: 'Forbes', logo: 'forbes' },
  { name: 'TechCrunch', logo: 'techcrunch' },
  { name: 'Financial Times', logo: 'ft' },
  { name: 'Bloomberg', logo: 'bloomberg' },
  { name: 'The Economist', logo: 'economist' }
]

export default function MediaSection() {
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
            As Featured In
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {mediaLogos.map((media, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                <span className="text-gray-600 font-semibold">{media.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
