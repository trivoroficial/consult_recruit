'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, ArrowLeft, Save, CheckCircle, Star, StarOff, Lock, Unlock } from 'lucide-react'
import { criarVaga } from '@/actions/vagas'

export default function NovaVaga() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    titulo: '',
    empresa: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    local: '',
    tipo: 'CLT',
    status: 'Aberta',
    exibirCarrossel: false,
    badge: '',
    corBadge: 'bg-purple-500',
    confidencial: false,
    salarioInicial: '',
    salarioFinal: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await criarVaga(form)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/vagas')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao cadastrar vaga')
        setLoading(false)
      }
    } catch (err) {
      setError('Erro ao cadastrar vaga')
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Vaga cadastrada com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                A vaga {form.titulo} foi cadastrada.
              </p>
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
              <p className="text-sm text-[#708090]">Cadastre uma nova vaga na plataforma</p>
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Título da Vaga <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.titulo}
                  onChange={(e) => setForm({...form, titulo: e.target.value})}
                  placeholder="Analista Administrativo"
                />
              </div>
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Descrição</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descreva a vaga..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Requisitos</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.requisitos}
                  onChange={(e) => setForm({...form, requisitos: e.target.value})}
                  placeholder="Excel avançado, Power BI, Gestão..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Benefícios</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.beneficios}
                  onChange={(e) => setForm({...form, beneficios: e.target.value})}
                  placeholder="VA, VR, Plano de Saúde, Gympass"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Local</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.local}
                  onChange={(e) => setForm({...form, local: e.target.value})}
                  placeholder="Uberlândia/MG"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Tipo</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value})}
                >
                  <option value="CLT">CLT</option>
                  <option value="PJ">PJ</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Temporário">Temporário</option>
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
                  <option value="Em análise">Em análise</option>
                  <option value="Pausada">Pausada</option>
                  <option value="Fechada">Fechada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Salário Inicial</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.salarioInicial}
                  onChange={(e) => setForm({...form, salarioInicial: e.target.value})}
                  placeholder="R$ 2.500,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Salário Final</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.salarioFinal}
                  onChange={(e) => setForm({...form, salarioFinal: e.target.value})}
                  placeholder="R$ 4.000,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Badge</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.badge}
                  onChange={(e) => setForm({...form, badge: e.target.value})}
                >
                  <option value="">Sem badge</option>
                  <option value="Destaque">Destaque</option>
                  <option value="Urgente">Urgente</option>
                  <option value="Novo">Novo</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Cor do Badge</label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.corBadge}
                  onChange={(e) => setForm({...form, corBadge: e.target.value})}
                >
                  <option value="bg-purple-500">Roxo</option>
                  <option value="bg-red-500">Vermelho</option>
                  <option value="bg-green-500">Verde</option>
                  <option value="bg-yellow-500">Amarelo</option>
                  <option value="bg-blue-500">Azul</option>
                  <option value="bg-pink-500">Rosa</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-[#E8EAE0]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-[#E8EAE0] text-[#6B1A2A] focus:ring-[#6B1A2A]"
                  checked={form.exibirCarrossel}
                  onChange={(e) => setForm({...form, exibirCarrossel: e.target.checked})}
                />
                <span className="text-sm text-[#2D343A]">Exibir no Carrossel</span>
                {form.exibirCarrossel ? (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4 text-gray-300" />
                )}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-[#E8EAE0] text-[#6B1A2A] focus:ring-[#6B1A2A]"
                  checked={form.confidencial}
                  onChange={(e) => setForm({...form, confidencial: e.target.checked})}
                />
                <span className="text-sm text-[#2D343A]">Vaga Confidencial</span>
                {form.confidencial ? (
                  <Lock className="h-4 w-4 text-[#6B1A2A]" />
                ) : (
                  <Unlock className="h-4 w-4 text-gray-300" />
                )}
              </label>
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? 'Cadastrando...' : 'Cadastrar Vaga'}
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
