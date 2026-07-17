'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Settings, Save, Bell, Shield } from 'lucide-react'

export default function CandidatoConfiguracoes() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Configurações</h1>
            <p className="text-sm text-[#708090]">Preferências da conta</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#8B0000]" />
                Notificações
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" defaultChecked />
                  <span className="text-sm text-[#2D343A]">Receber notificações por email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" />
                  <span className="text-sm text-[#2D343A]">Receber alertas de vagas</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#8B0000]" />
                Privacidade
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" defaultChecked />
                  <span className="text-sm text-[#2D343A]">Perfil público</span>
                </label>
              </div>
            </div>

            <button className="w-full py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
              <Save className="h-5 w-5" />
              Salvar Configurações
            </button>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
