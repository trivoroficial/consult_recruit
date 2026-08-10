'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Fundo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B1A2A]/90 via-[#8B1A2A]/70 to-[#FAFAFA]" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/recrutamento.png')" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
              <Zap className="h-4 w-4 text-[#E3C9A8]" />
              <span>+1.200 talentos conectados em 2026</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              O próximo passo da sua
              <br />
              <span className="text-[#E3C9A8] relative">
                carreira começa aqui
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#E3C9A8]/50 rounded-full" />
              </span>
            </h1>

            <p className="text-lg text-white/80 mt-6 max-w-lg leading-relaxed">
              Você já imaginou acordar todos os dias fazendo o que ama, em um lugar que valoriza seu potencial?
              <br /><br />
              <span className="text-[#E3C9A8] font-medium">A ZENTHOS conecta você às melhores oportunidades do mercado.</span>
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-[#E3C9A8]" />
                <span>Vagas exclusivas</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-[#E3C9A8]" />
                <span>Processo transparente</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-5 w-5 text-[#E3C9A8]" />
                <span>Resultado em até 15 dias</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/cadastro">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-[#E3C9A8] text-[#8B1A2A] font-bold rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Quero Meu Próximo Emprego
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                </motion.button>
              </Link>
              <Link href="/vagas">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/20 transition-all">
                  Ver Vagas
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#E3C9A8]/20 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-[#E3C9A8] border-2 border-white flex items-center justify-center text-[#8B1A2A] font-bold text-sm">
                  +99
                </div>
              </div>
              <div>
                <p className="text-white font-medium">Pessoas já se inscreveram hoje</p>
                <p className="text-white/60 text-sm">E você, vai ficar de fora?</p>
              </div>
            </div>
          </motion.div>

          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8B1A2A]/20 to-[#E3C9A8]/20 blur-3xl" />
              <div className="relative w-full max-w-lg mx-auto bg-[#8B1A2A]/10 rounded-3xl p-8 border border-white/20 backdrop-blur-sm">
                <div className="text-center">
                  <img 
                    src="/logo.png" 
                    alt="ZENTHOS" 
                    className="w-48 mx-auto mb-6"
                  />
                  <h3 className="text-white text-2xl font-bold">Conectando talentos</h3>
                  <p className="text-white/70 text-sm mt-2">As melhores oportunidades do mercado</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">+1200 talentos</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-xs">98% satisfação</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 90L1440 100V120H0V40Z" fill="#FAFAFA" />
        </svg>
      </div>
    </section>
  )
}
