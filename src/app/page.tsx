'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { VagasDestaque } from '@/components/home/VagasDestaque'
import { ComoFuncionaCandidato } from '@/components/home/ComoFuncionaCandidato'
import { ParaEmpresas } from '@/components/home/ParaEmpresas'
import { ServicosResumidos } from '@/components/home/ServicosResumidos'
import { CtaFinal } from '@/components/home/CtaFinal'

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VagasDestaque />
        <ComoFuncionaCandidato />
        <ParaEmpresas />
        <ServicosResumidos />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
