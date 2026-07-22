// src/app/page.tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { VagasDestaque } from '@/components/home/VagasDestaque'
import { EmpresasParceiras } from '@/components/home/EmpresasParceiras'
import { ComoFunciona } from '@/components/home/ComoFunciona'
import { Depoimentos } from '@/components/home/Depoimentos'
import { CtaFinal } from '@/components/home/CtaFinal'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <VagasDestaque />
        <EmpresasParceiras />
        <ComoFunciona />
        <Depoimentos />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  )
}
