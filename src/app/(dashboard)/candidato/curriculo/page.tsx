'use client'

import { useState } from 'react'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { FileText, Upload, Download, Eye, Plus, Trash2, CheckCircle } from 'lucide-react'

export default function CandidatoCurriculo() {
  const [curriculos, setCurriculos] = useState([
    { id: 1, nome: 'Curriculo_Joao_Silva.pdf', data: '10/07/2026', tamanho: '245 KB' }
  ])

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#6B1A2A]" />
            Meu Currículo
          </h1>
          <p className="text-sm text-[#708090]">Gerencie seus currículos e documentos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-md transition">
            <div className="border-2 border-dashed border-[#E8EAE0] rounded-xl p-8 text-center hover:border-[#6B1A2A] transition">
              <Upload className="h-12 w-12 text-[#708090] mx-auto mb-4" />
              <p className="text-sm font-medium text-[#2D343A]">Envie seu currículo</p>
              <p className="text-xs text-[#708090] mt-1">PDF, DOC ou DOCX (máx. 5MB)</p>
              <button className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition text-sm">
                <Plus className="h-4 w-4 inline mr-1" />
                Selecionar Arquivo
              </button>
            </div>
          </div>

          {/* Lista de Currículos */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <h3 className="font-semibold text-[#2D343A] mb-4">Meus Currículos</h3>
            {curriculos.length === 0 ? (
              <p className="text-center text-[#708090] py-8">Nenhum currículo cadastrado</p>
            ) : (
              <div className="space-y-3">
                {curriculos.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-[#F8F4E6] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#6B1A2A]" />
                      <div>
                        <p className="font-medium text-[#2D343A]">{item.nome}</p>
                        <p className="text-xs text-[#708090]">{item.data} • {item.tamanho}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-[#E8EAE0] rounded-lg transition" title="Visualizar">
                        <Eye className="h-4 w-4 text-[#708090]" />
                      </button>
                      <button className="p-2 hover:bg-[#E8EAE0] rounded-lg transition" title="Baixar">
                        <Download className="h-4 w-4 text-[#708090]" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition" title="Excluir">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
