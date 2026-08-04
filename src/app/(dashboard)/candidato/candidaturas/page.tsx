'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, CheckCircle, Clock, XCircle, Calendar, ChevronRight, Eye, Building2 } from 'lucide-react'

export default function CandidatoCandidaturas() {
  const router = useRouter()

  const [candidaturas] = useState([
    { 
      id: 1, 
      vaga: 'Analista Administrativo', 
      empresa: 'ZENTHOS', 
      status: 'Em análise', 
      data: '10/07/2026',
      etapas: ['Currículo enviado', 'Em análise', 'Aguardando entrevista']
    },
    { 
      id: 2, 
      vaga: 'Desenvolvedor Full Stack', 
      empresa: 'Tech Corp', 
      status: 'Entrevista', 
      data: '05/07/2026',
      etapas: ['Currículo enviado', 'Triagem', 'Entrevista agendada']
    },
    { 
      id: 3, 
      vaga: 'Analista de RH', 
      empresa: 'RH Solutions', 
      status: 'Aprovado', 
      data: '01/07/2026',
      etapas: ['Currículo enviado', 'Triagem', 'Entrevista', 'Aprovado']
    },
  ])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Em análise': 'bg-yellow-100 text-yellow-700',
      'Entrevista': 'bg-blue-100 text-blue-700',
      'Aprovado': 'bg-green-100 text-green-700',
      'Reprovado': 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'Em análise': Clock,
      'Entrevista': Calendar,
      'Aprovado': CheckCircle,
      'Reprovado': XCircle
    }
    return icons[status] || Clock
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-[#6B1A2A]" />
            Minhas Candidaturas
          </h1>
          <p className="text-sm text-[#708090]">Acompanhe o status das suas candidaturas e próximas etapas</p>
        </div>

        {candidaturas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Você ainda não se candidatou a nenhuma vaga</p>
            <button
              onClick={() => router.push('/candidato/vagas')}
              className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
            >
              Buscar Vagas
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {candidaturas.map((item) => {
              const StatusIcon = getStatusIcon(item.status)
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-[#2D343A]">{item.vaga}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)} flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#708090]">{item.empresa}</p>
                      <p className="text-xs text-[#708090] mt-1">Candidatura em: {item.data}</p>

                      {/* Etapas do processo */}
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-[#708090] uppercase tracking-wider">Status do Processo</p>
                        <div className="flex flex-wrap items-center gap-1 mt-2">
                          {item.etapas.map((etapa, index) => (
                            <div key={index} className="flex items-center">
                              <span className={`px-3 py-1 rounded-full text-xs ${
                                index < item.etapas.length - 1 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-[#F8F4E6] text-[#708090]'
                              }`}>
                                {etapa}
                              </span>
                              {index < item.etapas.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-[#708090]" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/candidato/candidaturas/${item.id}`)}
                      className="px-4 py-2 bg-[#F8F4E6] text-[#2D343A] rounded-lg hover:bg-[#E8EAE0] transition text-sm flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Detalhes
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  )
}
