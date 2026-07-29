'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, FileText, Building2, MapPin, Calendar, Users,
  Edit, Trash2, CheckCircle, XCircle, Clock, Briefcase,
  User, Award, TrendingUp, AlertCircle, Download, Printer
} from 'lucide-react'
import { buscarProcessoOperacionalPorId, excluirProcessoOperacional } from '@/actions/operacional'

export default function VisualizarProcessoOperacional() {
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
      const result = await buscarProcessoOperacionalPorId(parseInt(id))
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
      const result = await excluirProcessoOperacional(parseInt(id))
      if (result.success) {
        router.push('/admin/operacional/processos')
      } else {
        alert(result.error || 'Erro ao excluir processo')
      }
    } catch (error) {
      alert('Erro ao excluir processo')
    }
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'ativo': { label: 'Ativo', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'pausado': { label: 'Pausado', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      'concluido': { label: 'Concluído', color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      'cancelado': { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: XCircle }
    }
    return configs[status] || configs['ativo']
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando processo...</p>
          </div>
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
            onClick={() => router.push('/admin/operacional/processos')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Processos
          </button>
        </div>
      </div>
    )
  }

  const statusConfig = getStatusConfig(processo.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/operacional/processos')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{processo.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes do processo operacional</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/operacional/processos/${id}/editar`)}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#6B1A2A]/10 rounded-2xl flex items-center justify-center text-[#6B1A2A] text-3xl font-bold">
                    {processo.nome?.charAt(0) || 'P'}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#2D343A]">{processo.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </span>
                      <span className="text-sm text-[#708090]">• {processo.empresa}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Building2 className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Empresa</p>
                      <p className="font-medium text-[#2D343A]">{processo.empresa}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cidade</p>
                      <p className="font-medium text-[#2D343A]">{processo.cidade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Users className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Vagas</p>
                      <p className="font-medium text-[#2D343A]">{processo.vagas || 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cargo</p>
                      <p className="font-medium text-[#2D343A]">{processo.cargo || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Data de Início</p>
                      <p className="font-medium text-[#2D343A]">{processo.data_inicio ? new Date(processo.data_inicio).toLocaleDateString('pt-BR') : 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <User className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Responsável</p>
                      <p className="font-medium text-[#2D343A]">{processo.responsavel || 'Não informado'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Observações</h3>
                  <p className="text-[#708090] text-sm">
                    {processo.observacoes || 'Nenhuma observação cadastrada.'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Informações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">ID: #{processo.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Criado em: {new Date(processo.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Tipo: {processo.tipo_contratacao || 'CLT'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Consultor</h4>
                  <p className="text-sm text-[#708090]">{processo.consultor || 'Não informado'}</p>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    Ver Candidatos
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Relatório
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
