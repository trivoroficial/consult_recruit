'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, DollarSign, Shield, Building2, CheckCircle, ArrowRight, TrendingUp, Rocket, Zap, Award, Globe } from 'lucide-react'

const servicosList = [
  {
    icon: Users,
    title: "Gestão de Pessoas",
    subtitle: "People & Culture",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional.",
    features: ["Recrutamento e Seleção Estratégico", "Treinamentos e Desenvolvimento", "Avaliação de desempenho 360°", "Plano de cargos e salários", "Clima organizacional e engajamento"],
    badge: "Top 1%"
  },
  {
    icon: DollarSign,
    title: "Consultoria Financeira",
    subtitle: "Financial Advisory",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio.",
    features: ["Fluxo de caixa e capital de giro", "Formação de preço e margem", "Controle de custos e despesas", "Indicadores financeiros (KPIs)", "Planejamento tributário"],
    badge: "Premium"
  },
  {
    icon: Shield,
    title: "Segurança dos Alimentos",
    subtitle: "Food Safety & Quality",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação.",
    features: ["Manual de Boas Práticas (BPF)", "Procedimentos Operacionais Padrão (POPs)", "Treinamentos e capacitação", "Auditorias internas e externas", "Consultoria para MAPA e ANVISA"],
    badge: "Certificado"
  },
  {
    icon: Building2,
    title: "Gestão Empresarial",
    subtitle: "Business Management",
    description: "Diagnóstico e planejamento estratégico para crescimento sustentável.",
    features: ["Diagnóstico empresarial completo", "Planejamento estratégico", "Definição de metas e OKRs", "Indicadores de desempenho (KPIs)", "Governança corporativa"],
    badge: "Estratégico"
  },
  {
    icon: TrendingUp,
    title: "Marketing Estratégico",
    subtitle: "Strategic Marketing",
    description: "Estratégias de marketing para posicionamento de marca, captação de clientes e crescimento sustentável.",
    features: ["Posicionamento de marca", "Estratégia digital", "Marketing de conteúdo", "Branding e identidade", "Gestão de redes sociais"],
    badge: "Digital"
  },
  {
    icon: Rocket,
    title: "Inovação e Transformação",
    subtitle: "Innovation & Transformation",
    description: "Acelere a inovação e transforme sua organização com metodologias ágeis e cultura de experimentação.",
    features: ["Metodologias ágeis", "Design Thinking", "Cultura de inovação", "Digitalização de processos", "Novos modelos de negócio"],
    badge: "Future Ready"
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4A0E1A] via-[#6B1A2A] to-[#8B1A3A] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E3C9A8]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#E3C9A8]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
              Serviços Premium
            </motion.div>

            <motion.h1 
              className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Soluções que <br />
              <span className="text-[#E3C9A8]">transformam organizações</span>
            </motion.h1>

            <motion.p 
              className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
            >
              Combinamos estratégia, tecnologia e inteligência humana para criar 
              soluções que geram resultados extraordinários.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.85 }}
            >
              <Link href="/contato">
                <button className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white bg-[#6B1A2A] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <span className="relative z-10 flex items-center gap-2">
                    Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-0 bg-[#E3C9A8] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
              </Link>
              <Link href="#servicos">
                <button className="px-8 py-3.5 text-sm font-medium tracking-wider text-white border border-white/40 rounded-lg hover:bg-white/10 transition-all duration-300">
                  Conheça nossos serviços
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#6B1A2A] uppercase font-medium">Nossas Soluções</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
              Serviços <span className="text-[#6B1A2A]">Premium</span>
            </h2>
            <div className="w-16 h-1 bg-[#6B1A2A] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicosList.map((servico, index) => {
              const Icon = servico.icon
              return (
                <motion.div 
                  key={index}
                  className="group relative bg-white border border-[#E8EAE0] rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#6B1A2A] text-white text-xs font-semibold rounded-full shadow-lg">
                      {servico.badge}
                    </span>
                  </div>

                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#F8F4E6] text-[#6B1A2A] group-hover:bg-[#6B1A2A] group-hover:text-white transition-colors duration-300">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold text-[#2D343A] group-hover:text-[#6B1A2A] transition-colors">
                    {servico.title}
                  </h3>
                  <p className="text-sm text-[#6B1A2A]/70 font-medium mt-0.5">
                    {servico.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-[#708090] leading-relaxed">
                    {servico.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {servico.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#708090]">
                        <CheckCircle className="h-4 w-4 text-[#6B1A2A] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                    <Link href="/contato" className="text-[#6B1A2A] font-medium text-sm hover:underline flex items-center gap-1 group">
                      Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1A2A] via-[#E3C9A8] to-[#6B1A2A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAIS ===== */}
      <section className="py-20 bg-[#F8F4E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#6B1A2A] uppercase font-medium">Por que escolher a ZENTHOS</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
              Nossos <span className="text-[#6B1A2A]">Diferenciais</span>
            </h2>
            <div className="w-16 h-1 bg-[#6B1A2A] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Globe, title: "Visão Global", desc: "Padrões internacionais aplicados à realidade brasileira" },
              { icon: Zap, title: "Tecnologia Aplicada", desc: "IA e análise de dados para decisões estratégicas" },
              { icon: Users, title: "Excelência Humana", desc: "Especialistas em desenvolvimento organizacional" },
              { icon: Award, title: "Resultados Comprovados", desc: "Casos de sucesso em diversos setores" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-[#E8EAE0] text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#6B1A2A]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D343A]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#708090]">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-gradient-to-br from-[#4A0E1A] to-[#6B1A2A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Pronto para transformar sua organização?
          </h2>
          <p className="mt-4 text-[#E3C9A8] max-w-2xl mx-auto">
            Descubra como nossas soluções podem acelerar o crescimento da sua empresa.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contato">
              <button className="px-8 py-4 text-sm font-semibold text-[#6B1A2A] bg-white rounded-lg hover:bg-[#E3C9A8] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Solicitar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <a href="https://wa.me/5534991850735" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/60 rounded-lg hover:bg-white hover:text-[#6B1A2A] transition-all duration-300">
                Falar com Especialista
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
