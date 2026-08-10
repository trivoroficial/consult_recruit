'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Building2, Users, TrendingUp, Award, Shield, 
  Clock, CheckCircle, ArrowRight, Sparkles,
  BarChart3, Target, Zap, Briefcase
} from 'lucide-react'

export default function EmpresasPage() {
  const beneficios = [
    {
      icon: Users,
      title: 'Talento de Alto Nível',
      description: 'Acesse um banco de talentos pré-selecionados e avaliados por nossa equipe de especialistas.'
    },
    {
      icon: TrendingUp,
      title: 'Redução de Turnover',
      description: 'Contrate pessoas alinhadas com a cultura da sua empresa, reduzindo custos com rotatividade.'
    },
    {
      icon: Clock,
      title: 'Agilidade no Processo',
      description: 'Resultado em até 15 dias, com todo o suporte necessário para você focar no que importa.'
    },
    {
      icon: Shield,
      title: 'Processo Transparente',
      description: 'Acompanhe cada etapa em tempo real, com total visibilidade e segurança.'
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Nossos processos são baseados em metodologias comprovadas e validades por neurocientistas.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Dados',
      description: 'Relatórios detalhados sobre cada etapa do processo, com insights para melhoria contínua.'
    }
  ]

  const estatisticas = [
    { valor: '1.200+', label: 'Talentos Conectados' },
    { valor: '98%', label: 'Satisfação dos Clientes' },
    { valor: '15', label: 'Dias para Resultado' },
    { valor: '100+', label: 'Empresas Parceiras' }
  ]

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#8B1A2A] to-[#6B0A1A]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E3C9A8] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
                <Building2 className="h-4 w-4 text-[#E3C9A8]" />
                <span>Para Empresas</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Contrate os melhores talentos
                <br />
                <span className="text-[#E3C9A8]">em tempo recorde</span>
              </h1>

              <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto">
                A ZENTHOS já conectou mais de <span className="text-[#E3C9A8] font-bold">1.200 talentos</span> 
                {' '}a empresas que buscam pessoas comprometidas com resultados.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Link href="/contato">
                  <button className="group px-8 py-4 bg-[#E3C9A8] text-[#8B1A2A] font-bold rounded-lg hover:shadow-xl transition-all flex items-center gap-2">
                    Quero Contratar Agora
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                  </button>
                </Link>
                <Link href="#beneficios">
                  <button className="px-8 py-4 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-all">
                    Ver Benefícios
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 90L1440 100V120H0V40Z" fill="#FAFAFA" />
            </svg>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-12 bg-white border-b border-[#E5E7EB]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {estatisticas.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-[#8B1A2A]">{item.valor}</p>
                  <p className="text-sm text-[#6B7280]">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="py-16 md:py-24 bg-[#FAFAFA]">
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
                  Vantagens Exclusivas
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
                  Por que escolher a ZENTHOS
                  <br />
                  <span className="text-[#8B1A2A]">para contratar?</span>
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#8B1A2A]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#8B1A2A]/5 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-[#8B1A2A]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{item.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
                Pronto para contratar os
                <br />
                <span className="text-[#8B1A2A]">melhores talentos?</span>
              </h2>
              <p className="text-[#6B7280] mt-4 max-w-2xl mx-auto">
                Nossa equipe está pronta para entender suas necessidades e encontrar
                os profissionais ideais para sua empresa.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Link href="/contato">
                  <button className="group px-8 py-4 bg-[#8B1A2A] text-white font-bold rounded-lg hover:bg-[#6B0A1A] transition-all hover:shadow-xl flex items-center gap-2">
                    Falar com Especialista
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
                  </button>
                </Link>
                <a
                  href="https://wa.me/5534991850735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-[#8B1A2A] text-[#8B1A2A] font-medium rounded-lg hover:bg-[#8B1A2A] hover:text-white transition-all"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
