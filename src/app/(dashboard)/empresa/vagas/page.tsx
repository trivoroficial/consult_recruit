'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Eye, Edit, Trash2, ChevronRight } from 'lucide-react'

const vagas = [
  { id: 1, titulo: 'Desenvolvedor Full Stack', empresa: 'XPTO Tech', candidatos: 28, status: 'Ativa', data: '15/07/2026' },
  { id: 2, titulo: 'UX Designer Sênior', empresa: 'XPTO Tech', candidatos: 15, status: 'Em andamento', data: '14/07/2026' },
  { id: 3, titulo: 'Product Owner', empresa: 'XPTO Tech', candidatos: 9, status: 'Ativa', data: '12/07/2026' },
  { id: 4, titulo: 'Analista de Dados', empresa: 'XPTO Tech', candidatos: 22, status: 'Encerrada', data: '10/07/2026' },
  { id: 5, titulo: 'DevOps Engineer', empresa: 'XPTO Tech', candidatos: 18, status: 'Ativa', data: '08/07/2026' },
]

export default function EmpresaVagas() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = vagas.filter(v => 
    v.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vagas</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie todas as suas vagas</p>
          </div>
          <Link href="/empresa/vagas/nova">
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Vaga
            </button>
          </Link>
        </div>

        {/* ===== BUSCA ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar vagas..."
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
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vaga</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidatos</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((vaga) => (
                  <tr key={vaga.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{vaga.titulo}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{vaga.candidatos}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        vaga.status === 'Ativa' ? 'bg-green-100 text-green-700' :
                        vaga.status === 'Em andamento' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {vaga.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{vaga.data}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-[#8B0000] rounded-lg hover:bg-[#8B0000]/10 transition">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-sm">
                      Nenhuma vaga encontrada
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
