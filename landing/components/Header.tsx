'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuth(!!user)
    }
    checkAuth()
    // Подписка на изменения сессии
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth()
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

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
            <span className="text-xl font-bold text-gray-900">Paynix</span>
          </Link>

          {/* Desktop Navigation */}
          {typeof window !== 'undefined' && window.location.pathname !== '/profile' && (
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">
                Как это работает
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-primary transition-colors">
                Преимущества
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">
                Отзывы
              </Link>
              <Link href="#countries" className="text-gray-700 hover:text-primary transition-colors">
                Страны
              </Link>
            </div>
          )}

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuth ? (
              <>
                <Link href="/login" className="btn btn-secondary">
                  Войти
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Открыть счёт
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary">
                Выйти
              </button>
            )}
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
              <span className="text-xl font-bold text-gray-900">Paynix</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          {typeof window !== 'undefined' && window.location.pathname !== '/profile' && (
            <nav className="space-y-4">
              <Link href="#how-it-works" className="block py-2 text-lg text-gray-700">
                Как это работает
              </Link>
              <Link href="#features" className="block py-2 text-lg text-gray-700">
                Преимущества
              </Link>
              <Link href="#testimonials" className="block py-2 text-lg text-gray-700">
                Отзывы
              </Link>
              <Link href="#countries" className="block py-2 text-lg text-gray-700">
                Страны
              </Link>
            </nav>
          )}
          
          <div className="mt-8 space-y-4">
            {!isAuth ? (
              <>
                <Link href="/login" className="btn btn-secondary w-full">
                  Войти
                </Link>
                <Link href="/register" className="btn btn-primary w-full">
                  Открыть счёт
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-primary w-full">
                Выйти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
