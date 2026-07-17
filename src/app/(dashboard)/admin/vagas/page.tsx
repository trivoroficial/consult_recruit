'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export default function AdminVagas() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Vagas</h1>
            <p className="text-sm text-[#708090]">Gerencie todas as vagas</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar vagas..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vaga</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E8EAE0]">
                    <td className="py-3 px-4 font-medium text-[#2D343A]">Analista Administrativo</td>
                    <td className="py-3 px-4 text-[#708090]">XPTO</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Aberta</span></td>
                    <td className="py-3 px-4 text-[#708090]">12</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                        <button className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                        <button className="p-1 hover:bg-[#F8F4E6] rounded"><Trash2 className="h-4 w-4 text-red-500" /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-[#708090]">
              <p>Mostrando 1 vaga</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
