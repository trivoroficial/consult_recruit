'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { VagasDestaque } from '@/components/home/VagasDestaque'
import { EmpresasParceiras } from '@/components/home/EmpresasParceiras'
import { ComoFunciona } from '@/components/home/ComoFunciona'
import { Depoimentos } from '@/components/home/Depoimentos'
import { CtaFinal } from '@/components/home/CtaFinal'
import { ServicosPremium } from '@/components/home/ServicosPremium'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VagasDestaque />
        <ServicosPremium />
        <EmpresasParceiras />
        <ComoFunciona />
        <Depoimentos />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
