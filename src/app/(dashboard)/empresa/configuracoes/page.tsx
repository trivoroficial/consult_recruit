'use client'

import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Settings, Save, Building2, Mail, Phone } from 'lucide-react'

export default function EmpresaConfiguracoes() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarEmpresa />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Configurações</h1>
            <p className="text-sm text-[#708090]">Configurações da sua empresa</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#8B0000]" />
              Dados da Empresa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1">Razão Social</label>
                <input type="text" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" placeholder="Sua empresa" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1">CNPJ</label>
                <input type="text" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#708090]" /> Email
                </label>
                <input type="email" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" placeholder="contato@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#708090]" /> Telefone
                </label>
                <input type="text" className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
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
