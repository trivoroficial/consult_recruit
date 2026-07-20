'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Building2, User, Mail, Phone, MapPin, Save, 
  ArrowLeft, CheckCircle, Users, Briefcase
} from 'lucide-react'

export default function NovaEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    segmento: '',
    porte: 'medio',
    responsavel: '',
    email: '',
    telefone: '',
    celular: '',
    cidade: '',
    estado: '',
    senha: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/empresas'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/empresas')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Nova Empresa</h1>
              <p className="text-sm text-[#708090]">Cadastre uma nova empresa na plataforma</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Empresa cadastrada com sucesso!</h2>
              <p className="text-[#708090] mt-2">Um convite foi enviado para o email do responsável.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DADOS DA EMPRESA */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <Building2 className="h-5 w-5 text-[#8B0000]" />
                    Dados da Empresa
                  </h3>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Razão Social <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.razaoSocial} onChange={(e) => setForm({...form, razaoSocial: e.target.value})} placeholder="Razão Social da empresa" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome Fantasia <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.nomeFantasia} onChange={(e) => setForm({...form, nomeFantasia: e.target.value})} placeholder="Nome Fantasia" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    CNPJ <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.cnpj} onChange={(e) => setForm({...form, cnpj: e.target.value})} placeholder="00.000.000/0001-00" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Segmento <span className="text-[#8B0000]">*</span>
                  </label>
                  <select required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.segmento} onChange={(e) => setForm({...form, segmento: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="industria">Indústria</option>
                    <option value="comercio">Comércio</option>
                    <option value="servicos">Serviços</option>
                    <option value="agro">Agronegócio</option>
                    <option value="saude">Saúde</option>
                    <option value="educacao">Educação</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="construcao">Construção Civil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Porte da Empresa
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.porte} onChange={(e) => setForm({...form, porte: e.target.value})}>
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Médio</option>
                    <option value="grande">Grande</option>
                    <option value="corporativo">Corporativo</option>
                  </select>
                </div>

                {/* DADOS DO RESPONSÁVEL */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-[#2D343A] flex items-center gap-2 border-b border-[#E8EAE0] pb-3 mt-4">
                    <User className="h-5 w-5 text-[#8B0000]" />
                    Dados do Responsável
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome do Responsável <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.responsavel} onChange={(e) => setForm({...form, responsavel: e.target.value})} placeholder="Nome completo" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Email <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="email" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="contato@empresa.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Telefone
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})} placeholder="(00) 0000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Celular <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.celular} onChange={(e) => setForm({...form, celular: e.target.value})} placeholder="(00) 00000-0000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Cidade
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.cidade} onChange={(e) => setForm({...form, cidade: e.target.value})} placeholder="Uberlândia" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Estado
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option value="MG">MG</option><option value="SP">SP</option><option value="RJ">RJ</option>
                    <option value="GO">GO</option><option value="PR">PR</option><option value="RS">RS</option>
                    <option value="SC">SC</option><option value="BA">BA</option><option value="PE">PE</option>
                    <option value="CE">CE</option><option value="DF">DF</option><option value="MT">MT</option>
                    <option value="MS">MS</option><option value="PA">PA</option><option value="AM">AM</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Senha de Acesso <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="password" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.senha} onChange={(e) => setForm({...form, senha: e.target.value})} placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
                <button type="submit" disabled={loading} className="px-8 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50">
                  <Save className="h-5 w-5" />
                  {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
                </button>
                <button type="button" onClick={() => router.push('/admin/empresas')} className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]">
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
