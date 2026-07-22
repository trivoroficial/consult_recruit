'use client'

import { Users, DollarSign, Shield, Building2, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const servicosList = [
  {
    icon: Users,
    title: "Gestão de Pessoas",
    description: "Soluções completas para gestão de pessoas, cultura e desenvolvimento organizacional.",
    features: ["Recrutamento e Seleção", "Treinamentos e Desenvolvimento", "Avaliação de desempenho", "Plano de cargos e salários", "Clima organizacional"]
  },
  {
    icon: DollarSign,
    title: "Consultoria Financeira",
    description: "Organização financeira para aumentar a lucratividade e sustentabilidade do negócio.",
    features: ["Fluxo de caixa", "Formação de preço", "Controle de custos", "Indicadores financeiros", "Planejamento tributário"]
  },
  {
    icon: Shield,
    title: "Segurança dos Alimentos",
    description: "Adequação às normas sanitárias e implantação de Boas Práticas de Fabricação.",
    features: ["Manual de Boas Práticas", "POPs", "Treinamentos", "Auditorias internas", "Consultoria para MAPA"]
  },
  {
    icon: Building2,
    title: "Gestão Empresarial",
    description: "Diagnóstico e planejamento estratégico para crescimento sustentável.",
    features: ["Diagnóstico empresarial", "Planejamento estratégico", "Definição de metas", "Indicadores (KPIs)", "Governança corporativa"]
  }
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#2D343A] text-center mb-4">Nossos Serviços</h1>
        <p className="text-center text-[#708090] max-w-2xl mx-auto mb-12">
          Soluções completas para transformar sua organização
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicosList.map((servico, index) => {
            const Icon = servico.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-8 border border-[#E8EAE0] hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[#8B0000]/10 text-[#8B0000]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[#2D343A]">{servico.title}</h3>
                <p className="text-sm text-[#708090] mt-2">{servico.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {servico.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#708090]">
                      <CheckCircle className="h-4 w-4 text-[#8B0000]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contato" className="inline-flex items-center gap-2 mt-4 text-[#8B0000] font-medium hover:underline">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
