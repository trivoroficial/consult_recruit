'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, Users, Target, Eye, Star 
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      <section className="relative py-20 md:py-28 bg-[#2D343A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
              Sobre a ZENTHOS
            </motion.div>
            <motion.h1 
              className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Transformamos organizações <br />
              <span className="text-[#E3C9A8]">através de estratégia e inovação</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-white/70 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
            >
              A ZENTHOS é uma consultoria global que conecta estratégia, tecnologia e 
              inteligência humana para construir organizações mais eficientes, preparadas e competitivas.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">Propósito</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
              Nossa <span className="text-[#8B0000]">Essência</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div 
              className="bg-[#F8F4E6] border border-[#E8EAE0] rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-[#8B0000]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D343A]">Missão</h3>
              <div className="w-12 h-0.5 bg-[#8B0000] mx-auto my-4"></div>
              <p className="text-[#708090] leading-relaxed">
                Ativar o máximo potencial das organizações por meio de estratégia baseada em dados.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#8B0000] border border-[#8B0000]/20 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-10 w-10 text-[#E3C9A8]" />
              </div>
              <h3 className="text-2xl font-bold">Visão</h3>
              <div className="w-12 h-0.5 bg-[#E3C9A8] mx-auto my-4"></div>
              <p className="text-white/80 leading-relaxed">
                Ser a consultoria mais eficiente e inspiradora do Brasil, referência em transformação.
              </p>
            </motion.div>

            <motion.div 
              className="bg-[#F8F4E6] border border-[#E8EAE0] rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-[#8B0000]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D343A]">Valores</h3>
              <div className="w-12 h-0.5 bg-[#8B0000] mx-auto my-4"></div>
              <p className="text-[#708090] leading-relaxed">
                Rigor técnico, transparência, inovação e resultados tangíveis para nossos clientes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#2D343A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#E3C9A8]">15+</p>
              <p className="mt-2 text-sm text-white/60 uppercase tracking-wider">Anos de Mercado</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#E3C9A8]">500+</p>
              <p className="mt-2 text-sm text-white/60 uppercase tracking-wider">Empresas Atendidas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#E3C9A8]">96%</p>
              <p className="mt-2 text-sm text-white/60 uppercase tracking-wider">Satisfação</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-[#E3C9A8]">1.000+</p>
              <p className="mt-2 text-sm text-white/60 uppercase tracking-wider">Profissionais Impactados</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#8B0000]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Pronto para transformar sua organização?
          </h2>
          <p className="mt-4 text-[#E3C9A8] max-w-2xl mx-auto">
            Junte-se às empresas que confiam na ZENTHOS para excelência estratégica.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cadastro">
              <button className="px-8 py-4 text-sm font-semibold text-[#8B0000] bg-white rounded-lg hover:bg-[#E3C9A8] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Solicitar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/contato">
              <button className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/60 rounded-lg hover:bg-white hover:text-[#8B0000] hover:border-white transition-all duration-300">
                Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
