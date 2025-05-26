'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">GP</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GlobalPay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#features" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#countries" className="text-gray-700 hover:text-primary transition-colors">
              Countries
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="btn btn-secondary">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary">
              Open Account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">GP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">GlobalPay</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="space-y-4">
            <Link href="#how-it-works" className="block py-2 text-lg text-gray-700">
              How it Works
            </Link>
            <Link href="#features" className="block py-2 text-lg text-gray-700">
              Features
            </Link>
            <Link href="#testimonials" className="block py-2 text-lg text-gray-700">
              Testimonials
            </Link>
            <Link href="#countries" className="block py-2 text-lg text-gray-700">
              Countries
            </Link>
          </nav>
          
          <div className="mt-8 space-y-4">
            <Link href="/login" className="btn btn-secondary w-full">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary w-full">
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
