'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  DollarSign, Search, Eye, TrendingUp, TrendingDown, 
  Calendar, CreditCard, Filter, ArrowUpDown, 
  Download, PieChart 
} from 'lucide-react'

export default function EmpresaFinanceiro() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')
  
  const transacoes = [
    { id: 1, descricao: 'Assinatura Plano Premium - ZENTHOS', valor: 299.90, tipo: 'despesa', data: '10/07/2026', status: 'Pago', categoria: 'Assinatura' },
    { id: 2, descricao: 'Venda de Serviço - Consultoria RH', valor: 1500.00, tipo: 'receita', data: '08/07/2026', status: 'Recebido', categoria: 'Consultoria' },
    { id: 3, descricao: 'Venda de Serviço - Recrutamento', valor: 850.00, tipo: 'receita', data: '05/07/2026', status: 'Recebido', categoria: 'Recrutamento' },
    { id: 4, descricao: 'Manutenção de Sistema', valor: 120.00, tipo: 'despesa', data: '03/07/2026', status: 'Pendente', categoria: 'Manutenção' },
    { id: 5, descricao: 'Venda de Serviço - Treinamento', valor: 2000.00, tipo: 'receita', data: '01/07/2026', status: 'Recebido', categoria: 'Treinamento' },
  ]

  const filtered = transacoes.filter(t => {
    const matchSearch = t.descricao.toLowerCase().includes(search.toLowerCase()) ||
                        t.categoria.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todos' || t.tipo === filter
    return matchSearch && matchFilter
  })

  const totalReceitas = transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0)
  const totalDespesas = transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0)
  const saldo = totalReceitas - totalDespesas

  const statusCount = {
    total: transacoes.length,
    receitas: transacoes.filter(t => t.tipo === 'receita').length,
    despesas: transacoes.filter(t => t.tipo === 'despesa').length,
    pendentes: transacoes.filter(t => t.status === 'Pendente').length,
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-[#6B1A2A]" />
                Financeiro
              </h1>
              <p className="text-sm text-[#708090]">{statusCount.total} transações</p>
            </div>
            <button className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2 text-sm">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Saldo Total</p>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldo.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Total Receitas</p>
            <p className="text-2xl font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Total Despesas</p>
            <p className="text-2xl font-bold text-red-600">R$ {totalDespesas.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4">
            <p className="text-sm text-[#708090]">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600">{statusCount.pendentes}</p>
          </div>
        </div>

        {/* Filtros e Busca */}
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
                onClick={() => setFilter('receita')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'receita' ? 'bg-green-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Receitas ({statusCount.receitas})
              </button>
              <button 
                onClick={() => setFilter('despesa')}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  filter === 'despesa' ? 'bg-red-600 text-white' : 'bg-[#F8F4E6] text-[#708090] hover:bg-[#E8EAE0]'
                }`}
              >
                Despesas ({statusCount.despesas})
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
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-[#2D343A]">{item.descricao}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.tipo === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.tipo === 'receita' ? '💰 Receita' : '💳 Despesa'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        item.status === 'Pago' || item.status === 'Recebido' ? 'bg-green-100 text-green-700' :
                        item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#708090]">
                      <span>{item.categoria}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.data}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.tipo === 'receita' ? '+' : '-'} R$ {item.valor.toFixed(2)}
                    </p>
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
