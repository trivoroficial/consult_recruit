'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, Briefcase, Building2, MapPin, Calendar,
  DollarSign, Clock, Users, Edit, Trash2, CheckCircle,
  XCircle, FileText, Tag, Eye
} from 'lucide-react'
import { buscarVagaPorId, excluirVaga } from '@/actions/vagas'

export default function VisualizarVaga() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [vaga, setVaga] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarVaga()
  }, [id])

  const carregarVaga = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarVagaPorId(parseInt(id))
      if (result.success) {
        setVaga(result.data)
      } else {
        setError(result.error || 'Vaga não encontrada')
      }
    } catch (err) {
      setError('Erro ao carregar vaga')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return
    try {
      const result = await excluirVaga(parseInt(id))
      if (result.success) {
        router.push('/admin/vagas')
      } else {
        alert(result.error || 'Erro ao excluir vaga')
      }
    } catch (error) {
      alert('Erro ao excluir vaga')
    }
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

  if (!vaga || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Briefcase className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Vaga não encontrada</h2>
          <p className="text-[#708090]">{error || 'A vaga que você está procurando não existe.'}</p>
          <button
            onClick={() => router.push('/admin/vagas')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Vagas
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
              onClick={() => router.push('/admin/vagas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{vaga.titulo}</h1>
              <p className="text-sm text-[#708090]">Detalhes da vaga</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/admin/vagas/${id}/editar`)}
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
            {/* Cabeçalho da Vaga */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-[#2D343A]">{vaga.titulo}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                    vaga.status === 'Fechada' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vaga.status || 'Aberta'}
                  </span>
                  {vaga.badge && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: vaga.cor_badge || '#6B1A2A' }}
                    >
                      {vaga.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-[#708090]">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {vaga.empresa || 'Não informada'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {vaga.local || 'Remoto'}
                  </span>
                  {vaga.tipo && (
                    <span className="px-2 py-0.5 bg-[#F8F4E6] rounded-full text-xs">
                      {vaga.tipo}
                    </span>
                  )}
                </div>
              </div>
              {vaga.exibir_carrossel && (
                <span className="px-3 py-1 bg-[#6B1A2A]/10 rounded-full text-xs text-[#6B1A2A] font-medium flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  Em Destaque
                </span>
              )}
            </div>

            {/* Informações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {vaga.salario_inicial && (
                <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                  <DollarSign className="h-5 w-5 text-[#6B1A2A]" />
                  <div>
                    <p className="text-sm text-[#708090]">Salário</p>
                    <p className="font-medium text-[#2D343A]">
                      R$ {vaga.salario_inicial.toLocaleString('pt-BR')}
                      {vaga.salario_final && ` - R$ ${vaga.salario_final.toLocaleString('pt-BR')}`}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Criada em</p>
                  <p className="font-medium text-[#2D343A]">
                    {new Date(vaga.created_at || Date.now()).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Users className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Candidatos</p>
                  <p className="font-medium text-[#2D343A]">{vaga.candidatos || '0'}</p>
                </div>
              </div>
            </div>

            {/* Descrição */}
            {vaga.descricao && (
              <div className="mb-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6B1A2A]" />
                  Descrição da Vaga
                </h3>
                <p className="text-[#708090] text-sm whitespace-pre-wrap">
                  {vaga.descricao}
                </p>
              </div>
            )}

            {/* Requisitos */}
            {vaga.requisitos && (
              <div className="mb-4 p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#6B1A2A]" />
                  Requisitos
                </h3>
                <ul className="list-disc list-inside text-[#708090] text-sm space-y-1">
                  {vaga.requisitos.split('\n').map((item: string, index: number) => (
                    item.trim() && <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefícios */}
            {vaga.beneficios && (
              <div className="p-4 border border-[#E8EAE0] rounded-lg">
                <h3 className="font-semibold text-[#2D343A] mb-2 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-[#6B1A2A]" />
                  Benefícios
                </h3>
                <ul className="list-disc list-inside text-[#708090] text-sm space-y-1">
                  {vaga.beneficios.split('\n').map((item: string, index: number) => (
                    item.trim() && <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
