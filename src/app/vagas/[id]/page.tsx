'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Briefcase, Building2, MapPin, Search, Filter, 
  Clock, Star, X, ChevronDown
} from 'lucide-react'

export default function VagasPage() {
  const [vagas, setVagas] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const allVagas = JSON.parse(saved)
      setVagas(allVagas)
      setFiltered(allVagas)
    } else {
      const exemplo = [
        { id: 1, titulo: 'Analista Administrativo', empresa: 'Empresa XPTO', local: 'Uberlândia/MG', tipo: 'CLT', status: 'Aberta' },
        { id: 2, titulo: 'Auxiliar de RH', empresa: 'Indústria ABC', local: 'Uberlândia/MG', tipo: 'CLT', status: 'Aberta' },
        { id: 3, titulo: 'Assistente Financeiro', empresa: 'Grupo Financeiro', local: 'Uberlândia/MG', tipo: 'PJ', status: 'Em análise' },
      ]
      setVagas(exemplo)
      setFiltered(exemplo)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    let result = vagas

    if (search) {
      result = result.filter(v => 
        v.titulo.toLowerCase().includes(search.toLowerCase()) ||
        v.empresa.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filtroTipo) {
      result = result.filter(v => v.tipo === filtroTipo)
    }

    if (filtroStatus) {
      result = result.filter(v => v.status === filtroStatus)
    }

    setFiltered(result)
  }, [search, filtroTipo, filtroStatus, vagas])

  const limparFiltros = () => {
    setSearch('')
    setFiltroTipo('')
    setFiltroStatus('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex items-center justify-center">
        <div className="text-[#8B0000] text-xl">Carregando vagas...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      {/* HEADER DA PÁGINA */}
      <div className="bg-white border-b border-[#E8EAE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#2D343A]">Vagas Disponíveis</h1>
          <p className="text-[#708090] mt-1">
            Encontre a oportunidade perfeita para sua carreira
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* BARRA DE BUSCA */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input
                type="text"
                placeholder="Buscar por título ou empresa..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition bg-white text-[#2D343A]"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Estágio">Estágio</option>
                <option value="Temporário">Temporário</option>
              </select>

              <select
                className="px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition bg-white text-[#2D343A]"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="Aberta">Aberta</option>
                <option value="Em análise">Em análise</option>
                <option value="Pausada">Pausada</option>
                <option value="Fechada">Fechada</option>
              </select>

              {(search || filtroTipo || filtroStatus) && (
                <button
                  onClick={limparFiltros}
                  className="px-4 py-2.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090] flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CONTADOR */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#708090]">
            {filtered.length} {filtered.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
          </p>
        </div>

        {/* LISTA DE VAGAS */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2D343A]">Nenhuma vaga encontrada</h3>
            <p className="text-[#708090] mt-1">Tente ajustar seus filtros ou volte mais tarde.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((vaga) => (
              <Link
                key={vaga.id}
                href={`/vagas/${vaga.id}`}
                className="bg-white border border-[#E8EAE0] rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group block"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000] font-bold flex-shrink-0">
                    {vaga.titulo.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#2D343A] group-hover:text-[#8B0000] transition truncate">
                      {vaga.titulo}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#708090] mt-1">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{vaga.confidencial ? 'Confidencial' : vaga.empresa}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#708090] mt-1">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{vaga.local || 'Não informado'}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-xs bg-[#F8F4E6] px-2 py-1 rounded-full text-[#708090]">
                        {vaga.tipo || 'CLT'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                        vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                        vaga.status === 'Pausada' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {vaga.status || 'Aberta'}
                      </span>
                      {vaga.badge && (
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${vaga.corBadge || 'bg-purple-500'}`}>
                          {vaga.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
