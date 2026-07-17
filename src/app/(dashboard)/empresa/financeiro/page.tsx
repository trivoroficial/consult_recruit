'use client'

import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { DollarSign, FileText, Calendar } from 'lucide-react'

export default function EmpresaFinanceiro() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarEmpresa />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Financeiro</h1>
            <p className="text-sm text-[#708090]">Gestão financeira</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ 0</p>
                  <p className="text-sm text-[#708090]">Total Investido</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Serviços</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">-</p>
                  <p className="text-sm text-[#708090]">Próximo Vencimento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
