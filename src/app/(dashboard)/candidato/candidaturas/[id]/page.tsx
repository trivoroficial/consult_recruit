'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { ArrowLeft, Briefcase, Building2, Calendar, CheckCircle, Clock, XCircle, FileText, User, Mail, Phone } from 'lucide-react'

export default function DetalhesCandidatura() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [candidatura, setCandidatura] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setCandidatura({
        id: parseInt(id),
        vaga: 'Analista Administrativo',
        empresa: 'ZENTHOS',
        status: 'Em análise',
        data: '10/07/2026',
        descricao: 'Processo seletivo para Analista Administrativo',
        etapas: [
          { nome: 'Currículo enviado', data: '10/07/2026', concluido: true },
          { nome: 'Em análise', data: '12/07/2026', concluido: true },
          { nome: 'Entrevista', data: '20/07/2026', concluido: false },
          { nome: 'Resultado final', data: '', concluido: false }
        ],
        contato: 'recrutamento@zenthos.com.br',
        telefone: '(34) 99185-0735'
      })
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <Briefcase className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando...</p>
          </div>
        </div>
        <DashboardFooter />
      </div>
    )
  }

  if (!candidatura) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <div className="flex-1 p-8">
          <button
            onClick={() => router.push('/candidato/candidaturas')}
            className="flex items-center gap-2 text-[#708090] hover:text-[#6B1A2A] transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
            <p className="text-[#708090]">Candidatura não encontrada</p>
          </div>
        </div>
        <DashboardFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <div className="flex-1 p-8">
        <button
          onClick={() => router.push('/candidato/candidaturas')}
          className="flex items-center gap-2 text-[#708090] hover:text-[#6B1A2A] transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Candidaturas
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{candidatura.vaga}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[#708090]">
                  <Building2 className="h-4 w-4" />
                  {candidatura.empresa}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  candidatura.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                  candidatura.status === 'Entrevista' ? 'bg-blue-100 text-blue-700' :
                  candidatura.status === 'Aprovado' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {candidatura.status}
                </span>
              </div>
              <p className="text-sm text-[#708090] mt-2">Candidatura em: {candidatura.data}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#708090]">Contato</p>
              <p className="text-sm font-medium text-[#2D343A] flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {candidatura.contato}
              </p>
              <p className="text-sm text-[#2D343A] flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {candidatura.telefone}
              </p>
            </div>
          </div>
        </div>

        {/* Etapas */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
          <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#6B1A2A]" />
            Etapas do Processo
          </h2>
          <div className="space-y-3">
            {candidatura.etapas.map((etapa: any, index: number) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-[#F8F4E6] rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  etapa.concluido ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                }`}>
                  {etapa.concluido ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${etapa.concluido ? 'text-[#2D343A]' : 'text-[#708090]'}`}>
                    {etapa.nome}
                  </p>
                  {etapa.data && (
                    <p className="text-xs text-[#708090]">{etapa.data}</p>
                  )}
                </div>
                {etapa.concluido ? (
                  <span className="text-xs text-green-600">Concluído</span>
                ) : (
                  <span className="text-xs text-[#708090]">Pendente</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  )
}
