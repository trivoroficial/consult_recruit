'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, Briefcase, Calendar, TrendingUp, 
  ArrowUp, ArrowDown, Eye, Clock, Plus,
  ChevronRight, Search, Filter, BarChart3
} from 'lucide-react'

// ===== DADOS =====
const kpis = [
  { title: 'Vagas Ativas', value: 8, change: 12, icon: <Briefcase className="h-6 w-6" />, color: 'bg-purple-500' },
  { title: 'Candidatos', value: 47, change: 8.5, icon: <Users className="h-6 w-6" />, color: 'bg-blue-500' },
  { title: 'Entrevistas', value: 15, change: -3, icon: <Calendar className="h-6 w-6" />, color: 'bg-orange-500' },
  { title: 'Contratações', value: 12, change: 15.7, icon: <TrendingUp className="h-6 w-6" />, color: 'bg-green-500' }
]

const vagasRecentes = [
  { title: 'Desenvolvedor Full Stack', candidatos: 28, status: 'Ativa', data: '15/07/2026' },
  { title: 'UX Designer Sênior', candidatos: 15, status: 'Em andamento', data: '14/07/2026' },
  { title: 'Product Owner', candidatos: 9, status: 'Ativa', data: '12/07/2026' },
  { title: 'Analista de Dados', candidatos: 22, status: 'Encerrada', data: '10/07/2026' }
]

export default function EmpresaDashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Visão geral da sua empresa</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/empresa/vagas/nova">
              <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Vaga
              </button>
            </Link>
          </div>
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
                  {kpi.change > 0 ? <ArrowUp className="h-3 w-3 inline mr-1" /> : <ArrowDown className="h-3 w-3 inline mr-1" />}
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
                <span className="text-sm text-gray-400">vs mês anterior</span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== VAGAS RECENTES ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Vagas Recentes</h3>
              <p className="text-sm text-gray-500">Acompanhe suas vagas publicadas</p>
            </div>
            <Link href="/empresa/vagas">
              <button className="text-sm font-semibold text-[#8B0000] hover:text-[#700000] transition flex items-center gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vaga</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidatos</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="text-right py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {vagasRecentes.map((vaga, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 text-sm font-medium text-gray-900">{vaga.title}</td>
                    <td className="py-3 text-sm text-gray-600">{vaga.candidatos}</td>
                    <td className="py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        vaga.status === 'Ativa' ? 'bg-green-100 text-green-700' :
                        vaga.status === 'Em andamento' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {vaga.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{vaga.data}</td>
                    <td className="py-3 text-right">
                      <button className="text-[#8B0000] hover:text-[#700000] text-sm font-medium">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
