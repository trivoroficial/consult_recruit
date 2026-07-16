'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Eye, Edit, Trash2, Ban, CheckCircle, Mail } from 'lucide-react'

const empresas = [
  { id: 1, nome: 'XPTO Tecnologia', cnpj: '12.345.678/0001-99', cidade: 'Uberlândia', status: 'Ativa', planos: 'Premium', data: '15/07/2026' },
  { id: 2, nome: 'Indústria ABC', cnpj: '98.765.432/0001-11', cidade: 'Uberlândia', status: 'Ativa', planos: 'Enterprise', data: '14/07/2026' },
  { id: 3, nome: 'Financeira ABC', cnpj: '11.222.333/0001-44', cidade: 'Uberlândia', status: 'Bloqueada', planos: 'Básico', data: '12/07/2026' },
  { id: 4, nome: 'Tech Solutions', cnpj: '44.555.666/0001-77', cidade: 'Uberlândia', status: 'Pendente', planos: 'Premium', data: '10/07/2026' },
  { id: 5, nome: 'Grupo XPTO', cnpj: '77.888.999/0001-00', cidade: 'Uberlândia', status: 'Ativa', planos: 'Enterprise', data: '08/07/2026' }
]

export default function AdminEmpresas() {
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = empresas.filter(e => 
    e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.cnpj.includes(searchTerm)
  )

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativa': return 'bg-green-100 text-green-700'
      case 'Bloqueada': return 'bg-red-100 text-red-700'
      case 'Pendente': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie todas as empresas da plataforma</p>
          </div>
          <Link href="/admin/empresas/nova">
            <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#8B0000] rounded-xl hover:bg-[#700000] transition shadow-md shadow-[#8B0000]/20 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Empresa
            </button>
          </Link>
        </div>

        {/* ===== BUSCA ===== */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empresas..."
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
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">CNPJ</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Cidade</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plano</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((empresa) => (
                  <tr key={empresa.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{empresa.nome}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{empresa.cnpj}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{empresa.cidade}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(empresa.status)}`}>
                        {empresa.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{empresa.planos}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{empresa.data}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-[#8B0000] rounded-lg hover:bg-[#8B0000]/10 transition" title="Editar">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition" title="Ativar/Desativar">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition" title="Bloquear">
                          <Ban className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition" title="Enviar convite">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition" title="Excluir">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400 text-sm">
                      Nenhuma empresa encontrada
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
