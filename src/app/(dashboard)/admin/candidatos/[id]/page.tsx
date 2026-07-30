'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, Users, Mail, Phone, MapPin, Briefcase,
  GraduationCap, Star, Clock, Edit, Trash2, CheckCircle,
  XCircle, UserCheck, UserX, Calendar, Award
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

  if (!candidato || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Users className="h-16 w-16 text-[#708090] mb-4" />
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
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            {/* Cabeçalho do Candidato */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#6B1A2A]/10 rounded-2xl flex items-center justify-center text-[#6B1A2A] text-3xl font-bold">
                {candidato.nome?.charAt(0) || 'C'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#2D343A]">{candidato.nome}</h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidato.status)}`}>
                    {candidato.status || 'Disponível'}
                  </span>
                  {candidato.cargo && (
                    <span className="px-2 py-0.5 bg-[#F8F4E6] rounded-full text-xs text-[#708090]">
                      {candidato.cargo}
                    </span>
                  )}
                  {candidato.score !== undefined && (
                    <span className="px-2 py-0.5 bg-[#6B1A2A]/10 rounded-full text-xs text-[#6B1A2A] font-medium">
                      Score: {candidato.score || 0}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Mail className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Email</p>
                  <p className="font-medium text-[#2D343A]">{candidato.email || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Phone className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Telefone</p>
                  <p className="font-medium text-[#2D343A]">{candidato.telefone || candidato.whatsapp || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Localização</p>
                  <p className="font-medium text-[#2D343A]">
                    {candidato.cidade || 'Não informado'}
                    {candidato.estado && ` - ${candidato.estado}`}
                  </p>
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
                <GraduationCap className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Escolaridade</p>
                  <p className="font-medium text-[#2D343A]">{candidato.escolaridade || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Clock className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Cadastro</p>
                  <p className="font-medium text-[#2D343A]">
                    {new Date(candidato.created_at || Date.now()).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Experiência */}
            {candidato.experiencia && (
              <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#6B1A2A]" />
                  Experiência Profissional
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {candidato.experiencia}
                </p>
              </div>
            )}

            {/* Competências */}
            {candidato.competencias && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#6B1A2A]" />
                  Competências
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidato.competencias.split(',').map((comp: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-[#F8F4E6] rounded-full text-sm text-[#2D343A]">
                      {comp.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Resumo */}
            {candidato.resumo && (
              <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2">Resumo</h3>
                <p className="text-[#708090] text-sm">{candidato.resumo}</p>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
