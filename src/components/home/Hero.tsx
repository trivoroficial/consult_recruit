// src/components/home/Hero.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Briefcase, Users, Building2 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CONTEÚDO */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                🚀 Plataforma de Recrutamento
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Conectamos <br />
              <span className="text-[#C9A84C]">talentos</span> às <br />
              melhores <span className="text-[#C9A84C]">oportunidades</span>
            </h1>
            <p className="text-lg text-white/70 mt-6 max-w-lg">
              A ZENTHOS é a plataforma inteligente que conecta profissionais qualificados às melhores empresas. Encontre a vaga dos seus sonhos ou o talento que sua empresa precisa.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/vagas"
                className="px-6 py-3 bg-[#C9A84C] hover:bg-[#B8973A] text-[#1A1A2E] font-semibold rounded-lg transition flex items-center gap-2"
              >
                Ver Vagas
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cadastro"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20"
              >
                Cadastrar-se
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#C9A84C]" />
                500+ Vagas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#C9A84C]" />
                200+ Empresas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#C9A84C]" />
                95% Satisfação
              </span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Building2 className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-white/60">Empresas Parceiras</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
              <Users className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-white/60">Candidatos</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center col-span-2">
              <Briefcase className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-3xl font-bold">1.200+</p>
              <p className="text-sm text-white/60">Contratações Realizadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
