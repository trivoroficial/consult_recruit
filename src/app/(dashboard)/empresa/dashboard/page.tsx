'use client'

import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Users, Calendar, TrendingUp, Bell } from 'lucide-react'

export default function EmpresaDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarEmpresa />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Dashboard Empresa</h1>
            <p className="text-sm text-[#708090]">Gerencie suas vagas e candidatos</p>
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
                  <p className="text-sm text-[#708090]">Vagas Abertas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Candidatos</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-[#8B0000]" />
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
                  <TrendingUp className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Contratações</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Suas Vagas</h2>
            <p className="text-[#708090] text-center py-8">Nenhuma vaga cadastrada ainda.</p>
            <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
              Criar Nova Vaga
            </button>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
