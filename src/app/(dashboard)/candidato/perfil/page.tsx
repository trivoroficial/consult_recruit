'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { User, Mail, Phone, MapPin, Briefcase, Save } from 'lucide-react'

export default function CandidatoPerfil() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Meu Perfil</h1>
            <p className="text-sm text-[#708090]">Gerencie suas informações</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] text-3xl font-bold">
                J
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#2D343A]">João Silva</h2>
                <p className="text-[#708090]">Candidato</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <User className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="text-xs text-[#708090]">Nome</p>
                  <p className="font-medium text-[#2D343A]">João Silva</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Mail className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="text-xs text-[#708090]">Email</p>
                  <p className="font-medium text-[#2D343A]">joao@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Phone className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="text-xs text-[#708090]">Telefone</p>
                  <p className="font-medium text-[#2D343A]">(34) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <MapPin className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="text-xs text-[#708090]">Localização</p>
                  <p className="font-medium text-[#2D343A]">Uberlândia/MG</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg md:col-span-2">
                <Briefcase className="h-5 w-5 text-[#8B0000]" />
                <div>
                  <p className="text-xs text-[#708090]">Cargo Desejado</p>
                  <p className="font-medium text-[#2D343A]">Analista Administrativo</p>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
              <Save className="h-5 w-5" />
              Atualizar Perfil
            </button>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
