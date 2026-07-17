'use client'

import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Users, Search, Eye } from 'lucide-react'

export default function EmpresaCandidatos() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarEmpresa />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Candidatos</h1>
            <p className="text-sm text-[#708090]">Candidatos recebidos</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <p className="text-[#708090] text-center py-8">Nenhum candidato recebido ainda.</p>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
