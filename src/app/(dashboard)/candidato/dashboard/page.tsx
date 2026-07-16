'use client'

import Link from 'next/link'
import { 
  Briefcase, Clock, CheckCircle, TrendingUp,
  ArrowRight, Eye, Search, Plus
} from 'lucide-react'

// ===== DADOS =====
const kpis = [
  { title: 'Candidaturas', value: 12, change: 8, icon: <Briefcase className="h-6 w-6" />, color: 'bg-blue-500' },
  { title: 'Em Andamento', value: 5, change: -2, icon: <Clock className="h-6 w-6" />, color: 'bg-yellow-500' },
  { title: 'Entrevistas', value: 3, change: 15, icon: <CheckCircle className="h-6 w-6" />, color: 'bg-green-500' },
  { title: 'Taxa de Sucesso', value: '68%', change: 12, icon: <TrendingUp className="h-6 w-6" />, color: 'bg-purple-500' }
]

const vagasRecomendadas = [
  { title: 'Desenvolvedor Full Stack', empresa: 'XPTO Tech', local: 'Remoto', salario: 'R$ 8.000 - R$ 12.000' },
  { title: 'UX Designer Sênior', empresa: 'XPTO Tech', local: 'Híbrido', salario: 'R$ 7.000 - R$ 10.000' },
  { title: 'Product Owner', empresa: 'XPTO Tech', local: 'Presencial', salario: 'R$ 9.000 - R$ 14.000' }
]

export default function CandidatoDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Olá, João! 👋</h1>
            <p className="text-sm text-gray-500 mt-1">Acompanhe sua jornada profissional</p>
          </div>
          <Link href="/candidato/vagas">
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Buscar Vagas
            </button>
          </Link>
        </div>

        {/* ===== KPIS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`${kpi.color} rounded-xl p-3 text-white shadow-lg`}>
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className={`text-sm font-medium ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change > 0 ? '↑' : '↓'} {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="text-sm text-gray-400">vs mês anterior</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== VAGAS RECOMENDADAS ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Vagas Recomendadas</h3>
              <p className="text-sm text-gray-500">Com base no seu perfil</p>
            </div>
            <Link href="/candidato/vagas">
              <button className="text-sm font-semibold text-[#8B0000] hover:text-[#700000] transition flex items-center gap-1">
                Ver todas <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="space-y-4">
            {vagasRecomendadas.map((vaga, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#8B0000]/30 hover:bg-gray-50/50 transition-all">
                <div>
                  <h4 className="font-semibold text-gray-900">{vaga.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">{vaga.empresa}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{vaga.local}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm font-medium text-[#8B0000]">{vaga.salario}</span>
                  </div>
                </div>
                <button className="mt-3 sm:mt-0 px-4 py-2 text-sm font-medium text-[#8B0000] border border-[#8B0000]/30 rounded-lg hover:bg-[#8B0000] hover:text-white transition-all">
                  Candidatar-se
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
