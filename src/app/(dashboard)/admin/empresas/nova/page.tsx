'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Building2, ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function NovaEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    funcionarios: '',
    plano: 'Básico',
    status: 'Ativo',
    descricao: '',
    responsavel: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // 1. SALVAR NO SUPABASE
      const { data, error } = await supabase
        .from('empresas')
        .insert([{
          nome: form.nome,
          cnpj: form.cnpj,
          telefone: form.telefone,
          email: form.email,
          cidade: form.cidade,
          estado: form.estado,
          funcionarios: parseInt(form.funcionarios) || 0,
          plano: form.plano,
          status: form.status,
          descricao: form.descricao,
          responsavel: form.responsavel,
          vagas_ativas: 0
        }])
        .select()

      if (error) throw error

      // 2. SALVAR NO LOCALSTORAGE (FALLBACK)
      const saved = localStorage.getItem('zenthos_empresas')
      let empresas = []
      if (saved) {
        empresas = JSON.parse(saved)
      }
      empresas.push({
        id: data?.[0]?.id || Date.now(),
        ...form,
        funcionarios: parseInt(form.funcionarios) || 0,
        vagasAtivas: 0,
        dataCadastro: new Date().toISOString()
      })
      localStorage.setItem('zenthos_empresas', JSON.stringify(empresas))

      setLoading(false)
      setSuccess(true)

      setTimeout(() => {
        router.push('/admin/empresas')
      }, 2000)

    } catch (error: any) {
      console.error('Erro ao cadastrar empresa:', error)
      alert('Erro ao cadastrar empresa: ' + error.message)
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Empresa cadastrada com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                A empresa {form.nome} foi cadastrada.
              </p>
              <button
                onClick={() => router.push('/admin/empresas')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Empresas
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
              onClick={() => router.push('/admin/empresas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Building2 className="h-6 w-6 text-[#6B1A2A]" />
                Nova Empresa
              </h1>
              <p className="text-sm text-[#708090]">Cadastre uma nova empresa na plataforma</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Nome da Empresa <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.nome}
                  onChange={(e) => setForm({...form, nome: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  CNPJ
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.cnpj}
                  onChange={(e) => setForm({...form, cnpj: e.target.value})}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Telefone
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.telefone}
                  onChange={(e) => setForm({...form, telefone: e.target.value})}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Email <span className="text-[#6B1A2A]">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="empresa@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Cidade
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.cidade}
                  onChange={(e) => setForm({...form, cidade: e.target.value})}
                  placeholder="Uberlândia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Estado
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.estado}
                  onChange={(e) => setForm({...form, estado: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="MG">MG</option><option value="SP">SP</option>
                  <option value="RJ">RJ</option><option value="GO">GO</option>
                  <option value="PR">PR</option><option value="RS">RS</option>
                  <option value="SC">SC</option><option value="BA">BA</option>
                  <option value="PE">PE</option><option value="CE">CE</option>
                  <option value="DF">DF</option><option value="MT">MT</option>
                  <option value="MS">MS</option><option value="PA">PA</option>
                  <option value="AM">AM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Número de Funcionários
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.funcionarios}
                  onChange={(e) => setForm({...form, funcionarios: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Plano
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.plano}
                  onChange={(e) => setForm({...form, plano: e.target.value})}
                >
                  <option value="Básico">Básico</option>
                  <option value="Profissional">Profissional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                  <option value="Pendente">Pendente</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Responsável
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                  value={form.responsavel}
                  onChange={(e) => setForm({...form, responsavel: e.target.value})}
                  placeholder="Nome do responsável"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descreva a empresa..."
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
                {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/empresas')}
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
