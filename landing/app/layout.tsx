import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientHeader from '@/components/ClientHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Международные платежи без SWIFT для бизнеса • Paynix • От 1 дня',
  description: 'Платежи в Китай, Турцию, ОАЭ когда банки блокируют. ✓ ВЭД расчеты ✓ От 1.5% ✓ 12000+ компаний. Персональный менеджер. Начните →',
  keywords: [
    'международные платежи',
    'платежная система для вэд',
    'международный платежный сервис',
    'переводы за границу',
    'платежи в китай',
    'платежи в турцию',
    'переводы в дубай',
    'международные переводы для бизнеса',
    'валютные переводы юридических лиц',
    'корреспондентские счета для бизнеса',
    'альтернативные способы международных платежей',
    'валютный контроль',
    'легальные международные переводы',
    'быстрые международные расчеты',
    'надежные платежи за рубеж',
    'международные расчеты без swift',
    'цифровые валюты для расчетов',
    'геотаргетинг платежей',
    'инструкции по международным переводам',
    'экспорт и импорт платежи',
    'бизнес переводы за границу',
    'образовательный хаб',
    'API для платежей',
    'отзывы клиентов',
    'безопасность платежей',
    'сравнение с банками',
    'B2B платежи',
    'ВЭД решения',
    'калькулятор платежей',
  ].join(', '),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(102193875, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
          `}
        </Script>
        {/* Organization Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Paynix",
          "description": "Платформа международных переводов без SWIFT для бизнеса",
          "url": "https://paynix.ru",
          "logo": "https://paynix.ru/logo.png",
          "sameAs": [
            "https://t.me/paynix_support"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+7-800-000-0000",
            "contactType": "customer service",
            "availableLanguage": "Russian"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RU",
            "addressLocality": "Москва"
          }
        }) }} />
        {/* /Organization Schema.org */}
        
        {/* FAQ Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Как быстро проходят международные платежи через Paynix?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Обычно от 1 рабочего дня, в зависимости от страны назначения и валюты. Мы используем прямые каналы и корпоративные счета для ускорения переводов."
              }
            },
            {
              "@type": "Question",
              "name": "Какие документы нужны для перевода?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Для большинства платежей требуется инвойс, контракт и подтверждение назначения платежа. Персональный менеджер поможет собрать все необходимые документы."
              }
            },
            {
              "@type": "Question",
              "name": "Можно ли отправить платеж без SWIFT?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Да, Paynix предлагает альтернативные маршруты для международных переводов без использования SWIFT, что позволяет обходить ограничения и блокировки."
              }
            }
          ]
        }) }} />
        {/* /FAQ Schema.org */}
        
        {/* Service Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Международные платежи без SWIFT",
          "description": "Быстрые и безопасные международные переводы для бизнеса в обход SWIFT системы",
          "provider": {
            "@type": "Organization",
            "name": "Paynix"
          },
          "serviceType": "Financial Services",
          "areaServed": "RU",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Международные переводы",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Платежи в Китай"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Платежи в Турцию"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Платежи в ОАЭ"
                }
              }
            ]
          }
        }) }} />
        {/* /Service Schema.org */}
        {/* /Yandex.Metrika counter */}
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: `
          body{margin:0;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6;color:#374151}
          .container{max-width:1200px;margin:0 auto;padding:0 1rem}
          header{position:fixed;top:0;left:0;right:0;z-index:40;background-color:rgba(255,255,255,0.95)}
          .btn{display:inline-flex;align-items:center;justify-content:center;padding:0.75rem 1.5rem;border-radius:0.5rem;font-weight:600;text-decoration:none;border:none;cursor:pointer;transition:all 0.2s}
          .btn-primary{background-color:#3b82f6;color:white}
          .btn-primary:hover{background-color:#2563eb}
          h1{font-size:2.5rem;font-weight:700;line-height:1.2;margin-bottom:1.5rem;color:#111827}
          @media (max-width:768px){h1{font-size:2rem}.container{padding:0 0.75rem}}
        ` }} />
        {/* Performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/styles/critical.css" />
        <meta property="og:title" content="Paynix - Международные платежи без SWIFT для бизнеса" />
        <meta property="og:description" content="Платежи в Китай, Турцию, ОАЭ когда банки блокируют. От 1.5%, легально, 12000+ компаний" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://paynix.ru" />
        <meta property="og:image" content="https://paynix.ru/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Международные платежи без SWIFT • Paynix" />
        <meta name="twitter:description" content="Платежи в Китай, Турцию, ОАЭ. От 1.5%, легально, 12000+ компаний" />
      </head>
      <body className={inter.className}>
        {/* Yandex.Metrika noscript */}
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/102193875" style={{position:'absolute', left:'-9999px'}} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika noscript */}
        <ClientHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
