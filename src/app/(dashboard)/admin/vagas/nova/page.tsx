'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, ArrowLeft, Save, CheckCircle, XCircle } from 'lucide-react'
import { criarVaga } from '@/actions/vagas'

export default function NovaVaga() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    titulo: '',
    empresa: '',
    empresa_id: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    local: '',
    tipo: 'CLT',
    status: 'Aberta',
    exibir_carrossel: false,
    badge: '',
    cor_badge: '#6B1A2A',
    confidencial: false,
    salario_inicial: '',
    salario_final: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validação básica
      if (!form.titulo.trim()) {
        setError('O título da vaga é obrigatório')
        setLoading(false)
        return
      }

      if (!form.empresa.trim()) {
        setError('O nome da empresa é obrigatório')
        setLoading(false)
        return
      }

      const dados = {
        ...form,
        salario_inicial: form.salario_inicial ? parseFloat(form.salario_inicial) : null,
        salario_final: form.salario_final ? parseFloat(form.salario_final) : null,
        empresa_id: form.empresa_id ? parseInt(form.empresa_id) : null
      }

      console.log('Enviando dados:', dados) // LOG PARA DEBUG

      const result = await criarVaga(dados)

      console.log('Resultado:', result) // LOG PARA DEBUG

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/vagas')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao criar vaga')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('Erro:', err)
      setError(err.message || 'Erro ao criar vaga')
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Vaga criada com sucesso!</h2>
              <p className="text-[#708090] mt-2">A vaga foi publicada e já está disponível.</p>
              <button
                onClick={() => router.push('/admin/vagas')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Vagas
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
              onClick={() => router.push('/admin/vagas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-[#6B1A2A]" />
                Nova Vaga
              </h1>
              <p className="text-sm text-[#708090]">Preencha os dados para criar uma nova vaga</p>
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
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Título da Vaga <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.titulo}
                  onChange={(e) => setForm({...form, titulo: e.target.value})}
                  placeholder="Ex: Desenvolvedor Full Stack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Empresa <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.empresa}
                  onChange={(e) => setForm({...form, empresa: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Local</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.local}
                  onChange={(e) => setForm({...form, local: e.target.value})}
                  placeholder="Uberlândia - MG ou Remoto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Tipo de Contratação</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value})}
                >
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Temporário">Temporário</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="Aberta">Aberta</option>
                  <option value="Fechada">Fechada</option>
                  <option value="Pausada">Pausada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Badge (opcional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.badge}
                  onChange={(e) => setForm({...form, badge: e.target.value})}
                  placeholder="Urgente, Destaque, etc"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Cor do Badge</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 border border-[#E8EAE0] rounded-lg cursor-pointer"
                    value={form.cor_badge}
                    onChange={(e) => setForm({...form, cor_badge: e.target.value})}
                  />
                  <span className="text-sm text-[#708090]">{form.cor_badge}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Salário Inicial (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.salario_inicial}
                  onChange={(e) => setForm({...form, salario_inicial: e.target.value})}
                  placeholder="3000.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Salário Final (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.salario_final}
                  onChange={(e) => setForm({...form, salario_final: e.target.value})}
                  placeholder="5000.00"
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.exibir_carrossel}
                    onChange={(e) => setForm({...form, exibir_carrossel: e.target.checked})}
                    className="w-4 h-4 text-[#6B1A2A] rounded border-[#E8EAE0] focus:ring-[#6B1A2A]"
                  />
                  <span className="text-sm text-[#2D343A]">Exibir no Carrossel (Home)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.confidencial}
                    onChange={(e) => setForm({...form, confidencial: e.target.checked})}
                    className="w-4 h-4 text-[#6B1A2A] rounded border-[#E8EAE0] focus:ring-[#6B1A2A]"
                  />
                  <span className="text-sm text-[#2D343A]">Vaga Confidencial</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Descrição</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descreva a vaga, responsabilidades, atividades do dia a dia..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Requisitos <span className="text-xs text-[#708090]">(um por linha)</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.requisitos}
                  onChange={(e) => setForm({...form, requisitos: e.target.value})}
                  placeholder="Experiência em React e Next.js&#10;Conhecimento em TypeScript&#10;Banco de dados PostgreSQL"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Benefícios <span className="text-xs text-[#708090]">(um por linha)</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.beneficios}
                  onChange={(e) => setForm({...form, beneficios: e.target.value})}
                  placeholder="Vale alimentação&#10;Plano de saúde&#10;Home office"
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
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Criar Vaga
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/vagas')}
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
