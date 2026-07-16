'use client'

import { useState } from 'react'
import { Search, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const candidaturas = [
  { id: 1, vaga: 'Desenvolvedor Full Stack', empresa: 'XPTO Tech', status: 'Em andamento', data: '15/07/2026', etapa: 'Entrevista agendada' },
  { id: 2, vaga: 'UX Designer Sênior', empresa: 'XPTO Tech', status: 'Aprovado', data: '14/07/2026', etapa: 'Oferta enviada' },
  { id: 3, vaga: 'Product Owner', empresa: 'XPTO Tech', status: 'Em análise', data: '12/07/2026', etapa: 'Currículo em análise' },
  { id: 4, vaga: 'Analista de Dados', empresa: 'XPTO Tech', status: 'Reprovado', data: '10/07/2026', etapa: 'Não passou na triagem' }
]

export default function CandidatoCandidaturas() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = candidaturas.filter(c => 
    c.vaga.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'Em andamento': return { color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="h-4 w-4" /> }
      case 'Aprovado': return { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="h-4 w-4" /> }
      case 'Reprovado': return { color: 'bg-red-100 text-red-700', icon: <XCircle className="h-4 w-4" /> }
      default: return { color: 'bg-gray-100 text-gray-600', icon: <AlertCircle className="h-4 w-4" /> }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Minhas Candidaturas</h1>
            <p className="text-sm text-gray-500 mt-1">Acompanhe todas as suas inscrições</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Total: <strong className="text-[#8B0000]">{candidaturas.length}</strong></span>
          </div>
        </div>

        {/* ===== BUSCA ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar candidaturas..."
              className="w-full px-4 py-2.5 pl-10 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ===== LISTA ===== */}
        <div className="space-y-4">
          {filtered.map((candidatura) => {
            const statusConfig = getStatusConfig(candidatura.status)
            return (
              <div key={candidatura.id} className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{candidatura.vaga}</h3>
                    <p className="text-sm text-gray-600">{candidatura.empresa}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusConfig.color}`}>
                        {statusConfig.icon} {candidatura.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Etapa: {candidatura.etapa}
                      </span>
                      <span className="text-sm text-gray-400">
                        {candidatura.data}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-[#8B0000] border border-[#8B0000]/30 rounded-lg hover:bg-[#8B0000] hover:text-white transition-all">
                    <Eye className="h-4 w-4 inline mr-1" />
                    Detalhes
                  </button>
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>Nenhuma candidatura encontrada</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
