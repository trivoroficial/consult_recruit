'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  DollarSign, ArrowLeft, Save, CheckCircle, 
  TrendingUp, TrendingDown, Calendar, FileText,
  Building2, User
} from 'lucide-react'

export default function NovaTransacao() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    tipo: 'receita',
    categoria: '',
    descricao: '',
    cliente: '',
    valor: '',
    data: '',
    status: 'pendente'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => router.push('/admin/financeiro'), 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/financeiro')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Nova Transação</h1>
              <p className="text-sm text-[#708090]">Registre uma nova transação financeira</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {success ? (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Transação registrada com sucesso!</h2>
              <p className="text-[#708090] mt-2">A transação foi adicionada ao financeiro.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Tipo <span className="text-[#8B0000]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setForm({...form, tipo: 'receita'})} className={`py-3 px-4 rounded-lg border transition flex items-center justify-center gap-2 ${form.tipo === 'receita' ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000]' : 'border-[#E8EAE0] hover:bg-[#F8F4E6]'}`}>
                      <TrendingUp className="h-4 w-4" /> Receita
                    </button>
                    <button type="button" onClick={() => setForm({...form, tipo: 'despesa'})} className={`py-3 px-4 rounded-lg border transition flex items-center justify-center gap-2 ${form.tipo === 'despesa' ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000]' : 'border-[#E8EAE0] hover:bg-[#F8F4E6]'}`}>
                      <TrendingDown className="h-4 w-4" /> Despesa
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Categoria <span className="text-[#8B0000]">*</span>
                  </label>
                  <select required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.categoria} onChange={(e) => setForm({...form, categoria: e.target.value})}>
                    <option value="">Selecione...</option>
                    <option value="recrutamento">Recrutamento</option>
                    <option value="consultoria">Consultoria</option>
                    <option value="treinamento">Treinamento</option>
                    <option value="marketing">Marketing</option>
                    <option value="infraestrutura">Infraestrutura</option>
                    <option value="prestadores">Prestadores</option>
                    <option value="impostos">Impostos</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Descrição <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} placeholder="Descrição da transação" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Building2 className="h-4 w-4 inline mr-1" />
                    Cliente / Fornecedor
                  </label>
                  <input type="text" className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.cliente} onChange={(e) => setForm({...form, cliente: e.target.value})} placeholder="Nome do cliente ou fornecedor" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Valor <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="text" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.valor} onChange={(e) => setForm({...form, valor: e.target.value})} placeholder="R$ 0,00" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data <span className="text-[#8B0000]">*</span>
                  </label>
                  <input type="date" required className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.data} onChange={(e) => setForm({...form, data: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Status
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                    <option value="atrasado">Atrasado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#E8EAE0]">
                <button type="submit" disabled={loading} className="px-8 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2 disabled:opacity-50">
                  <Save className="h-5 w-5" />
                  {loading ? 'Registrando...' : 'Registrar Transação'}
                </button>
                <button type="button" onClick={() => router.push('/admin/financeiro')} className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]">
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
