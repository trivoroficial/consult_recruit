'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, User, Mail, Phone, MapPin, Briefcase, 
  Edit, Trash2, Calendar, Star, Award, FileText,
  MessageCircle, CheckCircle, XCircle, Clock, TrendingUp,
  UserCheck, UserX, Send, Download
} from 'lucide-react'
import { buscarCandidatoPorId, excluirCandidato } from '@/actions/candidatos'

export default function VisualizarCandidato() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [candidato, setCandidato] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarCandidato()
  }, [id])

  const carregarCandidato = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarCandidatoPorId(parseInt(id))
      if (result.success) {
        setCandidato(result.data)
      } else {
        setError(result.error || 'Candidato não encontrado')
      }
    } catch (err) {
      setError('Erro ao carregar candidato')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este candidato?')) return

    try {
      const result = await excluirCandidato(parseInt(id))
      if (result.success) {
        router.push('/admin/candidatos')
      } else {
        alert(result.error || 'Erro ao excluir candidato')
      }
    } catch (error) {
      alert('Erro ao excluir candidato')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Disponível': 'bg-green-100 text-green-700',
      'Em processo': 'bg-yellow-100 text-yellow-700',
      'Contratado': 'bg-blue-100 text-blue-700',
      'Inativo': 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'Disponível': CheckCircle,
      'Em processo': Clock,
      'Contratado': UserCheck,
      'Inativo': UserX
    }
    return icons[status] || Clock
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <User className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando candidato...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!candidato || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <User className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Candidato não encontrado</h2>
          <p className="text-[#708090]">{error || 'O candidato que você está procurando não existe.'}</p>
          <button 
            onClick={() => router.push('/admin/candidatos')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Candidatos
          </button>
        </div>
      </div>
    )
  }

  const StatusIcon = getStatusIcon(candidato.status)

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/candidatos')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{candidato.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes do candidato</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/candidatos/${id}/editar`)}
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
            
            {/* COLUNA PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A] text-3xl font-bold">
                    {candidato.nome?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D343A]">{candidato.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidato.status)} flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {candidato.status || 'Disponível'}
                      </span>
                      <span className="text-sm text-[#708090]">• Score: <span className="font-bold text-[#6B1A2A]">{candidato.score || 0}%</span></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Localização</p>
                      <p className="font-medium text-[#2D343A]">{candidato.cidade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cadastro</p>
                      <p className="font-medium text-[#2D343A]">{new Date(candidato.created_at || Date.now()).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cargo Pretendido</p>
                      <p className="font-medium text-[#2D343A]">{candidato.cargo || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Award className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Competências</p>
                      <p className="font-medium text-[#2D343A]">{candidato.competencias || 'Não informado'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Experiência</h3>
                  <p className="text-[#708090] text-sm">
                    {candidato.experiencia || 'Nenhuma experiência cadastrada.'}
                  </p>
                </div>

                <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Resumo</h3>
                  <p className="text-[#708090] text-sm">
                    {candidato.resumo || 'Nenhum resumo cadastrado.'}
                  </p>
                </div>

                {/* SCORE */}
                <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#6B1A2A]" />
                    Score de Compatibilidade
                  </h3>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#708090]">0%</span>
                      <span className="text-xs text-[#708090]">100%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-[#F8F4E6]">
                      <div 
                        style={{ width: `${candidato.score || 0}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000 ${
                          (candidato.score || 0) >= 70 ? 'bg-green-500' :
                          (candidato.score || 0) >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-[#6B1A2A]" />
                      <span className="text-sm font-bold text-[#6B1A2A]">{candidato.score || 0}% Compatível</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Contato</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{candidato.email || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{candidato.telefone || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MessageCircle className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">WhatsApp: {candidato.whatsapp || 'Não informado'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Status Atual</h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      candidato.status === 'Disponível' ? 'bg-green-500' :
                      candidato.status === 'Em processo' ? 'bg-yellow-500' :
                      candidato.status === 'Contratado' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-sm text-[#708090]">{candidato.status || 'Disponível'}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Entrar em Contato
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Ver Currículo
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Baixar Currículo
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
