'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, DollarSign, Shield, Building2, 
  CheckCircle, ArrowRight, Sparkles, 
  TrendingUp, Award, Globe, Zap,
  BarChart3, Target, Lightbulb, Rocket,
  Briefcase, Clock, Star, Crown,
  ChevronRight, Phone, Mail, MapPin
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const servicosList = [
  {
    id: 1,
    icon: Users,
    title: "Gestão de Pessoas",
    subtitle: "People & Culture",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional. Transformamos sua força de trabalho em vantagem competitiva.",
    features: [
      "Recrutamento e Seleção Estratégico",
      "Treinamentos e Desenvolvimento",
      "Avaliação de desempenho 360°",
      "Plano de cargos e salários",
      "Clima organizacional e engajamento",
      "Programas de liderança e sucessão"
    ],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    badge: "Top 1%",
    stats: "+200 empresas atendidas"
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Consultoria Financeira",
    subtitle: "Financial Advisory",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio. Estratégias financeiras que geram resultados reais.",
    features: [
      "Fluxo de caixa e capital de giro",
      "Formação de preço e margem",
      "Controle de custos e despesas",
      "Indicadores financeiros (KPIs)",
      "Planejamento tributário",
      "Modelagem financeira"
    ],
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    badge: "Premium",
    stats: "+R$ 500M em resultados gerados"
  },
  {
    id: 3,
    icon: Shield,
    title: "Segurança dos Alimentos",
    subtitle: "Food Safety & Quality",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação. Garantia de qualidade e segurança para seu negócio.",
    features: [
      "Manual de Boas Práticas (BPF)",
      "Procedimentos Operacionais Padrão (POPs)",
      "Treinamentos e capacitação",
      "Auditorias internas e externas",
      "Consultoria para MAPA e ANVISA",
      "Sistema de Análise de Perigos (APPCC)"
    ],
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    badge: "Certificado",
    stats: "100% de conformidade"
  },
  {
    id: 4,
    icon: Building2,
    title: "Gestão Empresarial",
    subtitle: "Business Management",
    description: "Diagnóstico e planejamento estratégico para crescimento sustentável. Transformação organizacional com foco em resultados.",
    features: [
      "Diagnóstico empresarial completo",
      "Planejamento estratégico",
      "Definição de metas e OKRs",
      "Indicadores de desempenho (KPIs)",
      "Governança corporativa",
      "Transformação digital"
    ],
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    badge: "Estratégico",
    stats: "+300 empresas transformadas"
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Marketing Estratégico",
    subtitle: "Strategic Marketing",
    description: "Estratégias de marketing para posicionamento de marca, captação de clientes e crescimento sustentável.",
    features: [
      "Posicionamento de marca",
      "Estratégia digital",
      "Marketing de conteúdo",
      "Branding e identidade",
      "Gestão de redes sociais",
      "Métricas e ROI"
    ],
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    badge: "Digital",
    stats: "+150 campanhas realizadas"
  },
  {
    id: 6,
    icon: Rocket,
    title: "Inovação e Transformação",
    subtitle: "Innovation & Transformation",
    description: "Acelere a inovação e transforme sua organização com metodologias ágeis e cultura de experimentação.",
    features: [
      "Metodologias ágeis",
      "Design Thinking",
      "Cultura de inovação",
      "Digitalização de processos",
      "Novos modelos de negócio",
      "Estratégia de dados"
    ],
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    badge: "Future Ready",
    stats: "+50 projetos de inovação"
  }
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO PREMIUM ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2D343A] via-[#1A1A2E] to-[#0F0F1A] py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#8B0000]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#E3C9A8]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#8B0000]/5 rounded-full blur-3xl"></div>
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
                <button className="relative px-8 py-3.5 text-sm font-medium tracking-wider text-white bg-[#8B0000] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
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

            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-[#E3C9A8]">15+</p>
                <p className="text-sm text-white/50">Anos de Mercado</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#E3C9A8]">500+</p>
                <p className="text-sm text-white/50">Empresas Atendidas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#E3C9A8]">96%</p>
                <p className="text-sm text-white/50">Satisfação</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#E3C9A8]">4.9★</p>
                <p className="text-sm text-white/50">Avaliação dos Clientes</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section id="servicos" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <motion.p 
              className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Nossas Soluções
            </motion.p>
            <motion.h2 
              className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Serviços <span className="text-[#8B0000]">Premium</span>
            </motion.h2>
            <motion.div 
              className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.p 
              className="mt-4 text-[#708090] max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Soluções integradas que combinam expertise, tecnologia e inovação para resultados extraordinários
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicosList.map((servico, index) => {
              const Icon = servico.icon
              return (
                <motion.div 
                  key={servico.id}
                  className="group relative bg-white border border-[#E8EAE0] rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Background Decorativo */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${servico.bgColor} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#8B0000] text-white text-xs font-semibold rounded-full shadow-lg">
                      {servico.badge}
                    </span>
                  </div>

                  {/* Ícone */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${servico.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold text-[#2D343A] group-hover:text-[#8B0000] transition-colors">
                    {servico.title}
                  </h3>
                  <p className="text-sm text-[#8B0000]/70 font-medium mt-0.5">
                    {servico.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-[#708090] leading-relaxed">
                    {servico.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {servico.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#708090]">
                        <CheckCircle className="h-4 w-4 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                    {servico.features.length > 4 && (
                      <li className="text-sm text-[#8B0000] font-medium pl-6">
                        + {servico.features.length - 4} outros serviços
                      </li>
                    )}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#708090]">{servico.stats}</span>
                      <Link href="/contato" className="text-[#8B0000] font-medium text-sm hover:underline flex items-center gap-1 group">
                        Saiba mais <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Linha decorativa no hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0000] via-[#E3C9A8] to-[#8B0000] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <motion.p 
              className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Por que escolher a ZENTHOS
            </motion.p>
            <motion.h2 
              className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Nossos <span className="text-[#8B0000]">Diferenciais</span>
            </motion.h2>
            <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
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
                  <div className="w-16 h-16 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-[#8B0000]" />
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
      <section className="py-20 bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl">
              Pronto para transformar sua organização?
            </h2>
            <p className="mt-4 text-[#E3C9A8] max-w-2xl mx-auto">
              Descubra como nossas soluções podem acelerar o crescimento da sua empresa.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contato">
                <button className="px-8 py-4 text-sm font-semibold text-[#8B0000] bg-white rounded-lg hover:bg-[#E3C9A8] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                  Solicitar Diagnóstico
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <a href="https://wa.me/5537991177058" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/60 rounded-lg hover:bg-white hover:text-[#8B0000] transition-all duration-300">
                  Falar com Especialista
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
