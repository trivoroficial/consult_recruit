'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, FileText, Building2, User, Calendar,
  Users, Clock, Edit, Trash2, CheckCircle,
  XCircle, AlertCircle, BarChart3
} from 'lucide-react'
import { buscarProcessoPorId, excluirProcesso } from '@/actions/processos'

export default function VisualizarProcesso() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [processo, setProcesso] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarProcesso()
  }, [id])

  const carregarProcesso = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarProcessoPorId(parseInt(id))
      if (result.success) {
        setProcesso(result.data)
      } else {
        setError(result.error || 'Processo não encontrado')
      }
    } catch (err) {
      setError('Erro ao carregar processo')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este processo?')) return
    try {
      const result = await excluirProcesso(parseInt(id))
      if (result.success) {
        router.push('/admin/processos')
      } else {
        alert(result.error || 'Erro ao excluir processo')
      }
    } catch (error) {
      alert('Erro ao excluir processo')
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      'triagem': { label: 'Triagem', color: 'bg-yellow-100 text-yellow-700' },
      'entrevista': { label: 'Entrevista', color: 'bg-blue-100 text-blue-700' },
      'aprovado': { label: 'Aprovado', color: 'bg-green-100 text-green-700' },
      'encerrado': { label: 'Encerrado', color: 'bg-gray-100 text-gray-700' }
    }
    return labels[status] || { label: status, color: 'bg-gray-100 text-gray-700' }
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

  if (!processo || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Processo não encontrado</h2>
          <p className="text-[#708090]">{error || 'O processo que você está procurando não existe.'}</p>
          <button
            onClick={() => router.push('/admin/processos')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Processos
          </button>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusLabel(processo.status)

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/processos')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{processo.vaga}</h1>
              <p className="text-sm text-[#708090]">Detalhes do processo seletivo</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/admin/processos/${id}/editar`)}
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              <span className="text-sm text-[#708090]">
                {new Date(processo.created_at || Date.now()).toLocaleDateString('pt-BR')}
              </span>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Building2 className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Empresa</p>
                  <p className="font-medium text-[#2D343A]">{processo.empresa || 'Não informada'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <User className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Responsável</p>
                  <p className="font-medium text-[#2D343A]">{processo.responsavel || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Users className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Candidatos</p>
                  <p className="font-medium text-[#2D343A]">{processo.candidatos || '0'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Previsão de Fim</p>
                  <p className="font-medium text-[#2D343A]">
                    {processo.previsao_fim ? new Date(processo.previsao_fim).toLocaleDateString('pt-BR') : 'Não definida'}
                  </p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {processo.descricao && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6B1A2A]" />
                  Descrição
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {processo.descricao}
                </p>
              </div>
            )}

            {/* Observações */}
            {processo.observacoes && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-[#6B1A2A]" />
                  Observações
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {processo.observacoes}
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
