'use client'

import { useState } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  DollarSign, TrendingUp, TrendingDown, Calendar, Download, 
  Plus, Eye, Edit, Trash2, FileText, CreditCard, Users,
  Search, Filter, ArrowUpDown, CheckCircle, XCircle, Clock
} from 'lucide-react'

export default function AdminFinanceiro() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // DADOS DE EXEMPLO
  const contasReceber = [
    { id: 1, cliente: 'Empresa XPTO', servico: 'Recrutamento', valor: 3500, vencimento: '15/07/2026', status: 'pago' },
    { id: 2, cliente: 'Indústria ABC', servico: 'Consultoria RH', valor: 2800, vencimento: '20/07/2026', status: 'pendente' },
    { id: 3, cliente: 'Grupo Financeiro', servico: 'Recrutamento', valor: 4200, vencimento: '25/07/2026', status: 'pendente' },
    { id: 4, cliente: 'Tech Solutions', servico: 'Treinamento', valor: 1500, vencimento: '30/07/2026', status: 'atrasado' },
  ]

  const contasPagar = [
    { id: 1, fornecedor: 'Google Ads', categoria: 'Marketing', valor: 500, vencimento: '10/07/2026', status: 'pago' },
    { id: 2, fornecedor: 'AWS Cloud', categoria: 'Infraestrutura', valor: 850, vencimento: '15/07/2026', status: 'pendente' },
    { id: 3, fornecedor: 'Consultor Externo', categoria: 'Prestadores', valor: 1200, vencimento: '20/07/2026', status: 'pendente' },
  ]

  const contratos = [
    { id: 1, cliente: 'Empresa XPTO', servico: 'Recrutamento', valor: 3500, inicio: '01/07/2026', fim: '31/12/2026', status: 'ativo' },
    { id: 2, cliente: 'Indústria ABC', servico: 'Consultoria RH', valor: 2800, inicio: '01/06/2026', fim: '30/11/2026', status: 'ativo' },
    { id: 3, cliente: 'Grupo Financeiro', servico: 'Recrutamento', valor: 4200, inicio: '15/06/2026', fim: '15/12/2026', status: 'ativo' },
  ]

  const totalReceber = contasReceber.filter(c => c.status !== 'pago').reduce((acc, c) => acc + c.valor, 0)
  const totalPagar = contasPagar.filter(c => c.status !== 'pago').reduce((acc, c) => acc + c.valor, 0)
  const totalRecebido = contasReceber.filter(c => c.status === 'pago').reduce((acc, c) => acc + c.valor, 0)

  const statusConfig = {
    pago: { label: 'Pago', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    pendente: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    atrasado: { label: 'Atrasado', color: 'bg-red-100 text-red-700', icon: XCircle },
    ativo: { label: 'Ativo', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Financeiro</h1>
            <p className="text-sm text-[#708090]">Gestão financeira da plataforma</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* TABS */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'dashboard' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('receber')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'receber' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              Contas a Receber
            </button>
            <button
              onClick={() => setActiveTab('pagar')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'pagar' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              Contas a Pagar
            </button>
            <button
              onClick={() => setActiveTab('contratos')}
              className={`px-6 py-2.5 rounded-lg font-medium transition ${
                activeTab === 'contratos' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'bg-white text-[#708090] hover:bg-[#F8F4E6] border border-[#E8EAE0]'
              }`}
            >
              Contratos
            </button>
          </div>

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D343A]">R$ {totalRecebido.toLocaleString()}</p>
                      <p className="text-sm text-[#708090]">Recebido</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D343A]">R$ {totalReceber.toLocaleString()}</p>
                      <p className="text-sm text-[#708090]">A Receber</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D343A]">R$ {totalPagar.toLocaleString()}</p>
                      <p className="text-sm text-[#708090]">A Pagar</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D343A]">{contratos.length}</p>
                      <p className="text-sm text-[#708090]">Contratos Ativos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#8B0000]" />
                    Últimas Receitas
                  </h2>
                  <div className="space-y-3">
                    {contasReceber.slice(0, 3).map((item) => {
                      const status = statusConfig[item.status as keyof typeof statusConfig]
                      const Icon = status?.icon || CheckCircle
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                          <div>
                            <p className="font-medium text-[#2D343A]">{item.cliente}</p>
                            <p className="text-sm text-[#708090]">{item.servico}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-[#2D343A]">R$ {item.valor}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color}`}>
                              {status?.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#8B0000]" />
                    Contratos Ativos
                  </h2>
                  <div className="space-y-3">
                    {contratos.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.cliente}</p>
                          <p className="text-sm text-[#708090]">{item.servico}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-[#2D343A]">R$ {item.valor}/mês</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Ativo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTAS A RECEBER */}
          {activeTab === 'receber' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                  <input 
                    type="text" 
                    placeholder="Buscar contas a receber..." 
                    className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Serviço</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vencimento</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contasReceber.map((item) => {
                      const status = statusConfig[item.status as keyof typeof statusConfig]
                      const Icon = status?.icon || CheckCircle
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0]">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.cliente}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.servico}</td>
                          <td className="py-3 px-4 font-medium text-[#2D343A]">R$ {item.valor}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.vencimento}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                              <Icon className="h-3 w-3" />
                              {status?.label}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Trash2 className="h-4 w-4 text-red-500" /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-[#708090]">
                <p>Mostrando {contasReceber.length} registros</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                  <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                  <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
                </div>
              </div>
            </div>
          )}

          {/* CONTAS A PAGAR */}
          {activeTab === 'pagar' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                  <input 
                    type="text" 
                    placeholder="Buscar contas a pagar..." 
                    className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtrar
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Fornecedor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Categoria</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vencimento</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contasPagar.map((item) => {
                      const status = statusConfig[item.status as keyof typeof statusConfig]
                      const Icon = status?.icon || CheckCircle
                      return (
                        <tr key={item.id} className="border-b border-[#E8EAE0]">
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.fornecedor}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.categoria}</td>
                          <td className="py-3 px-4 font-medium text-[#2D343A]">R$ {item.valor}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.vencimento}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} flex items-center gap-1 w-fit`}>
                              <Icon className="h-3 w-3" />
                              {status?.label}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                              <button className="p-1 hover:bg-[#F8F4E6] rounded"><Trash2 className="h-4 w-4 text-red-500" /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CONTRATOS */}
          {activeTab === 'contratos' && (
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                  <input 
                    type="text" 
                    placeholder="Buscar contratos..." 
                    className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Contrato
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cliente</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Serviço</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Início</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Fim</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contratos.map((item) => (
                      <tr key={item.id} className="border-b border-[#E8EAE0]">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.cliente}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.servico}</td>
                        <td className="py-3 px-4 font-medium text-[#2D343A]">R$ {item.valor}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.inicio}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.fim}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Ativo</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                            <button className="p-1 hover:bg-[#F8F4E6] rounded"><FileText className="h-4 w-4 text-[#8B0000]" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
