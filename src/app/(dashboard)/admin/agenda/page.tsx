'use client'

import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Calendar, Plus, Clock, User, Briefcase, MapPin, Edit, Trash2, Eye } from 'lucide-react'

export default function AdminAgenda() {
  const eventos = [
    { id: 1, titulo: 'Entrevista - Analista Administrativo', data: '20/07/2026', hora: '09:00', responsavel: 'João Silva', status: 'confirmado' },
    { id: 2, titulo: 'Reunião - Empresa XPTO', data: '20/07/2026', hora: '14:00', responsavel: 'Maria Santos', status: 'pendente' },
    { id: 3, titulo: 'Entrevista - Auxiliar de RH', data: '21/07/2026', hora: '10:30', responsavel: 'Pedro Costa', status: 'confirmado' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Agenda</h1>
            <p className="text-sm text-[#708090]">Gerencie seus compromissos e entrevistas</p>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Evento
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#8B0000]">{eventos.length}</p>
              <p className="text-sm text-[#708090]">Eventos Hoje</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#8B0000]">3</p>
              <p className="text-sm text-[#708090]">Esta Semana</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#8B0000]">12</p>
              <p className="text-sm text-[#708090]">Este Mês</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#8B0000]" />
              Próximos Eventos
            </h2>
            <div className="space-y-3">
              {eventos.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                      <Clock className="h-5 w-5 text-[#8B0000]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D343A]">{item.titulo}</p>
                      <p className="text-sm text-[#708090]">{item.data} às {item.hora}</p>
                      <p className="text-sm text-[#708090]">Responsável: {item.responsavel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                      <button className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                      <button className="p-1 hover:bg-[#F8F4E6] rounded"><Trash2 className="h-4 w-4 text-red-500" /></button>
                    </div>
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
