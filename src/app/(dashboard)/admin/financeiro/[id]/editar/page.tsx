'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { CreditCard, ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { buscarTransacaoPorId, atualizarTransacao } from '@/actions/financeiro'

export default function EditarTransacao() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    tipo: 'receita',
    categoria: '',
    descricao: '',
    cliente: '',
    valor: '',
    data: '',
    status: 'pendente',
    observacoes: ''
  })

  useEffect(() => {
    carregarTransacao()
  }, [id])

  const carregarTransacao = async () => {
    try {
      const result = await buscarTransacaoPorId(parseInt(id))
      if (result.success) {
        const data = result.data
        setForm({
          tipo: data.tipo || 'receita',
          categoria: data.categoria || '',
          descricao: data.descricao || '',
          cliente: data.cliente || '',
          valor: data.valor?.toString() || '',
          data: data.data ? data.data.split('T')[0] : '',
          status: data.status || 'pendente',
          observacoes: data.observacoes || ''
        })
      } else {
        setError(result.error || 'Erro ao carregar transação')
      }
    } catch (err) {
      setError('Erro ao carregar transação')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await atualizarTransacao(parseInt(id), {
        ...form,
        valor: parseFloat(form.valor) || 0
      })
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/financeiro')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao atualizar transação')
        setLoading(false)
      }
    } catch (err) {
      setError('Erro ao atualizar transação')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Transação atualizada com sucesso!</h2>
              <button
                onClick={() => router.push('/admin/financeiro')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Financeiro
              </button>
            </div>
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/financeiro')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-[#6B1A2A]" />
                Editar Transação
              </h1>
              <p className="text-sm text-[#708090]">Atualize os dados da transação</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Tipo <span className="text-[#6B1A2A]">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value})}
                >
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Categoria <span className="text-[#6B1A2A]">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.categoria}
                  onChange={(e) => setForm({...form, categoria: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Consultoria">Consultoria</option>
                  <option value="Recrutamento">Recrutamento</option>
                  <option value="Treinamento">Treinamento</option>
                  <option value="Segurança Alimentar">Segurança Alimentar</option>
                  <option value="Assinatura">Assinatura</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Valor (R$) <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.valor}
                  onChange={(e) => setForm({...form, valor: e.target.value})}
                  placeholder="1000.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Data <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.data}
                  onChange={(e) => setForm({...form, data: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Cliente</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.cliente}
                  onChange={(e) => setForm({...form, cliente: e.target.value})}
                  placeholder="Nome do cliente"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Descrição <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descrição da transação"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Observações</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.observacoes}
                  onChange={(e) => setForm({...form, observacoes: e.target.value})}
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/financeiro')}
                className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
