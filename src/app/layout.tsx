import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Цифровая Лаборатория Каталист - Внедрение AI для бизнеса',
  description: 'Внедряем российский AI в ваш бизнес за 30 дней. Автоматизация процессов с YandexGPT, GigaChat для малого и среднего бизнеса.',
  keywords: 'AI консалтинг, российский искусственный интеллект, YandexGPT, GigaChat, автоматизация бизнеса',
  openGraph: {
    title: 'Цифровая Лаборатория Каталист',
    description: 'Внедряем российский AI в ваш бизнес за 30 дней',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
