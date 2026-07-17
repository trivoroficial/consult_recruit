'use client'

import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export default function EmpresaVagas() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarEmpresa />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Minhas Vagas</h1>
            <p className="text-sm text-[#708090]">Gerencie suas vagas</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <p className="text-[#708090] text-center py-8">Nenhuma vaga cadastrada ainda.</p>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
