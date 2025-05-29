import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientHeader from '@/components/ClientHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Международные платежи без SWIFT • Paynix • 60 стран за 1 день',
  description: 'Платежи в Китай, Турцию, ОАЭ когда банки отказывают. ✓ От 1.5% ✓ Легально ✓ 12,000+ компаний. Оставьте заявку и начните работать →',
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
    <html lang="en">
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
        {/* FAQ Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Как быстро проходят платежи?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "От 1 рабочего дня в зависимости от страны."
              }
            },
            {
              "@type": "Question",
              "name": "Как зарегистрироваться?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Перейдите на страницу регистрации и заполните форму."
              }
            }
          ]
        }) }} />
        {/* /FAQ Schema.org */}
        {/* /Yandex.Metrika counter */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/css/critical.css" as="style" />
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
