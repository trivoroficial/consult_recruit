'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  DollarSign, Search, TrendingUp, TrendingDown, 
  Calendar, CreditCard, Filter, CheckCircle, 
  XCircle, AlertCircle, Clock, ArrowRight
} from 'lucide-react'

export default function EmpresaFinanceiro() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')

  const transacoes = [
    { id: 1, descricao: 'Assinatura Plano Premium - ZENTHOS', valor: 299.90, tipo: 'despesa', data_vencimento: '15/07/2026', status: 'Pendente', categoria: 'Assinatura' },
    { id: 2, descricao: 'Consultoria RH - Projeto XPTO', valor: 1500.00, tipo: 'receita', data_vencimento: '20/07/2026', status: 'Pendente', categoria: 'Consultoria' },
    { id: 3, descricao: 'Recrutamento - Analista Administrativo', valor: 850.00, tipo: 'receita', data_vencimento: '10/07/2026', status: 'Pago', categoria: 'Recrutamento' },
    { id: 4, descricao: 'Treinamento - Equipe Técnica', valor: 2000.00, tipo: 'receita', data_vencimento: '05/07/2026', status: 'Pago', categoria: 'Treinamento' },
  ]

  const filtered = transacoes.filter(t => {
    const matchSearch = t.descricao.toLowerCase().includes(search.toLowerCase()) ||
                        t.categoria.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todos' || t.status === filter
    return matchSearch && matchFilter
  })

  const totalReceitas = transacoes.filter(t => t.tipo === 'receita' && t.status === 'Pago').reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'despesa' && t.status === 'Pago').reduce((acc, t) => acc + t.valor, 0)
  const totalPendentes = transacoes.filter(t => t.status === 'Pendente').reduce((acc, t) => acc + t.valor, 0)
  const saldo = totalReceitas - totalDespesas

  const statusCount = {
    total: transacoes.length,
    pago: transacoes.filter(t => t.status === 'Pago').length,
    pendente: transacoes.filter(t => t.status === 'Pendente').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-[#6B1A2A]" />
            Financeiro
          </h1>
          <p className="text-sm text-[#708090]">Acompanhe seus pagamentos e pendências</p>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Saldo</p>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldo.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Total Recebido</p>
            <p className="text-2xl font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Total Pago</p>
            <p className="text-2xl font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 bg-yellow-50 border-yellow-200">
            <p className="text-sm text-[#708090]">Pendências</p>
            <p className="text-2xl font-bold text-yellow-600">R$ {totalPendentes.toFixed(2)}</p>
            <p className="text-xs text-yellow-600">{statusCount.pendente} transações pendentes</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#708090]" />
              <input
                type="text"
                placeholder="Buscar por descrição ou categoria..."
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={() => setFilter('Todos')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Todos' ? 'bg-[#6B1A2A] text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Todos ({statusCount.total})
              </button>
              <button 
                onClick={() => setFilter('Pago')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Pago' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Pago ({statusCount.pago})
              </button>
              <button 
                onClick={() => setFilter('Pendente')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'Pendente' ? 'bg-yellow-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Pendente ({statusCount.pendente})
              </button>
            </div>
          </div>
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <DollarSign className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Nenhuma transação encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className={`bg-white rounded-2xl shadow-sm border p-4 hover:shadow-md transition ${
                item.status === 'Pendente' ? 'border-yellow-300 border-l-4 border-l-yellow-500' : 'border-[#E8EAE0]'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[#2D343A]">{item.descricao}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.tipo === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.tipo === 'receita' ? '💰 Receita' : '💳 Despesa'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${
                        item.status === 'Pago' ? 'bg-green-100 text-green-700' :
                        item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status === 'Pago' ? <CheckCircle className="h-3 w-3" /> :
                         item.status === 'Pendente' ? <AlertCircle className="h-3 w-3" /> :
                         <XCircle className="h-3 w-3" />}
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                      <span>{item.categoria}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Vence: {item.data_vencimento}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </p>
                    {item.status === 'Pendente' && (
                      <button className="mt-1 text-xs text-[#6B1A2A] hover:underline">
                        Marcar como pago
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
