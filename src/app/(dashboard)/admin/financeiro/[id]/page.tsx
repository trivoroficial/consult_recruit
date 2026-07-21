'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, CreditCard, Calendar, User, Building2,
  Edit, Trash2, TrendingUp, TrendingDown, CheckCircle,
  XCircle, Clock, FileText, DollarSign
} from 'lucide-react'

export default function VisualizarTransacao() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [transacao, setTransacao] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_transacoes')
    if (saved) {
      const transacoes = JSON.parse(saved)
      const found = transacoes.find((t: any) => t.id === parseInt(id))
      setTransacao(found || null)
    }
    setLoading(false)
  }, [id])

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      const saved = localStorage.getItem('zenthos_transacoes')
      if (saved) {
        const transacoes = JSON.parse(saved)
        const updated = transacoes.filter((t: any) => t.id !== parseInt(id))
        localStorage.setItem('zenthos_transacoes', JSON.stringify(updated))
        router.push('/admin/financeiro')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!transacao) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <CreditCard className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Transação não encontrada</h2>
          <p className="text-[#708090]">A transação que você está procurando não existe.</p>
          <button 
            onClick={() => router.push('/admin/financeiro')}
            className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2"
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
              className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2"
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
            
            {/* CARD PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold ${
                    transacao.tipo === 'receita' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {transacao.tipo === 'receita' ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#2D343A]">{transacao.descricao}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        transacao.tipo === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {transacao.tipo === 'receita' ? 'Receita' : 'Despesa'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        transacao.status === 'pago' ? 'bg-green-100 text-green-700' :
                        transacao.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                        transacao.status === 'atrasado' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {transacao.status || 'Pendente'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <DollarSign className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Valor</p>
                      <p className={`font-bold text-lg ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                        {transacao.tipo === 'receita' ? '+' : '-'} R$ {parseFloat(transacao.valor || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Data</p>
                      <p className="font-medium text-[#2D343A]">{transacao.data || new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Building2 className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cliente/Fornecedor</p>
                      <p className="font-medium text-[#2D343A]">{transacao.cliente || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <FileText className="h-5 w-5 text-[#8B0000]" />
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
                    <span className="text-[#708090]">Criado em: {new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Responsável: Admin</span>
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
                    <span className="text-sm text-[#708090]">
                      {transacao.status === 'pago' ? 'Pago' :
                       transacao.status === 'pendente' ? 'Pendente' :
                       transacao.status === 'atrasado' ? 'Atrasado' :
                       transacao.status || 'Pendente'}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0] space-y-2">
                  <button className="w-full px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Gerar Comprovante
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Marcar como Pago
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
