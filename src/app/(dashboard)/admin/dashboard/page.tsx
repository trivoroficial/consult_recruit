'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Building2, Users, Briefcase, TrendingUp, 
  ArrowUp, ArrowDown, Eye, Clock, Plus,
  ChevronRight, Search, Filter, BarChart3,
  PieChart, Calendar, CheckCircle, AlertCircle
} from 'lucide-react'

// ===== DADOS =====
const kpis = [
  { title: 'Empresas Ativas', value: 32, change: 8.5, icon: <Building2 className="h-6 w-6" />, color: 'bg-blue-500' },
  { title: 'Candidatos', value: 1547, change: 12.3, icon: <Users className="h-6 w-6" />, color: 'bg-green-500' },
  { title: 'Vagas Abertas', value: 45, change: -3.2, icon: <Briefcase className="h-6 w-6" />, color: 'bg-purple-500' },
  { title: 'Contratações', value: 28, change: 15.7, icon: <TrendingUp className="h-6 w-6" />, color: 'bg-orange-500' }
]

const processosStatus = [
  { label: 'Em andamento', value: 12, color: 'bg-blue-500' },
  { label: 'Em entrevista', value: 8, color: 'bg-yellow-500' },
  { label: 'Concluídos', value: 15, color: 'bg-green-500' },
  { label: 'Cancelados', value: 3, color: 'bg-red-500' }
]

const atividadesRecentes = [
  { id: 1, tipo: 'empresa', titulo: 'Nova empresa cadastrada', descricao: 'XPTO Tecnologia - Solicitou recrutamento', tempo: 'Há 2 horas', status: 'pending' },
  { id: 2, tipo: 'candidato', titulo: 'Novo candidato', descricao: 'João Silva - Desenvolvedor Full Stack', tempo: 'Há 4 horas', status: '' },
  { id: 3, tipo: 'vaga', titulo: 'Vaga publicada', descricao: 'UX Designer - Salário: R$ 8.000', tempo: 'Há 6 horas', status: 'approved' },
  { id: 4, tipo: 'processo', titulo: 'Processo encerrado', descricao: 'Desenvolvedor Frontend - 3 contratados', tempo: 'Há 1 dia', status: '' },
  { id: 5, tipo: 'empresa', titulo: 'Empresa bloqueada', descricao: 'Financeira ABC - Pendência documental', tempo: 'Há 2 dias', status: 'rejected' }
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = atividadesRecentes.filter(a => 
    a.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'approved': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Pendente'
      case 'approved': return 'Aprovado'
      case 'rejected': return 'Rejeitado'
      default: return ''
    }
  }

  const getIcon = (tipo: string) => {
    switch(tipo) {
      case 'empresa': return <Building2 className="h-4 w-4 text-blue-500" />
      case 'candidato': return <Users className="h-4 w-4 text-green-500" />
      case 'vaga': return <Briefcase className="h-4 w-4 text-purple-500" />
      case 'processo': return <TrendingUp className="h-4 w-4 text-orange-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Visão geral da plataforma ZENTHOS</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar atividades..."
                className="w-64 px-4 py-2.5 pl-10 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link href="/admin/empresas/nova">
              <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Empresa
              </button>
            </Link>
          </div>
        </div>

        {/* ===== KPIS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{kpi.value.toLocaleString()}</p>
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

        {/* ===== GRÁFICOS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* PROCESSOS */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Processos Seletivos</h3>
                <p className="text-sm text-gray-500">Distribuição por status</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition">
                  <BarChart3 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition">
                  <PieChart className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {processosStatus.map((status, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{status.label}</span>
                    <span className="font-semibold text-gray-900">{status.value}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${status.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${(status.value / 38) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESUMO RÁPIDO */}
          <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Rápido</h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-600">Empresas ativas</span>
                <span className="text-sm font-semibold text-gray-900">32</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-600">Candidatos em processo</span>
                <span className="text-sm font-semibold text-gray-900">48</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-sm text-gray-600">Vagas urgentes</span>
                <span className="text-sm font-semibold text-red-600">12</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600">Taxa de aprovação</span>
                <span className="text-sm font-semibold text-green-600">78%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/admin/relatorios">
                <button className="w-full py-2.5 text-sm font-semibold text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition-all duration-300">
                  Ver Relatório Completo
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== ATIVIDADES RECENTES ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
              <p className="text-sm text-gray-500">Últimas movimentações na plataforma</p>
            </div>
            <Link href="/admin/atividades">
              <button className="text-sm font-semibold text-[#8B0000] hover:text-[#700000] transition flex items-center gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="space-y-2">
            {filtered.map((item) => (
              <div key={item.id} className="flex items-start gap-4 py-3 px-3 hover:bg-gray-50/50 rounded-xl transition-all border-b border-gray-50 last:border-0">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {getIcon(item.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{item.titulo}</p>
                    {item.status && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{item.descricao}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.tempo}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>Nenhuma atividade encontrada</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
