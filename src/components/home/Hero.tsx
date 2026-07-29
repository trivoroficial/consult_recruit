'use client'

import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Users, Building2, Briefcase } from 'lucide-react'

const whatsappNumber = "5534991850735";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de conhecer as soluções da ZENTHOS.")}`;

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* IMAGEM DE FUNDO COM TRANSPARÊNCIA */}
      <div className="absolute inset-0">
        <img 
          src="/recrutamento.png" 
          alt="ZENTHOS" 
          className="w-full h-full object-cover"
        />
        {/* GRADIENTE VINHO */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E1A]/90 via-[#6B1A2A]/70 to-[#6B1A2A]/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-[#E3C9A8] border border-[#E3C9A8]/20">
                🚀 Plataforma de Recrutamento Enterprise
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Conectamos <br />
              <span className="text-[#E3C9A8]">talentos</span> às <br />
              melhores <span className="text-[#E3C9A8]">oportunidades</span>
            </h1>
            <p className="text-lg text-white/80 mt-6 max-w-lg">
              A ZENTHOS é a plataforma inteligente que conecta profissionais qualificados às melhores empresas.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/login">
                <button className="px-8 py-3.5 bg-[#E3C9A8] hover:bg-[#C9A84C] text-[#1A1A2E] font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-[#6B1A2A]/30 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                  Ver Vagas
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-3.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Falar com Especialista
                </button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition-all duration-300">
              <Building2 className="h-8 w-8 text-[#E3C9A8] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-white/70">Empresas Parceiras</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition-all duration-300">
              <Users className="h-8 w-8 text-[#E3C9A8] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">10K+</p>
              <p className="text-sm text-white/70">Candidatos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition-all duration-300">
              <Briefcase className="h-8 w-8 text-[#E3C9A8] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">1.200+</p>
              <p className="text-sm text-white/70">Contratações</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition-all duration-300">
              <CheckCircle className="h-8 w-8 text-[#E3C9A8] mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">96%</p>
              <p className="text-sm text-white/70">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
