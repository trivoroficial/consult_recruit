'use client'

import { useState } from 'react'
import { Search, Building2, Mail, Phone, MapPin, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'

const empresas = [
  {
    id: 1,
    nome: 'Empresa XYZ',
    cnpj: '12.345.678/0001-99',
    email: 'contato@xyz.com',
    telefone: '(34) 99999-9999',
    cidade: 'Uberlândia',
    status: 'Ativa',
    planos: 'Profissional'
  },
  {
    id: 2,
    nome: 'Indústria ABC',
    cnpj: '98.765.432/0001-11',
    email: 'contato@abc.com',
    telefone: '(34) 88888-8888',
    cidade: 'Uberlândia',
    status: 'Ativa',
    planos: 'Enterprise'
  }
]

export default function AdminEmpresas() {
  const [busca, setBusca] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Empresas</span>
          </h1>
          <button className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            <Building2 className="h-5 w-5" />
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
                    empresa.status === 'Ativa' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {empresa.status}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {empresa.planos}
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
