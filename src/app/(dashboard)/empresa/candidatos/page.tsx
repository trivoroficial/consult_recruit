'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Users, Search, Eye, Mail, Phone, MapPin, Filter, Star, Clock } from 'lucide-react'

export default function EmpresaCandidatos() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')

  const candidatos = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@email.com', telefone: '(34) 99999-9999', cidade: 'Uberlândia', status: 'Disponível', score: 85, data: '10/07/2026' },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@email.com', telefone: '(34) 88888-8888', cidade: 'Uberlândia', status: 'Em processo', score: 92, data: '08/07/2026' },
    { id: 3, nome: 'Pedro Oliveira', email: 'pedro@email.com', telefone: '(34) 77777-7777', cidade: 'Araguari', status: 'Disponível', score: 78, data: '05/07/2026' },
    { id: 4, nome: 'Ana Ferreira', email: 'ana@email.com', telefone: '(34) 66666-6666', cidade: 'Uberlândia', status: 'Contratado', score: 95, data: '01/07/2026' },
  ]

  const filtered = candidatos.filter(c => {
    const matchSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
                        c.email.toLowerCase().includes(search.toLowerCase()) ||
                        c.cidade.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todos' || c.status === filter
    return matchSearch && matchFilter
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Disponível': 'bg-green-100 text-green-700',
      'Em processo': 'bg-yellow-100 text-yellow-700',
      'Contratado': 'bg-blue-100 text-blue-700',
      'Inativo': 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const statusCount = {
    total: candidatos.length,
    disponivel: candidatos.filter(c => c.status === 'Disponível').length,
    processo: candidatos.filter(c => c.status === 'Em processo').length,
    contratado: candidatos.filter(c => c.status === 'Contratado').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Users className="h-6 w-6 text-[#6B1A2A]" />
                Candidatos
              </h1>
              <p className="text-sm text-[#708090]">{statusCount.total} candidatos</p>
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
                placeholder="Buscar candidatos por nome, email ou cidade..."
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
                onClick={() => setFilter('Disponível')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Disponível' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Disponível ({statusCount.disponivel})
              </button>
              <button 
                onClick={() => setFilter('Em processo')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Em processo' ? 'bg-yellow-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Em processo ({statusCount.processo})
              </button>
              <button 
                onClick={() => setFilter('Contratado')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Contratado' ? 'bg-blue-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Contratado ({statusCount.contratado})
              </button>
            </div>
          </div>
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Users className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhum candidato encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((candidato) => (
              <div key={candidato.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[#2D343A]">{candidato.nome}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(candidato.status)}`}>
                        {candidato.status}
                      </span>
                      <span className={`text-sm font-medium ${getScoreColor(candidato.score)}`}>
                        Score: {candidato.score}%
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {candidato.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {candidato.telefone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {candidato.cidade}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {candidato.data}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/empresa/candidatos/${candidato.id}`)}
                    className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
                  >
                    <Eye className="h-4 w-4 text-[#708090]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
