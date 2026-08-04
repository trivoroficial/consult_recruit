'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Search, Eye, MapPin, Users, Clock, 
  Filter, ArrowUpDown, UserCheck, UserX, Calendar,
  ChevronDown, ChevronUp
} from 'lucide-react'

export default function EmpresaVagas() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todas')
  const [expandida, setExpandida] = useState<number | null>(null)

  const vagas = [
    { 
      id: 1, 
      titulo: 'Analista Administrativo', 
      local: 'Uberlândia - MG', 
      status: 'Aberta', 
      candidatos: [
        { id: 1, nome: 'João Silva', status: 'Em análise' },
        { id: 2, nome: 'Maria Santos', status: 'Entrevista' },
        { id: 3, nome: 'Pedro Oliveira', status: 'Aprovado' },
        { id: 4, nome: 'Ana Ferreira', status: 'Em análise' },
      ],
      data: '10/07/2026', 
      tipo: 'CLT',
      origem: 'Admin',
      total_vagas: 3,
      preenchidas: 1
    },
    { 
      id: 2, 
      titulo: 'Mecânico de Motos', 
      local: 'Uberlândia - MG', 
      status: 'Em andamento', 
      candidatos: [
        { id: 5, nome: 'Carlos Eduardo', status: 'Entrevista' },
        { id: 6, nome: 'Roberto Silva', status: 'Em análise' },
      ],
      data: '08/07/2026', 
      tipo: 'CLT',
      origem: 'Operacional',
      total_vagas: 2,
      preenchidas: 0
    },
    { 
      id: 3, 
      titulo: 'Desenvolvedor Full Stack', 
      local: 'Remoto', 
      status: 'Finalizada', 
      candidatos: [
        { id: 7, nome: 'Lucas Mendes', status: 'Contratado' },
        { id: 8, nome: 'Fernanda Lima', status: 'Contratado' },
        { id: 9, nome: 'Rafael Costa', status: 'Reprovado' },
      ],
      data: '01/07/2026', 
      tipo: 'PJ',
      origem: 'Admin',
      total_vagas: 2,
      preenchidas: 2
    },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Aberta': 'bg-green-100 text-green-700',
      'Em andamento': 'bg-yellow-100 text-yellow-700',
      'Finalizada': 'bg-blue-100 text-blue-700',
      'Cancelada': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusCandidatoColor = (status: string) => {
    const colors: Record<string, string> = {
      'Em análise': 'bg-yellow-100 text-yellow-700',
      'Entrevista': 'bg-blue-100 text-blue-700',
      'Aprovado': 'bg-green-100 text-green-700',
      'Contratado': 'bg-purple-100 text-purple-700',
      'Reprovado': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusCandidatoIcon = (status: string) => {
    if (status === 'Aprovado' || status === 'Contratado') return '✅'
    if (status === 'Reprovado') return '❌'
    if (status === 'Entrevista') return '📅'
    return '⏳'
  }

  const filtered = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(search.toLowerCase()) ||
                        v.local.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todas' || v.status === filter
    return matchSearch && matchFilter
  })

  const statusCount = {
    total: vagas.length,
    abertas: vagas.filter(v => v.status === 'Aberta').length,
    andamento: vagas.filter(v => v.status === 'Em andamento').length,
    finalizadas: vagas.filter(v => v.status === 'Finalizada').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-[#6B1A2A]" />
                Vagas da Empresa
              </h1>
              <p className="text-sm text-[#708090]">
                {statusCount.total} vagas • {statusCount.abertas} abertas • {statusCount.finalizadas} finalizadas
              </p>
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
                placeholder="Buscar vagas por título ou local..."
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter('Todas')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Todas' ? 'bg-[#6B1A2A] text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Todas ({statusCount.total})
              </button>
              <button 
                onClick={() => setFilter('Aberta')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Aberta' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Abertas ({statusCount.abertas})
              </button>
              <button 
                onClick={() => setFilter('Em andamento')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Em andamento' ? 'bg-yellow-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Em andamento ({statusCount.andamento})
              </button>
              <button 
                onClick={() => setFilter('Finalizada')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Finalizada' ? 'bg-blue-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Finalizadas ({statusCount.finalizadas})
              </button>
            </div>
          </div>
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhuma vaga encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((vaga) => (
              <div key={vaga.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] overflow-hidden">
                <div 
                  className="p-4 hover:bg-[#F8F4E6] transition cursor-pointer"
                  onClick={() => setExpandida(expandida === vaga.id ? null : vaga.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-[#2D343A]">{vaga.titulo}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(vaga.status)}`}>
                          {vaga.status}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          vaga.origem === 'Operacional' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {vaga.origem}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {vaga.local}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {vaga.candidatos.length} candidatos
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="h-4 w-4" />
                          {vaga.preenchidas}/{vaga.total_vagas} preenchidas
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {vaga.data}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#708090]">
                        {expandida === vaga.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandir - Lista de Candidatos */}
                {expandida === vaga.id && (
                  <div className="border-t border-[#E8EAE0] p-4 bg-[#F8F4E6]">
                    <h4 className="font-medium text-[#2D343A] mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#6B1A2A]" />
                      Candidatos Inscritos ({vaga.candidatos.length})
                    </h4>
                    {vaga.candidatos.length === 0 ? (
                      <p className="text-sm text-[#708090]">Nenhum candidato inscrito</p>
                    ) : (
                      <div className="space-y-2">
                        {vaga.candidatos.map((candidato) => (
                          <div key={candidato.id} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#E8EAE0]">
                            <span className="text-sm font-medium text-[#2D343A]">
                              {candidato.nome}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusCandidatoColor(candidato.status)}`}>
                              {getStatusCandidatoIcon(candidato.status)} {candidato.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
