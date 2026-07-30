'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, CreditCard, DollarSign, Calendar,
  User, Tag, Edit, Trash2, CheckCircle,
  XCircle, AlertCircle, FileText, Receipt
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#6B1A2A] text-xl">Carregando...</div>
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
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            {/* Status e Tipo */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                transacao.tipo === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                transacao.status === 'pago' ? 'bg-green-100 text-green-700' :
                transacao.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {transacao.status || 'Pendente'}
              </span>
              <span className="text-sm text-[#708090]">
                {new Date(transacao.data || Date.now()).toLocaleDateString('pt-BR')}
              </span>
            </div>

            {/* Valor em Destaque */}
            <div className="mb-6 p-6 bg-[#F8F4E6] rounded-xl text-center">
              <p className="text-sm text-[#708090]">Valor</p>
              <p className={`text-4xl font-bold ${
                transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transacao.tipo === 'receita' ? '+' : '-'}
                R$ {transacao.valor?.toFixed(2).replace('.', ',') || '0,00'}
              </p>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Tag className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Categoria</p>
                  <p className="font-medium text-[#2D343A]">{transacao.categoria || 'Não informada'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <User className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Cliente</p>
                  <p className="font-medium text-[#2D343A]">{transacao.cliente || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <FileText className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Descrição</p>
                  <p className="font-medium text-[#2D343A]">{transacao.descricao || 'Sem descrição'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Data de Criação</p>
                  <p className="font-medium text-[#2D343A]">
                    {new Date(transacao.created_at || Date.now()).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Observações */}
            {transacao.observacoes && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#6B1A2A]" />
                  Observações
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {transacao.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
