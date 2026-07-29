'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  CreditCard, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  TrendingUp, TrendingDown, CircleDollarSign, Calendar,
  Filter, FileText, Download, CheckCircle, XCircle, Clock,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { listarTransacoes, excluirTransacao, getDashboardFinanceiro } from '@/actions/financeiro'

export default function AdminFinanceiro() {
  const router = useRouter()
  const [transacoes, setTransacoes] = useState<any[]>([])
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const [transacoesResult, dashboardResult] = await Promise.all([
        listarTransacoes(),
        getDashboardFinanceiro()
      ])

      if (transacoesResult.success) {
        setTransacoes(transacoesResult.data || [])
      } else {
        setError(transacoesResult.error || 'Erro ao carregar transações')
      }

      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data)
      }
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return

    try {
      const result = await excluirTransacao(id)
      if (result.success) {
        await carregarDados()
      } else {
        alert(result.error || 'Erro ao excluir transação')
      }
    } catch (error) {
      alert('Erro ao excluir transação')
    }
  }

  const getTipoConfig = (tipo: string) => {
    if (tipo === 'receita') {
      return { label: 'Receita', color: 'text-green-600', bg: 'bg-green-50', icon: TrendingUp }
    }
    return { label: 'Despesa', color: 'text-red-600', bg: 'bg-red-50', icon: TrendingDown }
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      'pago': { label: 'Pago', color: 'bg-green-100 text-green-700' },
      'pendente': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
      'atrasado': { label: 'Atrasado', color: 'bg-red-100 text-red-700' },
      'cancelado': { label: 'Cancelado', color: 'bg-gray-100 text-gray-700' }
    }
    return configs[status] || configs['pendente']
  }

  const filtered = transacoes.filter(t =>
    t.descricao?.toLowerCase().includes(search.toLowerCase()) ||
    t.cliente?.toLowerCase().includes(search.toLowerCase()) ||
    t.categoria?.toLowerCase().includes(search.toLowerCase())
  ).filter(t => filtroTipo ? t.tipo === filtroTipo : true)
   .filter(t => filtroStatus ? t.status === filtroStatus : true)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <CreditCard className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando dados financeiros...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-[#6B1A2A]" />
              Financeiro
            </h1>
            <p className="text-sm text-[#708090]">{transacoes.length} transações registradas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/financeiro/nova-transacao')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Transação
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* DASHBOARD FINANCEIRO */}
          {dashboardData && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
                <p className="text-2xl font-bold text-[#2D343A]">{dashboardData.totalTransacoes}</p>
                <p className="text-xs text-[#708090]">Total</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(dashboardData.totalReceitas || 0)}</p>
                <p className="text-xs text-[#708090]">Receitas</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
                <p className="text-2xl font-bold text-red-600">{formatCurrency(dashboardData.totalDespesas || 0)}</p>
                <p className="text-xs text-[#708090]">Despesas</p>
              </div>
              <div className={`bg-white p-4 rounded-xl shadow-sm border ${(dashboardData.saldo || 0) >= 0 ? 'border-green-200' : 'border-red-200'} text-center`}>
                <p className={`text-2xl font-bold ${(dashboardData.saldo || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(dashboardData.saldo || 0)}
                </p>
                <p className="text-xs text-[#708090]">Saldo</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
                <p className="text-2xl font-bold text-yellow-600">{dashboardData.pendentes || 0}</p>
                <p className="text-xs text-[#708090]">Pendentes</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar transações..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos os tipos</option>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="atrasado">Atrasado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {transacoes.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma transação registrada.</p>
                <button 
                  onClick={() => router.push('/admin/financeiro/nova-transacao')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Registrar primeira transação
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Descrição</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Data</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const tipoConfig = getTipoConfig(item.tipo)
                      const TipoIcon = tipoConfig.icon
                      const statusConfig = getStatusConfig(item.status)
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.descricao}</td>
                          <td className="py-3 px-4">
                            <span className={`flex items-center gap-1 text-xs font-medium ${tipoConfig.color}`}>
                              <TipoIcon className="h-3 w-3" />
                              {tipoConfig.label}
                            </span>
                          </td>
                          <td className={`py-3 px-4 font-medium ${item.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(item.valor)}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#708090]">{item.data || '-'}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => router.push(`/admin/financeiro/${item.id}`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                              >
                                <Eye className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => router.push(`/admin/financeiro/${item.id}/editar`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar"
                              >
                                <Edit className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-1 hover:bg-[#F8F4E6] rounded" title="Excluir"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
