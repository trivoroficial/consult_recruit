'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Building2, MapPin, Users, Calendar, 
  Save, ArrowLeft, CheckCircle, User, Clock,
  FileText, DollarSign
} from 'lucide-react'

export default function NovoProcessoOperacional() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    empresa: '',
    unidade: '',
    cidade: '',
    responsavel: '',
    consultor: '',
    vagas: '',
    cargo: '',
    tipoContratacao: 'clt',
    data: '',
    status: 'ativo',
    observacoes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/operacional/processos'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/processos')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Novo Processo Operacional</h1>
              <p className="text-sm text-[#708090]">Crie um novo processo seletivo presencial</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Processo criado com sucesso!</h2>
              <p className="text-[#708090] mt-2">O processo já está disponível para cadastro de participantes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* INFORMAÇÕES BÁSICAS */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    Informações Básicas
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome do Processo <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                    placeholder="Ex: Operador de Produção - Indústria ABC"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Empresa <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.empresa}
                    onChange={(e) => setForm({...form, empresa: e.target.value})}
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Unidade
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.unidade}
                    onChange={(e) => setForm({...form, unidade: e.target.value})}
                    placeholder="Unidade 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Cidade <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cidade}
                    onChange={(e) => setForm({...form, cidade: e.target.value})}
                    placeholder="Uberlândia/MG"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <User className="h-4 w-4 inline mr-1" />
                    Responsável <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.responsavel}
                    onChange={(e) => setForm({...form, responsavel: e.target.value})}
                    placeholder="Nome do responsável"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Consultor
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.consultor}
                    onChange={(e) => setForm({...form, consultor: e.target.value})}
                    placeholder="Nome do consultor"
                  />
                </div>

                {/* DETALHES DA VAGA */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3 mt-4">
                    <Users className="h-5 w-5 text-[#8B0000]" />
                    Detalhes da Vaga
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Cargo <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cargo}
                    onChange={(e) => setForm({...form, cargo: e.target.value})}
                    placeholder="Operador de Produção"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Tipo de Contratação
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.tipoContratacao}
                    onChange={(e) => setForm({...form, tipoContratacao: e.target.value})}
                  >
                    <option value="clt">CLT</option>
                    <option value="pj">PJ</option>
                    <option value="temporario">Temporário</option>
                    <option value="estagio">Estágio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Users className="h-4 w-4 inline mr-1" />
                    Quantidade de Vagas <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.vagas}
                    onChange={(e) => setForm({...form, vagas: e.target.value})}
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data de Início <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.data}
                    onChange={(e) => setForm({...form, data: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.status}
                    onChange={(e) => setForm({...form, status: e.target.value})}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="pausado">Pausado</option>
                    <option value="concluido">Concluído</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    value={form.observacoes}
                    onChange={(e) => setForm({...form, observacoes: e.target.value})}
                    placeholder="Observações adicionais sobre o processo..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="h-5 w-5" />
                  {loading ? 'Criando...' : 'Criar Processo'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/operacional/processos')}
                  className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
