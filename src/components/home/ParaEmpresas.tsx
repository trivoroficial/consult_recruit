'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Users, TrendingUp, Award, Shield, Clock, ArrowRight, Sparkles } from 'lucide-react'

export function ParaEmpresas() {
  const beneficios = [
    {
      icon: Users,
      title: 'Talento de alto nível',
      description: 'Tenha acesso aos melhores profissionais do mercado, pré-selecionados para sua empresa.'
    },
    {
      icon: TrendingUp,
      title: 'Redução de turnover',
      description: 'Nossos processos garantem que você contrate pessoas alinhadas com a cultura da sua empresa.'
    },
    {
      icon: Clock,
      title: 'Agilidade no processo',
      description: 'Resultado em até 15 dias, com todo o suporte necessário para você focar no que importa.'
    },
    {
      icon: Shield,
      title: 'Processo transparente',
      description: 'Acompanhe cada etapa em tempo real, com total visibilidade e segurança.'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1A2A]/5 text-[#8B1A2A] rounded-full text-sm font-medium mb-4">
              <Building2 className="h-4 w-4" />
              Para Empresas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
              Contrate os melhores talentos
              <br />
              <span className="text-[#8B1A2A]">em tempo recorde</span>
            </h2>
            <p className="text-[#6B7280] mt-4 text-lg">
              A ZENTHOS já conectou mais de <span className="font-bold text-[#8B1A2A]">1.200 talentos</span> a empresas que buscam
              <span className="font-medium text-[#1A1A2E]"> pessoas comprometidas com resultados.</span>
            </p>

            <div className="space-y-4 mt-6">
              {beneficios.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-[#FAFAFA] rounded-xl border border-[#E5E7EB] hover:border-[#8B1A2A]/30 transition">
                    <div className="w-10 h-10 rounded-full bg-[#8B1A2A]/5 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#8B1A2A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A2E]">{item.title}</h4>
                      <p className="text-sm text-[#6B7280]">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="/contato">
              <button className="group mt-8 px-8 py-4 bg-[#8B1A2A] text-white font-bold rounded-lg hover:bg-[#6B0A1A] transition-all hover:shadow-xl flex items-center gap-2">
                Quero Contratar Agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] text-center hover:shadow-xl transition">
              <p className="text-4xl font-bold text-[#8B1A2A]">1.200+</p>
              <p className="text-sm text-[#6B7280]">Talentos conectados</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] text-center hover:shadow-xl transition">
              <p className="text-4xl font-bold text-[#8B1A2A]">98%</p>
              <p className="text-sm text-[#6B7280]">Satisfação dos clientes</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] text-center hover:shadow-xl transition">
              <p className="text-4xl font-bold text-[#8B1A2A]">15</p>
              <p className="text-sm text-[#6B7280]">Dias para resultado</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-[#E5E7EB] text-center hover:shadow-xl transition">
              <p className="text-4xl font-bold text-[#8B1A2A]">100+</p>
              <p className="text-sm text-[#6B7280]">Empresas parceiras</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
