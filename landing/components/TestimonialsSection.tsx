'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react'

const testimonials = [
  {
    quote: "They work quickly, everything is extremely convenient... and no stress.",
    author: "Roman",
    handle: "@rom*****",
    avatar: "R",
    rating: 5
  },
  {
    quote: "Sending is much more convenient/faster/cheaper.",
    author: "Gleb",
    handle: "@gl*****",
    avatar: "G",
    rating: 5
  },
  {
    quote: "I recommend. Everything is at 5+ level.",
    author: "Serzhio",
    handle: "@se*****",
    avatar: "S",
    rating: 5
  },
  {
    quote: "The speed impressed me - no more than 10 minutes.",
    author: "Vitaliy",
    handle: "@vi*****",
    avatar: "V",
    rating: 5
  },
  {
    quote: "Clear, without fuss, with reasonable fees.",
    author: "D. Pfemysl",
    handle: "@dpf*****",
    avatar: "D",
    rating: 5
  },
  {
    quote: "Came out cheaper and without stress.",
    author: "Gulnara",
    handle: "@sha*****",
    avatar: "G",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recommended by Friends and Partners
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              These are not just screenshots. Links to direct messages from clients with reviews 
              are collected in our channel. You can write to anyone who left a review and chat.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <MessageSquare size={20} />
              <span className="font-semibold">GlobalPay | Reviews</span>
            </a>
          </motion.div>

          {/* Right Content - Testimonial Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="mb-6">
                <div className="flex mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-800 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].handle}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
