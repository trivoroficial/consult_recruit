'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Search, CheckCircle, FileText, Bell } from 'lucide-react'

export default function CandidatoDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Dashboard Candidato</h1>
            <p className="text-sm text-[#708090]">Acompanhe sua jornada profissional</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-[#F8F4E6] transition">
            <Bell className="h-5 w-5 text-[#708090]" />
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Candidaturas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Search className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Vagas Recomendadas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Entrevistas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <FileText className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0%</p>
                  <p className="text-sm text-[#708090]">Perfil Completo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Vagas Recomendadas</h2>
              <p className="text-[#708090] text-center py-8">Nenhuma vaga recomendada ainda.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Seu Progresso</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#708090]">Perfil</p>
                  <div className="w-full bg-[#E8EAE0] rounded-full h-2 mt-1">
                    <div className="bg-[#8B0000] h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
                  Completar Perfil
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
