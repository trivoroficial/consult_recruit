'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, Calendar, Clock, MapPin, User, Tag,
  FileText, Edit, Trash2, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import { buscarEventoPorId, excluirEvento } from '@/actions/agenda'

export default function VisualizarEvento() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [evento, setEvento] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarEvento()
  }, [id])

  const carregarEvento = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarEventoPorId(parseInt(id))
      if (result.success) {
        setEvento(result.data)
      } else {
        setError(result.error || 'Evento não encontrado')
      }
    } catch (err) {
      setError('Erro ao carregar evento')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return
    try {
      const result = await excluirEvento(parseInt(id))
      if (result.success) {
        router.push('/admin/agenda')
      } else {
        alert(result.error || 'Erro ao excluir evento')
      }
    } catch (error) {
      alert('Erro ao excluir evento')
    }
  }

  const getTipoInfo = (tipo: string) => {
    const labels: Record<string, { label: string; color: string; icon: any }> = {
      'compromisso': { label: 'Compromisso', color: 'bg-blue-100 text-blue-700', icon: Calendar },
      'entrevista': { label: 'Entrevista', color: 'bg-green-100 text-green-700', icon: User },
      'reuniao': { label: 'Reunião', color: 'bg-purple-100 text-purple-700', icon: Users },
      'outro': { label: 'Outro', color: 'bg-gray-100 text-gray-700', icon: Tag }
    }
    return labels[tipo] || { label: tipo, color: 'bg-gray-100 text-gray-700', icon: Tag }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#6B1A2A] text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!evento || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Calendar className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Evento não encontrado</h2>
          <p className="text-[#708090]">{error || 'O evento que você está procurando não existe.'}</p>
          <button
            onClick={() => router.push('/admin/agenda')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Agenda
          </button>
        </div>
      </div>
    )
  }

  const tipoInfo = getTipoInfo(evento.tipo)
  const TipoIcon = tipoInfo.icon

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/agenda')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{evento.titulo}</h1>
              <p className="text-sm text-[#708090]">Detalhes do evento</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/admin/agenda/${id}/editar`)}
              className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            {/* Status */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${tipoInfo.color} flex items-center gap-1`}>
                <TipoIcon className="h-4 w-4" />
                {tipoInfo.label}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                evento.status === 'confirmado' ? 'bg-green-100 text-green-700' :
                evento.status === 'cancelado' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {evento.status || 'Pendente'}
              </span>
              <span className="text-sm text-[#708090]">
                #{evento.id}
              </span>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Data</p>
                  <p className="font-medium text-[#2D343A]">
                    {new Date(evento.data).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Clock className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Horário</p>
                  <p className="font-medium text-[#2D343A]">
                    {evento.hora_inicio || '-'}
                    {evento.hora_fim && ` - ${evento.hora_fim}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Local</p>
                  <p className="font-medium text-[#2D343A]">{evento.local || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <User className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Responsável</p>
                  <p className="font-medium text-[#2D343A]">{evento.responsavel || 'Não informado'}</p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {evento.descricao && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6B1A2A]" />
                  Descrição
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {evento.descricao}
                </p>
              </div>
            )}

            {/* Observações */}
            {evento.observacoes && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#6B1A2A]" />
                  Observações
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {evento.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
