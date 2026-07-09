'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { Briefcase, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react'

const candidaturas = [
  { id: 1, vaga: 'Analista Administrativo', empresa: 'Empresa XPTO', status: 'Entrevista', data: '09/07/2026', descricao: 'Entrevista agendada para amanhã às 14h' },
  { id: 2, vaga: 'Auxiliar de RH', empresa: 'Indústria ABC', status: 'Análise', data: '08/07/2026', descricao: 'Currículo em análise pela equipe de RH' },
  { id: 3, vaga: 'Assistente Financeiro', empresa: 'Grupo Financeiro', status: 'Aprovado', data: '05/07/2026', descricao: 'Parabéns! Você foi aprovado para a próxima etapa' },
  { id: 4, vaga: 'Supervisor de Produção', empresa: 'Indústria XYZ', status: 'Encerrado', data: '01/07/2026', descricao: 'Processo encerrado - candidato não selecionado' },
]

const statusConfig = {
  'Entrevista': { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
  'Análise': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  'Aprovado': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  'Encerrado': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
}

export default function CandidaturasCandidato() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Minhas <span className="text-purple-600">Candidaturas</span>
          </h1>
          <span className="text-sm text-gray-500">Total: {candidaturas.length}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {candidaturas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Você ainda não se candidatou a nenhuma vaga.</p>
          ) : (
            <div className="space-y-4">
              {candidaturas.map((item) => {
                const config = statusConfig[item.status as keyof typeof statusConfig] || { icon: Briefcase, color: 'text-gray-600', bg: 'bg-gray-100' }
                const Icon = config.icon
                return (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 ${config.bg} rounded-lg`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.vaga}</h3>
                        <p className="text-sm text-gray-500">{item.empresa}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.descricao}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        {item.status}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">{item.data}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
