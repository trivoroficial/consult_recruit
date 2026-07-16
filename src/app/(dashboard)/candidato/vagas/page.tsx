'use client'

import { useState } from 'react'
import { Search, MapPin, DollarSign, Building2, Filter, Briefcase } from 'lucide-react'

const vagas = [
  { id: 1, titulo: 'Desenvolvedor Full Stack', empresa: 'XPTO Tech', local: 'Remoto', salario: 'R$ 8.000 - R$ 12.000', tipo: 'CLT', descricao: 'Desenvolvimento de aplicações web com React e Node.js' },
  { id: 2, titulo: 'UX Designer Sênior', empresa: 'XPTO Tech', local: 'Híbrido', salario: 'R$ 7.000 - R$ 10.000', tipo: 'PJ', descricao: 'Design de interfaces e experiência do usuário' },
  { id: 3, titulo: 'Product Owner', empresa: 'XPTO Tech', local: 'Presencial', salario: 'R$ 9.000 - R$ 14.000', tipo: 'CLT', descricao: 'Gestão de backlog e definição de roadmap' },
  { id: 4, titulo: 'Analista de Dados', empresa: 'XPTO Tech', local: 'Remoto', salario: 'R$ 6.000 - R$ 9.000', tipo: 'CLT', descricao: 'Análise de dados e criação de dashboards' }
]

export default function CandidatoVagas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')

  const filtered = vagas.filter(v => 
    v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filtroTipo === '' || v.tipo === filtroTipo)
  )

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Vagas Disponíveis</h1>
          <p className="text-sm text-gray-500 mt-1">Encontre a oportunidade perfeita para você</p>
        </div>

        {/* ===== FILTROS ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar vagas..."
                className="w-full px-4 py-2.5 pl-10 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition bg-white"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
              </select>
              <button className="px-4 py-2.5 text-sm font-medium text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== LISTA DE VAGAS ===== */}
        <div className="space-y-4">
          {filtered.map((vaga) => (
            <div key={vaga.id} className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-lg hover:border-[#8B0000]/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{vaga.titulo}</h3>
                      <p className="text-sm text-gray-600">{vaga.empresa}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" /> {vaga.local}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium text-[#8B0000]">
                          <DollarSign className="h-4 w-4" /> {vaga.salario}
                        </span>
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {vaga.tipo}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{vaga.descricao}</p>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 whitespace-nowrap">
                  Candidatar-se
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p>Nenhuma vaga encontrada</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
