'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, CreditCard, Calendar, User, Building2,
  Edit, Trash2, TrendingUp, TrendingDown, CheckCircle,
  XCircle, Clock, FileText, DollarSign, Download,
  Printer, Share2, AlertCircle
} from 'lucide-react'
import { buscarTransacaoPorId, excluirTransacao } from '@/actions/financeiro'

export default function VisualizarTransacao() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [transacao, setTransacao] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarTransacao()
  }, [id])

  const carregarTransacao = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarTransacaoPorId(parseInt(id))
      if (result.success) {
        setTransacao(result.data)
      } else {
        setError(result.error || 'Transação não encontrada')
      }
    } catch (err) {
      setError('Erro ao carregar transação')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return

    try {
      const result = await excluirTransacao(parseInt(id))
      if (result.success) {
        router.push('/admin/financeiro')
      } else {
        alert(result.error || 'Erro ao excluir transação')
      }
    } catch (error) {
      alert('Erro ao excluir transação')
    }
  }

  const getTipoConfig = (tipo: string) => {
    if (tipo === 'receita') {
      return { 
        label: 'Receita', 
        color: 'text-green-600', 
        bg: 'bg-green-50', 
        border: 'border-green-200',
        icon: TrendingUp 
      }
    }
    return { 
      label: 'Despesa', 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      icon: TrendingDown 
    }
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'pago': { label: 'Pago', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'pendente': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      'atrasado': { label: 'Atrasado', color: 'bg-red-100 text-red-700', icon: AlertCircle },
      'cancelado': { label: 'Cancelado', color: 'bg-gray-100 text-gray-700', icon: XCircle }
    }
    return configs[status] || configs['pendente']
  }

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
            <p className="text-[#708090]">Carregando transação...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!transacao || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <CreditCard className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Transação não encontrada</h2>
          <p className="text-[#708090]">{error || 'A transação que você está procurando não existe.'}</p>
          <button 
            onClick={() => router.push('/admin/financeiro')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Financeiro
          </button>
        </div>
      </div>
    )
  }

  const tipoConfig = getTipoConfig(transacao.tipo)
  const TipoIcon = tipoConfig.icon
  const statusConfig = getStatusConfig(transacao.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/financeiro')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Transação #{transacao.id}</h1>
              <p className="text-sm text-[#708090]">Detalhes da transação</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/financeiro/${id}/editar`)}
              className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUNA PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className={`bg-white rounded-2xl shadow-sm border ${tipoConfig.border} p-6`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold ${tipoConfig.bg} ${tipoConfig.color}`}>
                    <TipoIcon className="h-10 w-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#2D343A]">{transacao.descricao}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tipoConfig.bg} ${tipoConfig.color}`}>
                        {tipoConfig.label}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <DollarSign className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Valor</p>
                      <p className={`font-bold text-lg ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                        {transacao.tipo === 'receita' ? '+' : '-'} {formatCurrency(transacao.valor)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Data</p>
                      <p className="font-medium text-[#2D343A]">{transacao.data || new Date(transacao.created_at || Date.now()).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <User className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cliente/Fornecedor</p>
                      <p className="font-medium text-[#2D343A]">{transacao.cliente || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <FileText className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Categoria</p>
                      <p className="font-medium text-[#2D343A]">{transacao.categoria || 'Não informado'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Observações</h3>
                  <p className="text-[#708090] text-sm">
                    {transacao.observacoes || 'Nenhuma observação cadastrada.'}
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Resumo</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CreditCard className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">ID: #{transacao.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Criado em: {new Date(transacao.created_at || Date.now()).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Responsável: Administrador</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Status</h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      transacao.status === 'pago' ? 'bg-green-500' :
                      transacao.status === 'pendente' ? 'bg-yellow-500' :
                      transacao.status === 'atrasado' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-sm text-[#708090]">{statusConfig.label}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0] space-y-2">
                  <button className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Gerar Comprovante
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
