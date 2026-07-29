'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, DollarSign, Shield, Building2, ArrowRight, CheckCircle } from 'lucide-react'

const servicos = [
  {
    icon: Users,
    title: "Gestão de Pessoas",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional.",
    features: ["Recrutamento e Seleção", "Treinamentos", "Avaliação de desempenho", "Plano de cargos e salários"]
  },
  {
    icon: DollarSign,
    title: "Consultoria Financeira",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio.",
    features: ["Fluxo de caixa", "Formação de preço", "Controle de custos", "Indicadores financeiros"]
  },
  {
    icon: Shield,
    title: "Segurança dos Alimentos",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação.",
    features: ["Manual de Boas Práticas", "POPs", "Treinamentos", "Auditorias internas"]
  },
  {
    icon: Building2,
    title: "Gestão Empresarial",
    description: "Diagnóstico e planejamento estratégico para crescimento sustentável.",
    features: ["Diagnóstico empresarial", "Planejamento estratégico", "Definição de metas", "Indicadores (KPIs)"]
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export function ServicosPremium() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">O que fazemos</p>
          <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
            Nossos <span className="text-[#8B0000]">Serviços</span>
          </h2>
          <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
          <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
            Soluções completas para transformar sua organização
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((servico, index) => {
            const Icon = servico.icon
            return (
              <motion.div 
                key={index} 
                className="group relative bg-white border border-[#F8F4E6] rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#8B0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#F8F4E6] text-[#8B0000] group-hover:bg-[#8B0000] group-hover:text-white transition-colors duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[#2D343A] group-hover:text-[#8B0000] transition-colors">
                  {servico.title}
                </h3>
                <p className="mt-3 text-sm text-[#708090] leading-relaxed">
                  {servico.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {servico.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#708090]">
                      <CheckCircle className="h-4 w-4 text-[#E3C9A8]" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/servicos" 
                  className="inline-flex items-center gap-2 mt-6 text-[#8B0000] font-medium text-sm hover:underline group"
                >
                  Saiba mais
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/servicos" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium"
          >
            Conheça todos os serviços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
