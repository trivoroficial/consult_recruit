'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { CheckCircle, Clock, XCircle } from 'lucide-react'

export default function CandidatoCandidaturas() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Minhas Candidaturas</h1>
            <p className="text-sm text-[#708090]">Acompanhe suas candidaturas</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <p className="text-[#708090] text-center py-8">Você ainda não se candidatou a nenhuma vaga.</p>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
