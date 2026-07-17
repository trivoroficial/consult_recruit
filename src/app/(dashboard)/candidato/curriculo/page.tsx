'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FileText, Upload, Download, Trash2 } from 'lucide-react'

export default function CandidatoCurriculo() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Currículo</h1>
            <p className="text-sm text-[#708090]">Gerencie seu currículo</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Enviar Currículo
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-[#8B0000]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2D343A]">Nenhum currículo enviado</h3>
              <p className="text-sm text-[#708090] mt-1">Envie seu currículo em PDF ou DOCX</p>
              <button className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
                Enviar Currículo
              </button>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
