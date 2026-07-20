'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  User, Phone, MapPin, Briefcase, Save, ArrowLeft, CheckCircle,
  School, Building2, DollarSign, Calendar, FileText
} from 'lucide-react'

export default function NovoParticipanteOperacional() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    cidade: '',
    bairro: '',
    cargo: '',
    escolaridade: '',
    experiencia: '',
    empresaAtual: '',
    ultimoSalario: '',
    disponibilidade: '',
    observacoes: '',
    origem: 'site'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/operacional/participantes'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/participantes')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Novo Participante</h1>
              <p className="text-sm text-[#708090]">Cadastre um participante para processos operacionais</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Participante cadastrado com sucesso!</h2>
              <p className="text-[#708090] mt-2">O participante já pode ser vinculado a processos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* INFORMAÇÕES PESSOAIS */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <User className="h-5 w-5 text-[#8B0000]" />
                    Informações Pessoais
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome completo <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                    placeholder="Nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Telefone <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.telefone}
                    onChange={(e) => setForm({...form, telefone: e.target.value})}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    CPF
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cpf}
                    onChange={(e) => setForm({...form, cpf: e.target.value})}
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Cidade
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cidade}
                    onChange={(e) => setForm({...form, cidade: e.target.value})}
                    placeholder="Uberlândia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Bairro
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.bairro}
                    onChange={(e) => setForm({...form, bairro: e.target.value})}
                    placeholder="Bairro"
                  />
                </div>

                {/* INFORMAÇÕES PROFISSIONAIS */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3 mt-4">
                    <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    Informações Profissionais
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Cargo pretendido
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cargo}
                    onChange={(e) => setForm({...form, cargo: e.target.value})}
                    placeholder="Operador de Produção"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <School className="h-4 w-4 inline mr-1" />
                    Escolaridade
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.escolaridade}
                    onChange={(e) => setForm({...form, escolaridade: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="fundamental">Ensino Fundamental</option>
                    <option value="medio">Ensino Médio</option>
                    <option value="tecnico">Técnico</option>
                    <option value="superior">Superior</option>
                    <option value="pos">Pós-Graduação</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Experiência profissional
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    value={form.experiencia}
                    onChange={(e) => setForm({...form, experiencia: e.target.value})}
                    placeholder="Descreva a experiência profissional do participante..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Empresa atual
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.empresaAtual}
                    onChange={(e) => setForm({...form, empresaAtual: e.target.value})}
                    placeholder="Empresa atual"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Último salário
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.ultimoSalario}
                    onChange={(e) => setForm({...form, ultimoSalario: e.target.value})}
                    placeholder="R$ 0,00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Disponibilidade
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.disponibilidade}
                    onChange={(e) => setForm({...form, disponibilidade: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="imediata">Imediata</option>
                    <option value="15dias">15 dias</option>
                    <option value="30dias">30 dias</option>
                    <option value="indisponivel">Indisponível</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Origem do candidato
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.origem}
                    onChange={(e) => setForm({...form, origem: e.target.value})}
                  >
                    <option value="site">Site</option>
                    <option value="indicacao">Indicação</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="evento">Evento</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Observações
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    value={form.observacoes}
                    onChange={(e) => setForm({...form, observacoes: e.target.value})}
                    placeholder="Observações adicionais sobre o participante..."
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
                  {loading ? 'Cadastrando...' : 'Cadastrar Participante'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/operacional/participantes')}
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
