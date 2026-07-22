// src/components/home/Hero.tsx
'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Users, Building2, Briefcase } from 'lucide-react'

const whatsappNumber = "5537991177058";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de conhecer as soluções da ZENTHOS.")}`;

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 65]);

  return (
    <section ref={heroRef} className="relative flex min-h-[90vh] items-center overflow-hidden pt-20 bg-[#F8F4E6]">
      {/* IMAGEM DE FUNDO */}
      <div className="absolute inset-0">
        <img src="/recrutamento.png" alt="ZENTHOS" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D343A]/85 via-[#2D343A]/60 to-[#2D343A]/20"></div>
      </div>

      <motion.div className="relative z-10 mx-auto flex w-full max-w-7xl px-4 sm:px-6 lg:px-8" style={{ y: overlayY }}>
        <div className="max-w-4xl space-y-8 py-12 lg:py-20">
          <motion.div 
            className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
            Gestão, Estratégia & Transformação
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Transformamos empresas através da <br className="hidden sm:block" />
              <span className="text-[#E3C9A8]">Gestão, Estratégia e Transformação</span>
            </h1>
          </motion.div>

          <motion.p 
            className="max-w-2xl text-lg leading-8 text-white/85 md:text-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.85 }}
          >
            Ajudamos empresas a crescer por meio da melhoria de processos, desenvolvimento humano, tecnologia e inteligência organizacional.
          </motion.p>

          <motion.div 
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.85 }}
          >
            <Link href="/cadastro">
              <button className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white bg-[#8B0000] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <span className="relative z-10 flex items-center gap-2">
                  Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                </span>
                <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white border border-white/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="h-4 w-4" /> Falar com Especialista
              </span>
              <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </motion.div>

          <motion.div 
            className="flex gap-8 text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div><span className="text-2xl font-bold text-[#E3C9A8]">15+</span> <span className="text-sm">Anos de Mercado</span></div>
            <div><span className="text-2xl font-bold text-[#E3C9A8]">500+</span> <span className="text-sm">Empresas Atendidas</span></div>
            <div><span className="text-2xl font-bold text-[#E3C9A8]">96%</span> <span className="text-sm">Satisfação</span></div>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F4E6] to-transparent" />
    </section>
  )
}
