'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { Briefcase, MapPin, DollarSign, Building2, Eye, Edit, Trash2, Plus, Search } from 'lucide-react'
import { useState } from 'react'

const vagas = [
  { id: 1, titulo: 'Analista Administrativo', empresa: 'Empresa XPTO', local: 'Uberlândia - MG', salario: 'R$ 3.500', status: 'Aberta', candidatos: 12, data: '01/07/2026' },
  { id: 2, titulo: 'Auxiliar de RH', empresa: 'Indústria ABC', local: 'Uberlândia - MG', salario: 'R$ 2.800', status: 'Em análise', candidatos: 8, data: '03/07/2026' },
  { id: 3, titulo: 'Assistente Financeiro', empresa: 'Grupo Financeiro', local: 'Uberlândia - MG', salario: 'R$ 3.200', status: 'Aberta', candidatos: 5, data: '05/07/2026' },
]

export default function AdminVagas() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Vagas</span>
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vagas por título ou empresa..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Vaga</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Empresa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Candidatos</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vagas.map((vaga) => (
                <tr key={vaga.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{vaga.titulo}</p>
                      <p className="text-sm text-gray-500">{vaga.salario}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-sm"><Building2 className="h-4 w-4" /> {vaga.empresa}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                      vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {vaga.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{vaga.candidatos}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Visualizar">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Editar">
                        <Edit className="h-4 w-4 text-purple-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Excluir">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
