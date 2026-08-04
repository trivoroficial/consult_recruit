'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Search, Briefcase, MapPin, Building2, Heart, ArrowRight, Eye, Star } from 'lucide-react'

export default function CandidatoVagas() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [favoritos, setFavoritos] = useState<number[]>([])

  // Mock - depois buscar do Supabase
  const [vagas] = useState([
    { id: 1, titulo: 'Analista Administrativo', empresa: 'ZENTHOS', local: 'Uberlândia - MG', tipo: 'CLT', status: 'Aberta', descricao: 'Análise de processos administrativos e suporte à gestão.' },
    { id: 2, titulo: 'Desenvolvedor Full Stack', empresa: 'Tech Corp', local: 'Remoto', tipo: 'PJ', status: 'Aberta', descricao: 'Desenvolvimento de aplicações web com React e Node.js.' },
    { id: 3, titulo: 'Analista de RH', empresa: 'RH Solutions', local: 'São Paulo - SP', tipo: 'CLT', status: 'Fechada', descricao: 'Recrutamento e seleção, gestão de benefícios.' },
  ])

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const filtered = vagas.filter(v =>
    v.titulo.toLowerCase().includes(search.toLowerCase()) ||
    v.empresa.toLowerCase().includes(search.toLowerCase()) ||
    v.local.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <Search className="h-6 w-6 text-[#6B1A2A]" />
            Buscar Vagas
          </h1>
          <p className="text-sm text-[#708090]">Encontre as melhores oportunidades para você</p>
        </div>

        {/* Busca */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input
                type="text"
                placeholder="Buscar vagas por título, empresa ou local..."
                className="w-full pl-10 pr-4 py-3 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Lista de Vagas */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhuma vaga encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((vaga) => (
              <div key={vaga.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#2D343A]">{vaga.titulo}</h3>
                      {vaga.status === 'Aberta' ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Aberta</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">Fechada</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {vaga.empresa}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {vaga.local}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F8F4E6] rounded-full text-xs">
                        {vaga.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-[#708090] mt-2 line-clamp-2">{vaga.descricao}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <button
                      onClick={() => toggleFavorito(vaga.id)}
                      className={`p-2 rounded-lg transition ${favoritos.includes(vaga.id) ? 'text-red-500 hover:text-red-700' : 'text-[#708090] hover:text-red-500'}`}
                      title={favoritos.includes(vaga.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Heart className={`h-5 w-5 ${favoritos.includes(vaga.id) ? 'fill-red-500' : ''}`} />
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/candidato/vagas/${vaga.id}`)}
                        className="px-4 py-2 bg-[#F8F4E6] text-[#2D343A] rounded-lg hover:bg-[#E8EAE0] transition text-sm flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Ver
                      </button>
                      <button
                        disabled={vaga.status !== 'Aberta'}
                        className={`px-4 py-2 rounded-lg transition text-sm flex items-center gap-1 ${
                          vaga.status === 'Aberta' 
                            ? 'bg-[#6B1A2A] text-white hover:bg-[#4A0E1A]' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        title={vaga.status !== 'Aberta' ? 'Vaga fechada' : 'Candidatar-se'}
                      >
                        <Briefcase className="h-4 w-4" />
                        Candidatar-se
                      </button>
                    </div>
                  </div>
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
