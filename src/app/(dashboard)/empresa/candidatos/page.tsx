'use client'

import { useState } from 'react'
import { Search, Eye, Download, UserPlus, ChevronRight } from 'lucide-react'

const candidatos = [
  { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor Full Stack', vaga: 'Dev Full Stack', status: 'Em análise', data: '15/07/2026' },
  { id: 2, nome: 'Maria Santos', cargo: 'UX Designer', vaga: 'UX Designer Sênior', status: 'Entrevista', data: '14/07/2026' },
  { id: 3, nome: 'Pedro Costa', cargo: 'Product Owner', vaga: 'Product Owner', status: 'Aprovado', data: '12/07/2026' },
  { id: 4, nome: 'Ana Oliveira', cargo: 'Analista de Dados', vaga: 'Analista de Dados', status: 'Em análise', data: '10/07/2026' },
]

export default function EmpresaCandidatos() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = candidatos.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidatos</h1>
            <p className="text-sm text-gray-500 mt-1">Acompanhe todos os candidatos</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 text-sm font-semibold text-[#8B0000] border border-[#8B0000]/30 rounded-xl hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Adicionar
            </button>
          </div>
        </div>

        {/* ===== BUSCA ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar candidatos..."
              className="w-full px-4 py-2.5 pl-10 text-sm border border-gray-200 rounded-xl focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/20 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ===== TABELA ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidato</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Cargo</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vaga</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((candidato) => (
                  <tr key={candidato.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{candidato.nome}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{candidato.cargo}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{candidato.vaga}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        candidato.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                        candidato.status === 'Entrevista' ? 'bg-blue-100 text-blue-700' :
                        candidato.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {candidato.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{candidato.data}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-1.5 text-gray-400 hover:text-[#8B0000] rounded-lg hover:bg-[#8B0000]/10 transition">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400 text-sm">
                      Nenhum candidato encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
