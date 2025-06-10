import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problems from '@/components/Problems'
import Solutions from '@/components/Solutions'
import Industries from '@/components/Industries'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Calculator from '@/components/Calculator'
import WhyUs from '@/components/WhyUs'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Industries />
        <Services />
        <Process />
        <Calculator />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
