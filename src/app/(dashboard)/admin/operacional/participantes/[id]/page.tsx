'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, User, Phone, MapPin, Briefcase, 
  Edit, Trash2, Calendar, FileText, Building2,
  DollarSign, GraduationCap, Clock, CheckCircle,
  XCircle, MessageCircle, UserCheck, UserPlus,
  Mail, Home, Award, TrendingUp, UsersRound
} from 'lucide-react'
import { listarParticipantes, excluirParticipante } from '@/actions/operacional'

export default function VisualizarParticipante() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [participante, setParticipante] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarParticipante()
  }, [id])

  const carregarParticipante = async () => {
    setLoading(true)
    setError(null)
    try {
      // Buscar todos e filtrar pelo ID (já que não temos buscarParticipantePorId)
      const result = await listarParticipantes()
      if (result.success) {
        const found = result.data?.find((p: any) => p.id === parseInt(id))
        if (found) {
          setParticipante(found)
        } else {
          setError('Participante não encontrado')
        }
      } else {
        setError(result.error || 'Erro ao carregar participante')
      }
    } catch (err) {
      setError('Erro ao carregar participante')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este participante?')) return

    try {
      const result = await excluirParticipante(parseInt(id))
      if (result.success) {
        router.push('/admin/operacional/participantes')
      } else {
        alert(result.error || 'Erro ao excluir participante')
      }
    } catch (error) {
      alert('Erro ao excluir participante')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <UsersRound className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando participante...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!participante || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <UsersRound className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Participante não encontrado</h2>
          <p className="text-[#708090]">{error || 'O participante que você está procurando não existe.'}</p>
          <button 
            onClick={() => router.push('/admin/operacional/participantes')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Participantes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/operacional/participantes')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{participante.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes do participante operacional</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/operacional/participantes/${id}/editar`)}
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
                    {participante.nome?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D343A]">{participante.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[#708090]">• Cargo: <span className="font-medium text-[#2D343A]">{participante.cargo_pretendido || 'Não informado'}</span></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Phone className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Telefone</p>
                      <p className="font-medium text-[#2D343A]">{participante.telefone || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Localização</p>
                      <p className="font-medium text-[#2D343A]">{participante.cidade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Building2 className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Empresa Atual</p>
                      <p className="font-medium text-[#2D343A]">{participante.empresa_atual || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <DollarSign className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Último Salário</p>
                      <p className="font-medium text-[#2D343A]">{participante.ultimo_salario || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <GraduationCap className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Escolaridade</p>
                      <p className="font-medium text-[#2D343A]">{participante.escolaridade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Clock className="h-5 w-5 text-[#6B1A2A]" />
                    <div>
                      <p className="text-sm text-[#708090]">Disponibilidade</p>
                      <p className="font-medium text-[#2D343A]">{participante.disponibilidade || 'Não informado'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Experiência</h3>
                  <p className="text-[#708090] text-sm">
                    {participante.experiencia || 'Nenhuma experiência cadastrada.'}
                  </p>
                </div>

                <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Observações</h3>
                  <p className="text-[#708090] text-sm">
                    {participante.observacoes || 'Nenhuma observação cadastrada.'}
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Informações</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Cadastro: {new Date(participante.created_at || Date.now()).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Cargo: {participante.cargo_pretendido || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Home className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Bairro: {participante.bairro || 'Não informado'}</span>
                  </div>
                  {participante.cpf && (
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="h-4 w-4 text-[#708090]" />
                      <span className="text-[#708090]">CPF: {participante.cpf}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Origem</h4>
                  <span className="text-sm text-[#708090]">{participante.origem === 'manual' ? 'Cadastro manual' : participante.origem || 'Manual'}</span>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Entrar em Contato
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Adicionar ao Processo
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Ver Histórico
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
