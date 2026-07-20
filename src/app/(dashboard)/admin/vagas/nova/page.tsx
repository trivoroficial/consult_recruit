'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Building2, MapPin, DollarSign, Users, 
  Save, ArrowLeft, CheckCircle, Calendar, Clock,
  FileText, Award
} from 'lucide-react'

export default function NovaVaga() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    titulo: '',
    empresa: '',
    departamento: '',
    tipo: 'clt',
    modalidade: 'presencial',
    local: '',
    salario: '',
    beneficios: '',
    descricao: '',
    requisitos: '',
    experiencia: '',
    escolaridade: '',
    competencias: '',
    quantidade: '1',
    prazo: '',
    responsavel: ''
  })

  const empresas = ['Empresa XPTO', 'Indústria ABC', 'Grupo Financeiro', 'Tech Solutions']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/vagas'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/vagas')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Nova Vaga</h1>
              <p className="text-sm text-[#708090]">Crie uma nova vaga para uma empresa</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Vaga criada com sucesso!</h2>
              <p className="text-[#708090] mt-2">A vaga foi publicada e está disponível para candidatos.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    Informações Básicas
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Título da Vaga <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})} placeholder="Ex: Analista Administrativo" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Empresa <span className="text-[#8B0000]">*</span>
                  </label>
                  <select required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.empresa} onChange={(e) => setForm({...form, empresa: e.target.value})}>
                    <option value="">Selecione...</option>
                    {empresas.map((emp) => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Departamento
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.departamento} onChange={(e) => setForm({...form, departamento: e.target.value})} placeholder="Ex: Recursos Humanos" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Tipo de Contrato <span className="text-[#8B0000]">*</span>
                  </label>
                  <select required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.tipo} onChange={(e) => setForm({...form, tipo: e.target.value})}>
                    <option value="clt">CLT</option>
                    <option value="pj">PJ</option>
                    <option value="estagio">Estágio</option>
                    <option value="temporario">Temporário</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Modalidade <span className="text-[#8B0000]">*</span>
                  </label>
                  <select required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.modalidade} onChange={(e) => setForm({...form, modalidade: e.target.value})}>
                    <option value="presencial">Presencial</option>
                    <option value="hibrido">Híbrido</option>
                    <option value="remoto">Remoto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Local <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.local} onChange={(e) => setForm({...form, local: e.target.value})} placeholder="Uberlândia/MG" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <DollarSign className="h-4 w-4 inline mr-1" />
                    Salário
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.salario} onChange={(e) => setForm({...form, salario: e.target.value})} placeholder="R$ 3.500,00" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Benefícios
                  </label>
                  <textarea rows={2} className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none" value={form.beneficios} onChange={(e) => setForm({...form, beneficios: e.target.value})} placeholder="Vale transporte, Vale alimentação, Plano de saúde..." />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3 mt-4">
                    <FileText className="h-5 w-5 text-[#8B0000]" />
                    Descrição e Requisitos
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Descrição da Vaga <span className="text-[#8B0000]">*</span>
                  </label>
                  <textarea required rows={4} className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} placeholder="Descreva as principais atividades e responsabilidades da vaga..." />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Requisitos <span className="text-[#8B0000]">*</span>
                  </label>
                  <textarea required rows={3} className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none" value={form.requisitos} onChange={(e) => setForm({...form, requisitos: e.target.value})} placeholder="Liste os requisitos obrigatórios e desejáveis..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Experiência Mínima
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.experiencia} onChange={(e) => setForm({...form, experiencia: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option value="sem">Sem experiência</option>
                    <option value="6meses">6 meses</option>
                    <option value="1ano">1 ano</option>
                    <option value="2anos">2 anos</option>
                    <option value="3anos">3 anos</option>
                    <option value="5anos">5 anos ou mais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Escolaridade
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.escolaridade} onChange={(e) => setForm({...form, escolaridade: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option value="fundamental">Ensino Fundamental</option>
                    <option value="medio">Ensino Médio</option>
                    <option value="tecnico">Técnico</option>
                    <option value="superior">Superior</option>
                    <option value="pos">Pós-Graduação</option>
                    <option value="mestrado">Mestrado</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Competências Desejadas
                  </label>
                  <textarea rows={2} className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none" value={form.competencias} onChange={(e) => setForm({...form, competencias: e.target.value})} placeholder="Excel, Liderança, Comunicação, Gestão de Projetos..." />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3 mt-4">
                    <Calendar className="h-5 w-5 text-[#8B0000]" />
                    Detalhes Adicionais
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Users className="h-4 w-4 inline mr-1" />
                    Quantidade de Vagas
                  </label>
                  <input type="number" min="1" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.quantidade} onChange={(e) => setForm({...form, quantidade: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Prazo para Candidaturas
                  </label>
                  <input type="date" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.prazo} onChange={(e) => setForm({...form, prazo: e.target.value})} />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Award className="h-4 w-4 inline mr-1" />
                    Responsável pelo Processo
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.responsavel} onChange={(e) => setForm({...form, responsavel: e.target.value})} placeholder="Nome do responsável" />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
                <button type="submit" disabled={loading} className="px-8 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50">
                  <Save className="h-5 w-5" />
                  {loading ? 'Criando...' : 'Criar Vaga'}
                </button>
                <button type="button" onClick={() => router.push('/admin/vagas')} className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]">
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
