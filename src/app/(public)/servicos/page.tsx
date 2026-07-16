'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  Shield, 
  Building2, 
  Settings, 
  Briefcase, 
  ClipboardList, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react'

const servicos = [
  {
    icon: Users,
    title: "Recrutamento & Seleção",
    description: "Encontramos os profissionais certos para sua empresa, com triagem inteligente e entrevistas estruturadas.",
    features: ["Busca ativa de talentos", "Triagem inteligente", "Entrevistas estruturadas", "Banco de talentos"],
    link: "/servicos/recrutamento"
  },
  {
    icon: Building2,
    title: "Gestão de Pessoas",
    description: "Estratégias para desenvolver equipes, fortalecer a cultura e impulsionar resultados.",
    features: ["Pesquisa de clima", "Avaliação de desempenho", "Treinamentos", "Plano de desenvolvimento"],
    link: "/servicos/gestao-pessoas"
  },
  {
    icon: DollarSign,
    title: "Consultoria Financeira",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio.",
    features: ["Fluxo de caixa", "Formação de preço", "Controle de custos", "Indicadores financeiros"],
    link: "/servicos/consultoria-financeira"
  },
  {
    icon: Shield,
    title: "Segurança dos Alimentos",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação.",
    features: ["Manual de Boas Práticas", "POPs", "Treinamentos", "Auditorias internas"],
    link: "/servicos/seguranca-alimentos"
  },
  {
    icon: Settings,
    title: "Consultoria em Processos",
    description: "Mapeamento, padronização e otimização de processos para aumento da produtividade.",
    features: ["Mapeamento de processos", "Padronização", "Elaboração de POPs", "Redução de desperdícios"],
    link: "/servicos/consultoria-processos"
  },
  {
    icon: Briefcase,
    title: "Consultoria Comercial",
    description: "Estruturação do setor comercial para aumento de vendas e satisfação do cliente.",
    features: ["Estruturação do setor comercial", "Metas de vendas", "Atendimento ao cliente", "Indicadores comerciais"],
    link: "/servicos/consultoria-comercial"
  },
  {
    icon: ClipboardList,
    title: "Consultoria em Qualidade",
    description: "Padronização de processos e gestão por indicadores para excelência operacional.",
    features: ["Padronização de processos", "Procedimentos Operacionais", "Documentação", "Gestão por indicadores"],
    link: "/servicos/consultoria-qualidade"
  },
  {
    icon: Rocket,
    title: "Pequenos Negócios",
    description: "Soluções personalizadas para pequenos negócios aumentarem produtividade e reduzirem custos.",
    features: ["Diagnóstico empresarial", "Plano de ação", "Aumento da produtividade", "Redução de custos"],
    link: "/servicos/pequenos-negocios"
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Servicos() {
  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      
      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 bg-[#2D343A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#8B0000]/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-2 text-[11px] tracking-[0.34em] text-[#E3C9A8] uppercase font-medium border border-[#E3C9A8]/30 rounded-full bg-white/10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="h-2 w-2 rounded-full bg-[#E3C9A8]" />
              Nossos Serviços
            </motion.div>
            <motion.h1 
              className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Soluções completas para <br />
              <span className="text-[#E3C9A8]">transformar sua organização</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-white/70 max-w-2xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
            >
              Serviços estratégicos para empresas que buscam crescimento sustentável, 
              eficiência operacional e resultados extraordinários.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.36em] text-[#8B0000] uppercase font-medium">O que fazemos</p>
            <h2 className="mt-4 font-serif text-4xl text-[#2D343A] md:text-5xl">
              Nossos <span className="text-[#8B0000]">Serviços</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B0000] rounded-full mx-auto mt-4"></div>
            <p className="mt-4 text-[#708090] max-w-2xl mx-auto">
              Conheça nossas soluções e como podemos ajudar sua empresa a alcançar o próximo nível
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicos.map((servico, index) => {
              const Icon = servico.icon
              return (
                <motion.div 
                  key={index} 
                  className="group relative bg-white border border-[#E8EAE0] rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
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
                        <CheckCircle className="h-4 w-4 text-[#E3C9A8]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={servico.link}
                    className="mt-6 inline-flex items-center gap-2 text-[#8B0000] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:gap-3"
                  >
                    Saiba mais <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 bg-[#2D343A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            Sua empresa pronta para a transformação?
          </h2>
          <p className="mt-4 text-[#A1A8AE] max-w-2xl mx-auto">
            Fale com um de nossos especialistas e descubra como podemos ajudar sua empresa.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/cadastro">
              <button className="px-8 py-4 text-sm font-semibold text-white bg-[#8B0000] rounded-lg hover:bg-[#700000] transition-all duration-300 shadow-lg shadow-[#8B0000]/20 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Solicitar Diagnóstico
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/contato">
              <button className="px-8 py-4 text-sm font-semibold text-white border-2 border-white/40 rounded-lg hover:bg-white hover:text-[#2D343A] hover:border-white transition-all duration-300 flex items-center justify-center gap-2">
                Falar com Especialista
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
