'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { BarChart3, Download, Users, Building2, Briefcase, TrendingUp } from 'lucide-react'

export default function AdminRelatorios() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Relatórios</h1>
            <p className="text-sm text-[#708090]">Análise e indicadores da plataforma</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">245</p>
                  <p className="text-sm text-[#708090]">Usuários</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">32</p>
                  <p className="text-sm text-[#708090]">Empresas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">18</p>
                  <p className="text-sm text-[#708090]">Vagas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ 98.500</p>
                  <p className="text-sm text-[#708090]">Receita</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Relatórios Disponíveis</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-between">
                  <span className="text-[#2D343A]">📊 Relatório de Usuários</span>
                  <Download className="h-4 w-4 text-[#708090]" />
                </button>
                <button className="w-full text-left px-4 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-between">
                  <span className="text-[#2D343A]">📊 Relatório de Vagas</span>
                  <Download className="h-4 w-4 text-[#708090]" />
                </button>
                <button className="w-full text-left px-4 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-between">
                  <span className="text-[#2D343A]">📊 Relatório Financeiro</span>
                  <Download className="h-4 w-4 text-[#708090]" />
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Filtros Avançados</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1">Período</label>
                  <select className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]">
                    <option>Últimos 30 dias</option>
                    <option>Últimos 90 dias</option>
                    <option>Último ano</option>
                  </select>
                </div>
                <button className="w-full py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
