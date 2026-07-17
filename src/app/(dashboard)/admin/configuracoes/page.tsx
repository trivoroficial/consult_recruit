'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Settings, Save, Globe, Mail, Shield } from 'lucide-react'

export default function AdminConfiguracoes() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Configurações</h1>
            <p className="text-sm text-[#708090]">Configure a plataforma</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#8B0000]" />
                Geral
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1">Nome do Site</label>
                  <input type="text" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" value="ZENTHOS" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1">Email de Contato</label>
                  <input type="email" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" value="contato@zenthos.com.br" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#8B0000]" />
                Segurança
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" defaultChecked />
                  <span className="text-sm text-[#2D343A]">Permitir novos cadastros</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" />
                  <span className="text-sm text-[#2D343A]">Exigir autenticação em dois fatores</span>
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
