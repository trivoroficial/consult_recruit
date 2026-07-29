'use client'

import { motion } from "framer-motion";
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Users, Building2, Briefcase, Zap, Shield, TrendingUp, Award } from 'lucide-react'

const whatsappNumber = "5534991850735";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de conhecer as soluções da ZENTHOS.")}`;

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                🚀 Plataforma de Recrutamento Enterprise
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Conectamos <br />
              <span className="text-[#C9A84C]">talentos</span> às <br />
              melhores <span className="text-[#C9A84C]">oportunidades</span>
            </h1>
            <p className="text-lg text-white/70 mt-6 max-w-lg">
              A ZENTHOS é a plataforma inteligente que conecta profissionais qualificados às melhores empresas.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/vagas">
                <button className="px-6 py-3 bg-[#C9A84C] hover:bg-[#B8973A] text-[#1A1A2E] font-semibold rounded-lg transition flex items-center gap-2">
                  Ver Vagas
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition border border-white/20 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Falar com Especialista
                </button>
              </a>
            </div>
          </div>

          {/* RESUMO DOS SERVIÇOS PREMIUM */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition">
              <Building2 className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-white/60">Empresas Parceiras</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition">
              <Users className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-white/60">Candidatos</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition">
              <Briefcase className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-2xl font-bold">1.200+</p>
              <p className="text-sm text-white/60">Contratações</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition">
              <Award className="h-8 w-8 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-2xl font-bold">96%</p>
              <p className="text-sm text-white/60">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
