'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { VagasDestaque } from '@/components/home/VagasDestaque'
import { ComoFunciona } from '@/components/home/ComoFunciona'
import { ServicosPremium } from '@/components/home/ServicosPremium'
import { CtaFinal } from '@/components/home/CtaFinal'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VagasDestaque />
        <ComoFunciona />
        <ServicosPremium />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
