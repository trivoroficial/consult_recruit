'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Briefcase, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react'

export function ServicosPremium() {
  const servicos = [
    {
      icon: Users,
      title: 'Recrutamento & Seleção',
      description: 'Encontre os melhores talentos com processos ágeis e precisos.',
      color: 'bg-[#8B1A2A]/5'
    },
    {
      icon: Briefcase,
      title: 'Consultoria RH',
      description: 'Estratégias personalizadas para gestão de pessoas e cultura organizacional.',
      color: 'bg-[#E3C9A8]/20'
    },
    {
      icon: TrendingUp,
      title: 'Treinamento & Coaching',
      description: 'Desenvolva seu time com programas de alto impacto e transformação.',
      color: 'bg-[#8B1A2A]/5'
    },
    {
      icon: Award,
      title: 'Security & Food Safety',
      description: 'Certificações e segurança alimentar para seu negócio com excelência.',
      color: 'bg-[#E3C9A8]/20'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1A2A]/5 text-[#8B1A2A] rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Soluções Completas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
              Tudo que sua empresa precisa
              <br />
              <span className="text-[#8B1A2A]">em um só lugar</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicos.map((servico, index) => {
            const Icon = servico.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#8B1A2A]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-[#FAFAFA]"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${servico.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-[#8B1A2A]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{servico.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{servico.description}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/servicos">
            <button className="group text-[#8B1A2A] font-medium hover:underline flex items-center gap-2 mx-auto">
              Conheça todos os serviços
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
