'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react'

export default function CandidatoVagas() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Buscar Vagas</h1>
            <p className="text-sm text-[#708090]">Encontre oportunidades</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#708090]" />
            <input 
              type="text" 
              placeholder="Buscar vagas por cargo, empresa ou local..." 
              className="w-full pl-10 pr-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <p className="text-[#708090] text-center py-8">Nenhuma vaga disponível no momento.</p>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
