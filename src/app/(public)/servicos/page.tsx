import { Users, TrendingUp, Shield, Briefcase, ArrowRight } from 'lucide-react'

const servicos = [
  {
    icon: Users,
    title: 'Recrutamento & Seleção',
    description: 'Encontramos profissionais alinhados ao perfil técnico e comportamental da sua organização.',
    features: ['Busca ativa de talentos', 'Triagem inteligente', 'Entrevistas estruturadas', 'Banco de talentos']
  },
  {
    icon: TrendingUp,
    title: 'Gestão de Pessoas',
    description: 'Estratégias para desenvolver equipes e fortalecer a cultura organizacional.',
    features: ['Pesquisa de clima', 'Avaliação de desempenho', 'Treinamentos', 'Plano de desenvolvimento']
  },
  {
    icon: Shield,
    title: 'Consultoria Financeira',
    description: 'Estruturação financeira para empresas mais saudáveis e competitivas.',
    features: ['Planejamento financeiro', 'Fluxo de caixa', 'Indicadores', 'Precificação']
  },
  {
    icon: Briefcase,
    title: 'Segurança dos Alimentos',
    description: 'Implementação de processos seguros e eficientes para sua indústria.',
    features: ['Boas Práticas', 'POP', 'APPCC', 'Auditorias']
  }
]

export default function Servicos() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Nossos <span className="text-purple-600">Serviços</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Soluções estratégicas para transformar sua empresa e alcançar resultados extraordinários.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {servicos.map((servico, index) => (
          <div key={index} className="bg-white p-8 rounded-xl border shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <servico.icon className="h-7 w-7 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold">{servico.title}</h2>
            <p className="mt-2 text-gray-600">{servico.description}</p>
            <ul className="mt-4 space-y-2">
              {servico.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-purple-600">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
