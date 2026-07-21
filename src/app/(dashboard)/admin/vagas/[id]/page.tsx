'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Briefcase, MapPin, Calendar, Users, Building2,
  Edit, Trash2, CheckCircle, XCircle, Clock, Star, Lock,
  DollarSign, FileText, MessageCircle, Share2, Eye
} from 'lucide-react'

export default function VisualizarVaga() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [vaga, setVaga] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) {
      const vagas = JSON.parse(saved)
      const found = vagas.find((v: any) => v.id === parseInt(id))
      setVaga(found || null)
    }
    setLoading(false)
  }, [id])

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      const saved = localStorage.getItem('zenthos_vagas')
      if (saved) {
        const vagas = JSON.parse(saved)
        const updated = vagas.filter((v: any) => v.id !== parseInt(id))
        localStorage.setItem('zenthos_vagas', JSON.stringify(updated))
        router.push('/admin/vagas')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Briefcase className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Vaga não encontrada</h2>
          <p className="text-[#708090]">A vaga que você está procurando não existe.</p>
          <button 
            onClick={() => router.push('/admin/vagas')}
            className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2"
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
              className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2"
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
            
            {/* CARD PRINCIPAL */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center text-[#8B0000] text-3xl font-bold">
                    {vaga.titulo.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#2D343A]">{vaga.titulo}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        vaga.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                        vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                        vaga.status === 'Pausada' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {vaga.status || 'Aberta'}
                      </span>
                      {vaga.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs text-white ${vaga.corBadge || 'bg-purple-500'}`}>
                          {vaga.badge}
                        </span>
                      )}
                      {vaga.exibirCarrossel && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">
                          <Star className="h-3 w-3 fill-yellow-500" /> Destaque
                        </span>
                      )}
                      {vaga.confidencial && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">
                          <Lock className="h-3 w-3" /> Confidencial
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Building2 className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Empresa</p>
                      <p className="font-medium text-[#2D343A]">
                        {vaga.confidencial ? 'Confidencial' : vaga.empresa}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Localização</p>
                      <p className="font-medium text-[#2D343A]">{vaga.local || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <DollarSign className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Tipo</p>
                      <p className="font-medium text-[#2D343A]">{vaga.tipo || 'CLT'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Users className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Candidatos</p>
                      <p className="font-medium text-[#2D343A]">{vaga.candidatos || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Descrição da Vaga</h3>
                  <p className="text-[#708090] text-sm">
                    {vaga.descricao || 'Nenhuma descrição cadastrada para esta vaga.'}
                  </p>
                </div>

                <div className="mt-4 p-4 border border-[#E8EAE0] rounded-lg">
                  <h3 className="font-semibold text-[#2D343A] mb-2">Requisitos</h3>
                  <p className="text-[#708090] text-sm">
                    {vaga.requisitos || 'Nenhum requisito cadastrado.'}
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
                    <span className="text-[#708090]">Publicada: {new Date().toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Status: {vaga.status || 'Aberta'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Eye className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Visualizações: {vaga.visualizacoes || 0}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Candidatos</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#708090]">Total de candidatos</span>
                    <span className="font-bold text-[#8B0000]">{vaga.candidatos || 0}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-[#708090]">Em análise</span>
                    <span className="font-medium text-[#2D343A]">{Math.floor((vaga.candidatos || 0) * 0.3)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-[#708090]">Aprovados</span>
                    <span className="font-medium text-green-600">{Math.floor((vaga.candidatos || 0) * 0.1)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    Ver Candidatos
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartilhar Vaga
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Gerar Relatório
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
