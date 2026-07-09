'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { Search, User, Mail, Calendar, MoreVertical, Shield, UserCheck, UserX, Plus } from 'lucide-react'
import { useState } from 'react'

const usuarios = [
  { id: 1, nome: 'João Silva', email: 'joao@email.com', tipo: 'Candidato', status: 'Ativo', data: '01/07/2026' },
  { id: 2, nome: 'Empresa XPTO', email: 'contato@empresaxpto.com', tipo: 'Empresa', status: 'Ativo', data: '02/07/2026' },
  { id: 3, nome: 'Maria Santos', email: 'maria@email.com', tipo: 'Candidato', status: 'Pendente', data: '05/07/2026' },
  { id: 4, nome: 'Indústria ABC', email: 'contato@industriaabc.com', tipo: 'Empresa', status: 'Ativo', data: '06/07/2026' },
  { id: 5, nome: 'Pedro Costa', email: 'pedro@email.com', tipo: 'Candidato', status: 'Bloqueado', data: '07/07/2026' },
]

export default function AdminUsuarios() {
  const [busca, setBusca] = useState('')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Usuários</span>
          </h1>
          <button className="btn-primary btn-sm flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar usuários por nome ou email..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Usuário</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Data</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{usuario.nome}</p>
                      <p className="text-sm text-gray-500">{usuario.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      usuario.tipo === 'Candidato' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {usuario.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      usuario.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                      usuario.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {usuario.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{usuario.data}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Ativar">
                        <UserCheck className="h-4 w-4 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Bloquear">
                        <UserX className="h-4 w-4 text-red-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition" title="Mais">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>Mostrando {usuarios.length} usuários</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 transition">Anterior</button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50 transition">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  )
}
