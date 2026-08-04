'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Search, Eye, MapPin, Users, Clock, Filter, ArrowUpDown } from 'lucide-react'

export default function EmpresaVagas() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todas')
  
  const vagas = [
    { id: 1, titulo: 'Analista Administrativo', local: 'Uberlândia - MG', status: 'Aberta', candidatos: 8, data: '10/07/2026', tipo: 'CLT' },
    { id: 2, titulo: 'Desenvolvedor Full Stack', local: 'Remoto', status: 'Aberta', candidatos: 4, data: '08/07/2026', tipo: 'PJ' },
    { id: 3, titulo: 'Analista de RH', local: 'São Paulo - SP', status: 'Fechada', candidatos: 12, data: '01/07/2026', tipo: 'CLT' },
    { id: 4, titulo: 'Designer UX/UI', local: 'Remoto', status: 'Aberta', candidatos: 6, data: '05/07/2026', tipo: 'PJ' },
  ]

  const filtered = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(search.toLowerCase()) ||
                        v.local.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todas' || v.status === filter
    return matchSearch && matchFilter
  })

  const statusCount = {
    total: vagas.length,
    abertas: vagas.filter(v => v.status === 'Aberta').length,
    fechadas: vagas.filter(v => v.status === 'Fechada').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-[#6B1A2A]" />
                Vagas
              </h1>
              <p className="text-sm text-[#708090]">{statusCount.total} vagas cadastradas</p>
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
            <div className="flex gap-2">
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
                onClick={() => setFilter('Fechada')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Fechada' ? 'bg-red-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Fechadas ({statusCount.fechadas})
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
              <div key={vaga.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[#2D343A]">{vaga.titulo}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {vaga.status}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F8F4E6] rounded-full text-xs text-[#708090]">
                        {vaga.tipo}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {vaga.local}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {vaga.candidatos} candidatos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {vaga.data}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/empresa/vagas/${vaga.id}`)}
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
