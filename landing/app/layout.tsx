import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientHeader from '@/components/ClientHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Paynix - International Payments Without Limits',
  description: 'Send and receive international payments for individuals and businesses through dozens of payment systems',
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
        {/* /Yandex.Metrika counter */}
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
