'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { Search, Building2, Mail, Phone, MapPin, MoreVertical, Eye, Edit, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

const empresas = [
  { id: 1, nome: 'Empresa XPTO', cnpj: '12.345.678/0001-99', email: 'contato@empresaxpto.com', telefone: '(34) 99117-7058', cidade: 'Uberlândia', status: 'Ativa', plano: 'Profissional' },
  { id: 2, nome: 'Indústria ABC', cnpj: '98.765.432/0001-11', email: 'contato@industriaabc.com', telefone: '(34) 88888-8888', cidade: 'Uberlândia', status: 'Ativa', plano: 'Enterprise' },
  { id: 3, nome: 'Grupo Financeiro', cnpj: '11.222.333/0001-44', email: 'contato@grupofinanceiro.com', telefone: '(34) 77777-7777', cidade: 'Uberlândia', status: 'Pendente', plano: 'Start' },
]

export default function AdminEmpresas() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Empresas</span>
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Empresa
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empresas por nome ou CNPJ..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {empresas.map((empresa) => (
            <div key={empresa.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl text-purple-600 flex-shrink-0">
                    🏢
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{empresa.nome}</h2>
                    <p className="text-sm text-gray-500">CNPJ: {empresa.cnpj}</p>
                    <div className="mt-1 space-y-1 text-sm text-gray-500">
                      <p className="flex items-center gap-1"><Mail className="h-4 w-4" /> {empresa.email}</p>
                      <p className="flex items-center gap-1"><Phone className="h-4 w-4" /> {empresa.telefone}</p>
                      <p className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {empresa.cidade}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    empresa.status === 'Ativa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {empresa.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    empresa.plano === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                    empresa.plano === 'Profissional' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {empresa.plano}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition">
                  <Eye className="h-4 w-4" /> Ver
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition">
                  <Edit className="h-4 w-4" /> Editar
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <Trash2 className="h-4 w-4" /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
