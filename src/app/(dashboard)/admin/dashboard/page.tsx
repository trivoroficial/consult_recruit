'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Building2, Briefcase, TrendingUp, Bell
} from 'lucide-react'

const dadosAdmin = {
  usuarios: 245,
  empresas: 32,
  vagas: 18,
  receita: 98500,
  processos: [
    { id: 1, vaga: 'Analista Administrativo', empresa: 'XPTO', status: 'Entrevista', candidatos: 8 },
    { id: 2, vaga: 'Auxiliar de RH', empresa: 'ABC', status: 'Triagem', candidatos: 15 },
    { id: 3, vaga: 'Assistente Financeiro', empresa: 'Financeira', status: 'Aprovado', candidatos: 3 },
  ]
}

const statusColors = {
  'Entrevista': 'bg-blue-100 text-blue-700',
  'Triagem': 'bg-yellow-100 text-yellow-700',
  'Aprovado': 'bg-green-100 text-green-700',
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      {/* CONTEÚDO */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Painel Administrativo</h1>
            <p className="text-sm text-[#708090]">Visão geral da plataforma</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-[#F8F4E6] transition">
            <Bell className="h-5 w-5 text-[#708090]" />
          </button>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.usuarios}</p>
                  <p className="text-sm text-[#708090]">Usuários</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.empresas}</p>
                  <p className="text-sm text-[#708090]">Empresas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">{dadosAdmin.vagas}</p>
                  <p className="text-sm text-[#708090]">Vagas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">R$ {dadosAdmin.receita.toLocaleString()}</p>
                  <p className="text-sm text-[#708090]">Receita</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Processos Seletivos</h2>
            <div className="space-y-3">
              {dadosAdmin.processos.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg">
                  <div>
                    <p className="font-semibold text-[#2D343A]">{item.vaga}</p>
                    <p className="text-sm text-[#708090]">{item.empresa}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[#708090]">{item.candidatos} candidatos</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
