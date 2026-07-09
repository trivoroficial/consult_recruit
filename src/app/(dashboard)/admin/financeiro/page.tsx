'use client'

import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Plus } from 'lucide-react'

const transacoes = [
  { id: 1, tipo: 'Receita', descricao: 'Recrutamento - Empresa XPTO', valor: 3500, data: '01/07/2026', status: 'Confirmado' },
  { id: 2, tipo: 'Receita', descricao: 'Consultoria - Indústria ABC', valor: 2800, data: '01/07/2026', status: 'Confirmado' },
  { id: 3, tipo: 'Despesa', descricao: 'Marketing - Google Ads', valor: 500, data: '05/07/2026', status: 'Pendente' },
  { id: 4, tipo: 'Receita', descricao: 'Recrutamento - Grupo Financeiro', valor: 2800, data: '10/07/2026', status: 'Pendente' },
]

export default function AdminFinanceiro() {
  const totalReceitas = transacoes.filter(t => t.tipo === 'Receita' && t.status === 'Confirmado').reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'Despesa' && t.status === 'Confirmado').reduce((acc, t) => acc + t.valor, 0)
  const saldo = totalReceitas - totalDespesas

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Financeiro</span>
          </h1>
          <div className="flex gap-2">
            <button className="btn-outline btn-sm flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="btn-primary btn-sm flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">R$ {totalReceitas.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Receitas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">R$ {totalDespesas.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Total Despesas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">R$ {saldo.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Saldo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Últimas Transações</h2>
          <div className="space-y-3">
            {transacoes.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.tipo === 'Receita' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {item.tipo === 'Receita' ? (
                      <TrendingUp className={`h-4 w-4 text-green-600`} />
                    ) : (
                      <TrendingDown className={`h-4 w-4 text-red-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.descricao}</p>
                    <p className="text-sm text-gray-500">{item.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                  <span className={`font-semibold ${
                    item.tipo === 'Receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.tipo === 'Receita' ? '+' : '-'} R$ {item.valor.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
