'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Users, Search, Filter, Eye, Download, 
  User, Phone, MapPin, Briefcase, Award,
  ChevronRight, Calendar, CheckCircle, XCircle, Clock
} from 'lucide-react'

export default function OperacionalBancoTalentos() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const candidatos = [
    { 
      id: 1, 
      nome: 'Pedro Costa', 
      telefone: '(34) 77777-7777', 
      cidade: 'Uberlândia/MG',
      cargo: 'Soldador',
      processos: 2,
      data: '13/07/2026',
      status: 'disponivel',
      competencias: ['Soldagem MIG', 'Leitura de projetos', 'Segurança']
    },
    { 
      id: 2, 
      nome: 'Carlos Santos', 
      telefone: '(34) 66666-6666', 
      cidade: 'Uberlândia/MG',
      cargo: 'Operador de Máquinas',
      processos: 1,
      data: '10/07/2026',
      status: 'disponivel',
      competencias: ['Operação de CNC', 'Manutenção', 'Controle de qualidade']
    },
    { 
      id: 3, 
      nome: 'Mariana Lima', 
      telefone: '(34) 55555-5555', 
      cidade: 'Uberlândia/MG',
      cargo: 'Auxiliar de Produção',
      processos: 3,
      data: '05/07/2026',
      status: 'em_processo',
      competencias: ['Linha de produção', 'Boa comunicação', 'Trabalho em equipe']
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Banco de Talentos</h1>
            <p className="text-sm text-[#708090]">Profissionais disponíveis para novas oportunidades</p>
          </div>
          <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar talentos por nome, cargo ou competências..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidatos.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-lg transition hover:-translate-y-1 group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      {item.nome.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2D343A] group-hover:text-[#8B0000] transition">{item.nome}</h3>
                      <p className="text-sm text-[#708090]">{item.cargo}</p>
                    </div>
                  </div>
                  <Award className="h-5 w-5 text-[#8B0000]" />
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#708090]">
                    <Phone className="h-4 w-4" />
                    {item.telefone}
                  </div>
                  <div className="flex items-center gap-2 text-[#708090]">
                    <MapPin className="h-4 w-4" />
                    {item.cidade}
                  </div>
                  <div className="flex items-center gap-2 text-[#708090]">
                    <Briefcase className="h-4 w-4" />
                    {item.processos} processos
                  </div>
                  <div className="flex items-center gap-2 text-[#708090]">
                    <Calendar className="h-4 w-4" />
                    Desde {item.data}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {item.competencias.map((comp, index) => (
                    <span key={index} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs">
                      {comp}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#E8EAE0] flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'disponivel' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status === 'disponivel' ? 'Disponível' : 'Em processo'}
                  </span>
                  <button 
                    onClick={() => router.push(`/admin/operacional/participantes/${item.id}`)}
                    className="text-[#8B0000] hover:text-[#700000] font-medium text-sm flex items-center gap-1"
                  >
                    Ver perfil <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
