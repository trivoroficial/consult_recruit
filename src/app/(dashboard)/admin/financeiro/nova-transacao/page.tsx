'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  CreditCard, ArrowLeft, Save, CheckCircle, XCircle,
  Calculator 
} from 'lucide-react'
import { criarTransacao } from '@/actions/financeiro'

export default function NovaTransacao() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    tipo: 'receita',
    categoria: '',
    categoria_detalhada: '',
    descricao: '',
    cliente: '',
    valor: '',
    data: new Date().toISOString().split('T')[0],
    status: 'pendente',
    observacoes: '',
    valor_entrada: '',
    parcelas_total: '1',
    parcelas_pagas: '0',
    valor_parcela: '',
    data_proxima_parcela: '',
    data_ultima_parcela: ''
  })

  // Calcular valor da parcela automaticamente
  const calcularParcela = () => {
    const valorTotal = parseFloat(form.valor) || 0
    const entrada = parseFloat(form.valor_entrada) || 0
    const parcelas = parseInt(form.parcelas_total) || 1
    const restante = valorTotal - entrada

    if (parcelas > 0 && restante > 0) {
      const valorParcela = restante / parcelas
      setForm(prev => ({
        ...prev,
        valor_parcela: valorParcela.toFixed(2)
      }))
    } else {
      setForm(prev => ({
        ...prev,
        valor_parcela: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validações
      if (!form.descricao.trim()) {
        setError('A descrição é obrigatória')
        setLoading(false)
        return
      }

      if (!form.valor || parseFloat(form.valor) <= 0) {
        setError('O valor é obrigatório e deve ser maior que zero')
        setLoading(false)
        return
      }

      if (!form.categoria) {
        setError('A categoria é obrigatória')
        setLoading(false)
        return
      }

      const dados = {
        tipo: form.tipo,
        categoria: form.categoria,
        categoria_detalhada: form.categoria_detalhada || null,
        descricao: form.descricao,
        cliente: form.cliente || null,
        valor: parseFloat(form.valor),
        data: form.data,
        status: form.status,
        observacoes: form.observacoes || null,
        valor_entrada: form.valor_entrada ? parseFloat(form.valor_entrada) : null,
        parcelas_total: parseInt(form.parcelas_total) || 1,
        parcelas_pagas: parseInt(form.parcelas_pagas) || 0,
        valor_parcela: form.valor_parcela ? parseFloat(form.valor_parcela) : null,
        data_proxima_parcela: form.data_proxima_parcela || null,
        data_ultima_parcela: form.data_ultima_parcela || null
      }

      console.log('📤 Chamando criarTransacao com:', dados)

      const result = await criarTransacao(dados)
      
      console.log('📤 Resultado COMPLETO:', JSON.stringify(result, null, 2))

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/financeiro')
        }, 2000)
      } else {
        // Mostrar o erro completo
        console.error('❌ Erro retornado pela Action:', result.error)
        setError(result.error || 'Erro ao criar transação')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('❌ Erro no catch:', err)
      console.error('❌ Mensagem:', err.message)
      console.error('❌ Stack:', err.stack)
      setError(err.message || 'Erro ao criar transação')
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Transação criada com sucesso!</h2>
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
                Nova Transação
              </h1>
              <p className="text-sm text-[#708090]">Registre uma nova transação financeira</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <XCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Tipo <span className="text-[#6B1A2A]">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({...form, tipo: 'receita'})}
                    className={`flex-1 py-2 rounded-lg border-2 transition font-medium ${
                      form.tipo === 'receita'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    💰 Receita
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({...form, tipo: 'despesa'})}
                    className={`flex-1 py-2 rounded-lg border-2 transition font-medium ${
                      form.tipo === 'despesa'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    💳 Despesa
                  </button>
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Categoria <span className="text-[#6B1A2A]">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.categoria}
                  onChange={(e) => setForm({...form, categoria: e.target.value})}
                  required
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

              {/* Categoria Detalhada */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Subcategoria
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.categoria_detalhada}
                  onChange={(e) => setForm({...form, categoria_detalhada: e.target.value})}
                  placeholder="Ex: Seleção para Dev Full Stack"
                />
              </div>

              {/* Cliente */}
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

              {/* Descrição */}
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

              {/* Valor e Data */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Valor Total (R$) <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.valor}
                  onChange={(e) => {
                    setForm({...form, valor: e.target.value})
                    setTimeout(calcularParcela, 100)
                  }}
                  placeholder="0,00"
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

              {/* Status */}
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

              {/* ============================================ */}
              {/* SEÇÃO DE PARCELAMENTO */}
              {/* ============================================ */}
              <div className="md:col-span-2">
                <div className="border-t border-[#E8EAE0] pt-4 mt-2">
                  <h3 className="text-sm font-semibold text-[#2D343A] flex items-center gap-2 mb-4">
                    <Calculator className="h-5 w-5 text-[#6B1A2A]" />
                    Parcelamento
                  </h3>
                </div>
              </div>

              {/* Valor de Entrada */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Valor de Entrada (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.valor_entrada}
                  onChange={(e) => {
                    setForm({...form, valor_entrada: e.target.value})
                    setTimeout(calcularParcela, 100)
                  }}
                  placeholder="0,00"
                />
              </div>

              {/* Número de Parcelas */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Nº de Parcelas
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.parcelas_total}
                  onChange={(e) => {
                    setForm({...form, parcelas_total: e.target.value})
                    setTimeout(calcularParcela, 100)
                  }}
                >
                  <option value="1">1x (À vista)</option>
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="4">4x</option>
                  <option value="5">5x</option>
                  <option value="6">6x</option>
                  <option value="7">7x</option>
                  <option value="8">8x</option>
                  <option value="9">9x</option>
                  <option value="10">10x</option>
                  <option value="11">11x</option>
                  <option value="12">12x</option>
                </select>
              </div>

              {/* Valor da Parcela (calculado) */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Valor da Parcela (R$)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg bg-[#F8F4E6] text-[#2D343A] font-medium"
                  value={form.valor_parcela || 'Calculado automaticamente'}
                  readOnly
                />
              </div>

              {/* Parcelas Pagas */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Parcelas Pagas
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.parcelas_pagas}
                  onChange={(e) => setForm({...form, parcelas_pagas: e.target.value})}
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Data Próxima Parcela */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Data Próxima Parcela
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.data_proxima_parcela}
                  onChange={(e) => setForm({...form, data_proxima_parcela: e.target.value})}
                />
              </div>

              {/* Data Última Parcela */}
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Data Última Parcela
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.data_ultima_parcela}
                  onChange={(e) => setForm({...form, data_ultima_parcela: e.target.value})}
                />
              </div>

              {/* Observações */}
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
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Criar Transação
                  </>
                )}
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
