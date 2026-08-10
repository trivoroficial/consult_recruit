'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Award, Zap } from 'lucide-react'

export function CtaFinal() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#8B1A2A] to-[#6B0A1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
            <Sparkles className="h-4 w-4 text-[#E3C9A8]" />
            <span>O momento é agora</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Pronto para iniciar sua
            <br />
            <span className="text-[#E3C9A8]">nova jornada?</span>
          </h2>

          <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            Milhares de pessoas já deram o primeiro passo. A diferença entre quem conquista
            e quem apenas deseja é a <span className="text-[#E3C9A8] font-semibold">ação</span>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <Link href="/cadastro">
              <button className="group px-8 py-4 bg-[#E3C9A8] text-[#8B1A2A] font-bold rounded-lg hover:shadow-2xl transition-all flex items-center gap-2 text-lg">
                Quero começar agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
              </button>
            </Link>
            <Link href="/vagas">
              <button className="px-8 py-4 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                Ver vagas disponíveis
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/70">
              <Users className="h-5 w-5 text-[#E3C9A8]" />
              <span>+1.200 talentos</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Award className="h-5 w-5 text-[#E3C9A8]" />
              <span>98% de satisfação</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <Zap className="h-5 w-5 text-[#E3C9A8]" />
              <span>Resultado em 15 dias</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
