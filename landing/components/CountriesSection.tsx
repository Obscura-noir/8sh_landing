'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const countries = [
  { code: 'TR', name: 'Турция', flag: '🇹🇷' },
  { code: 'AE', name: 'Дубай', flag: '🇦🇪' },
  { code: 'CN', name: 'Китай', flag: '🇨🇳' },
  { code: 'US', name: 'США', flag: '🇺🇸' },
  { code: 'DE', name: 'Германия', flag: '🇩🇪' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' }
]

export default function CountriesSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedCountries = showAll ? countries : countries.slice(0, 24)

  return (
    <section className="section-padding bg-gray-50" id="countries">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Переводите деньги в любую страну с Paynix
          </h2>
          <p className="text-lg text-gray-600">
            Выберите страну из списка и узнайте больше
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedCountries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/send-to/${country.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <span className="text-4xl mb-2" role="img" aria-label={`Флаг ${country.name}`}>{country.flag}</span>
                <span className="text-sm text-center text-gray-700 font-medium">
                  {country.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-secondary"
            >
              Показать все страны
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
