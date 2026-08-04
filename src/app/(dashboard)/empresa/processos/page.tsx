'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FileText, Search, Eye, Users, Calendar, Clock, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function EmpresaProcessos() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')

  const processos = [
    { 
      id: 1, 
      titulo: 'Analista Administrativo', 
      empresa: 'ZENTHOS', 
      candidatos: 8, 
      status: 'Em andamento', 
      data: '10/07/2026',
      etapa: 'Entrevistas',
      progresso: 65
    },
    { 
      id: 2, 
      titulo: 'Desenvolvedor Full Stack', 
      empresa: 'Tech Corp', 
      candidatos: 4, 
      status: 'Em andamento', 
      data: '08/07/2026',
      etapa: 'Triagem',
      progresso: 30
    },
    { 
      id: 3, 
      titulo: 'Analista de RH', 
      empresa: 'RH Solutions', 
      candidatos: 12, 
      status: 'Concluído', 
      data: '01/07/2026',
      etapa: 'Finalizado',
      progresso: 100
    },
    { 
      id: 4, 
      titulo: 'Designer UX/UI', 
      empresa: 'Design Co', 
      candidatos: 6, 
      status: 'Pausado', 
      data: '05/07/2026',
      etapa: 'Aguardando',
      progresso: 20
    },
  ]

  const filtered = processos.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase()) ||
                        p.empresa.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todos' || p.status === filter
    return matchSearch && matchFilter
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Em andamento': 'bg-blue-100 text-blue-700',
      'Concluído': 'bg-green-100 text-green-700',
      'Pausado': 'bg-yellow-100 text-yellow-700',
      'Cancelado': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'Em andamento': Clock,
      'Concluído': CheckCircle,
      'Pausado': AlertCircle,
      'Cancelado': XCircle
    }
    return icons[status] || Clock
  }

  const statusCount = {
    total: processos.length,
    andamento: processos.filter(p => p.status === 'Em andamento').length,
    concluido: processos.filter(p => p.status === 'Concluído').length,
    pausado: processos.filter(p => p.status === 'Pausado').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#6B1A2A]" />
                Processos
              </h1>
              <p className="text-sm text-[#708090]">{statusCount.total} processos</p>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#708090]" />
              <input
                type="text"
                placeholder="Buscar processos por título ou empresa..."
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter('Todos')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Todos' ? 'bg-[#6B1A2A] text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Todos ({statusCount.total})
              </button>
              <button 
                onClick={() => setFilter('Em andamento')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Em andamento' ? 'bg-blue-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Em andamento ({statusCount.andamento})
              </button>
              <button 
                onClick={() => setFilter('Concluído')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Concluído' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Concluídos ({statusCount.concluido})
              </button>
              <button 
                onClick={() => setFilter('Pausado')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Pausado' ? 'bg-yellow-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Pausados ({statusCount.pausado})
              </button>
            </div>
          </div>
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <FileText className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhum processo encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((processo) => {
              const StatusIcon = getStatusIcon(processo.status)
              return (
                <div key={processo.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#2D343A]">{processo.titulo}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(processo.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {processo.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                        <span>{processo.empresa}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {processo.candidatos} candidatos
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {processo.data}
                        </span>
                        <span className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          {processo.etapa}
                        </span>
                      </div>
                      {/* Barra de progresso */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-[#708090] mb-1">
                          <span>Progresso</span>
                          <span>{processo.progresso}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F8F4E6] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              processo.progresso === 100 ? 'bg-green-600' :
                              processo.progresso >= 60 ? 'bg-blue-600' :
                              processo.progresso >= 30 ? 'bg-yellow-600' : 'bg-gray-400'
                            }`}
                            style={{ width: `${processo.progresso}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/empresa/processos/${processo.id}`)}
                      className="p-2 hover:bg-[#F8F4E6] rounded-lg transition ml-4"
                    >
                      <Eye className="h-4 w-4 text-[#708090]" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
