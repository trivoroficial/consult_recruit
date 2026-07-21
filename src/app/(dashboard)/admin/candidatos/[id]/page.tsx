'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, User, MapPin, Calendar, Briefcase, Mail, 
  Phone, FileText, Star, Award, Edit, Trash2, CheckCircle,
  XCircle, Clock, TrendingUp, MessageCircle
} from 'lucide-react'

export default function VisualizarCandidato() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [candidato, setCandidato] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_candidatos')
    if (saved) {
      const candidatos = JSON.parse(saved)
      const found = candidatos.find((c: any) => c.id === parseInt(id))
      setCandidato(found || null)
    }
    setLoading(false)
  }, [id])

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este candidato?')) {
      const saved = localStorage.getItem('zenthos_candidatos')
      if (saved) {
        const candidatos = JSON.parse(saved)
        const updated = candidatos.filter((c: any) => c.id !== parseInt(id))
        localStorage.setItem('zenthos_candidatos', JSON.stringify(updated))
        router.push('/admin/candidatos')
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

  if (!candidato) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <User className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Candidato não encontrado</h2>
          <p className="text-[#708090]">O candidato que você está procurando não existe.</p>
          <button 
            onClick={() => router.push('/admin/candidatos')}
            className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2"
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] text-3xl font-bold">
                    {candidato.nome.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D343A]">{candidato.nome}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        candidato.status === 'Disponível' ? 'bg-green-100 text-green-700' :
                        candidato.status === 'Em processo' ? 'bg-yellow-100 text-yellow-700' :
                        candidato.status === 'Contratado' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {candidato.status || 'Disponível'}
                      </span>
                      <span className="text-sm text-[#708090]">• Score: <span className="font-bold text-[#8B0000]">{candidato.score || 0}%</span></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Localização</p>
                      <p className="font-medium text-[#2D343A]">{candidato.cidade || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Calendar className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cadastro</p>
                      <p className="font-medium text-[#2D343A]">{new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#8B0000]" />
                    <div>
                      <p className="text-sm text-[#708090]">Cargo Pretendido</p>
                      <p className="font-medium text-[#2D343A]">{candidato.cargo || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                    <Award className="h-5 w-5 text-[#8B0000]" />
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

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Score de Compatibilidade</h4>
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#708090]">0%</span>
                      <span className="text-xs text-[#708090]">100%</span>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-[#F8F4E6] mt-1">
                      <div 
                        style={{ width: `${candidato.score || 0}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          (candidato.score || 0) >= 70 ? 'bg-green-500' :
                          (candidato.score || 0) >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="h-4 w-4 text-[#8B0000]" />
                      <span className="text-sm font-bold text-[#8B0000]">{candidato.score || 0}% Compatível</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Entrar em Contato
                  </button>
                  <button className="w-full px-4 py-2 border border-[#E8EAE0] text-[#708090] rounded-lg hover:bg-[#F8F4E6] transition flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Ver Currículo
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
