'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Calendar, Clock, User, Briefcase, Building2,
  Save, ArrowLeft, CheckCircle, Video, Phone, MapPin,
  Users, FileText
} from 'lucide-react'

export default function NovaEntrevistaOperacional() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    participante: '',
    processo: '',
    cargo: '',
    entrevistador: '',
    data: '',
    hora: '',
    modalidade: 'presencial',
    local: '',
    link: '',
    tipo: 'entrevista_rh',
    status: 'pendente',
    observacoes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/operacional/entrevistas'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/entrevistas')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Nova Entrevista</h1>
              <p className="text-sm text-[#708090]">Agende uma nova entrevista operacional</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Entrevista agendada com sucesso!</h2>
              <p className="text-[#708090] mt-2">A entrevista foi agendada e está disponível na lista.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DADOS DA ENTREVISTA */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <Calendar className="h-5 w-5 text-[#8B0000]" />
                    Dados da Entrevista
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <User className="h-4 w-4 inline mr-1" />
                    Participante <span className="text-[#8B0000]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.participante}
                    onChange={(e) => setForm({...form, participante: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="joao">João Silva</option>
                    <option value="maria">Maria Santos</option>
                    <option value="pedro">Pedro Costa</option>
                    <option value="ana">Ana Oliveira</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Cargo <span className="text-[#8B0000]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.cargo}
                    onChange={(e) => setForm({...form, cargo: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="operador">Operador de Produção</option>
                    <option value="logistica">Auxiliar de Logística</option>
                    <option value="soldador">Soldador</option>
                    <option value="motorista">Motorista</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Processo Seletivo <span className="text-[#8B0000]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.processo}
                    onChange={(e) => setForm({...form, processo: e.target.value})}
                  >
                    <option value="">Selecione...</option>
                    <option value="producao">Operador de Produção - Indústria ABC</option>
                    <option value="logistica">Auxiliar de Logística - Grupo Logística</option>
                    <option value="soldador">Soldador - Metalúrgica XYZ</option>
                    <option value="motorista">Motorista - Transportadora Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <User className="h-4 w-4 inline mr-1" />
                    Entrevistador <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.entrevistador}
                    onChange={(e) => setForm({...form, entrevistador: e.target.value})}
                    placeholder="Nome do entrevistador"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data <span className="text-[#8B0000]">*</span>
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
                    Hora <span className="text-[#8B0000]">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.hora}
                    onChange={(e) => setForm({...form, hora: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Video className="h-4 w-4 inline mr-1" />
                    Modalidade <span className="text-[#8B0000]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.modalidade}
                    onChange={(e) => setForm({...form, modalidade: e.target.value})}
                  >
                    <option value="presencial">Presencial</option>
                    <option value="online">Online (Vídeo)</option>
                    <option value="telefone">Telefone</option>
                  </select>
                </div>

                {form.modalidade === 'presencial' && (
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Local <span className="text-[#8B0000]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.local}
                      onChange={(e) => setForm({...form, local: e.target.value})}
                      placeholder="Endereço da entrevista"
                    />
                  </div>
                )}

                {form.modalidade === 'online' && (
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      <Video className="h-4 w-4 inline mr-1" />
                      Link da Entrevista <span className="text-[#8B0000]">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      value={form.link}
                      onChange={(e) => setForm({...form, link: e.target.value})}
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Tipo de Entrevista
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                  >
                    <option value="triagem">Triagem</option>
                    <option value="entrevista_rh">Entrevista RH</option>
                    <option value="entrevista_tecnica">Entrevista Técnica</option>
                    <option value="entrevista_gestor">Entrevista Gestor</option>
                    <option value="entrevista_final">Entrevista Final</option>
                    <option value="operacional">Entrevista Operacional</option>
                  </select>
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
                    <option value="pendente">Pendente</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
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
                    placeholder="Observações adicionais sobre a entrevista..."
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
                  {loading ? 'Agendando...' : 'Agendar Entrevista'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/operacional/entrevistas')}
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
