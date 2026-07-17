'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react'

export default function AdminFinanceiro() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Financeiro</h1>
            <p className="text-sm text-[#708090]">Gestão financeira da plataforma</p>
          </div>
          <button className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ 98.500</p>
                  <p className="text-sm text-[#708090]">Receitas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ 45.200</p>
                  <p className="text-sm text-[#708090]">Despesas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ 53.300</p>
                  <p className="text-sm text-[#708090]">Lucro</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Últimas Transações</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2D343A]">Recrutamento - XPTO</p>
                  <p className="text-sm text-[#708090]">01/07/2026</p>
                </div>
                <span className="text-green-600 font-semibold">+ R$ 3.500</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2D343A]">Consultoria - ABC</p>
                  <p className="text-sm text-[#708090]">05/07/2026</p>
                </div>
                <span className="text-red-600 font-semibold">- R$ 2.800</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2D343A]">Recrutamento - Financeira</p>
                  <p className="text-sm text-[#708090]">10/07/2026</p>
                </div>
                <span className="text-green-600 font-semibold">+ R$ 2.800</span>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
