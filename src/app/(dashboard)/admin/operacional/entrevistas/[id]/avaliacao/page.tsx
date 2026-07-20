'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Save, CheckCircle, User, Briefcase,
  Calendar, Send, FileText, Star, Award,
  ThumbsUp, ThumbsDown, AlertCircle, BarChart3,
  TrendingUp, Users, MessageSquare, ClipboardList
} from 'lucide-react'

export default function AvaliacaoEntrevista() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [avaliacao, setAvaliacao] = useState({
    resumo: '',
    pontosFortes: '',
    pontosDesenvolver: '',
    recomendacao: 'aprovado',
    observacoes: ''
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

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

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/entrevistas')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Avaliação da Entrevista</h1>
              <p className="text-sm text-[#708090]">Registre o parecer final da entrevista</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUNA ESQUERDA */}
            <div className="lg:col-span-2 space-y-6">
              {/* RESUMO */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <ClipboardList className="h-5 w-5 text-[#8B0000]" />
                  Resumo da Entrevista
                </h3>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-2">Resumo geral</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    placeholder="Descreva o resumo geral da entrevista..."
                    value={avaliacao.resumo}
                    onChange={(e) => setAvaliacao({...avaliacao, resumo: e.target.value})}
                  />
                </div>
              </div>

              {/* PONTOS FORTES E A DESENVOLVER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    Pontos Fortes
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-2">Competências observadas</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                      placeholder="Liste os pontos fortes do candidato..."
                      value={avaliacao.pontosFortes}
                      onChange={(e) => setAvaliacao({...avaliacao, pontosFortes: e.target.value})}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                  <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                    <ThumbsDown className="h-5 w-5 text-red-600" />
                    Pontos a Desenvolver
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-2">Áreas de melhoria</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                      placeholder="Liste os pontos a serem desenvolvidos..."
                      value={avaliacao.pontosDesenvolver}
                      onChange={(e) => setAvaliacao({...avaliacao, pontosDesenvolver: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* OBSERVAÇÕES */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <MessageSquare className="h-5 w-5 text-[#8B0000]" />
                  Observações Adicionais
                </h3>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-2">Observações</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    placeholder="Observações adicionais sobre o candidato..."
                    value={avaliacao.observacoes}
                    onChange={(e) => setAvaliacao({...avaliacao, observacoes: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="space-y-6">
              {/* RECOMENDAÇÃO */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <Award className="h-5 w-5 text-[#8B0000]" />
                  Recomendação
                </h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setAvaliacao({...avaliacao, recomendacao: 'aprovado'})}
                    className={`w-full py-3 px-4 rounded-lg border transition flex items-center gap-3 ${
                      avaliacao.recomendacao === 'aprovado'
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'border-[#E8EAE0] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium">Aprovado</p>
                      <p className="text-xs text-[#708090]">Recomendado para contratação</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setAvaliacao({...avaliacao, recomendacao: 'banco'})}
                    className={`w-full py-3 px-4 rounded-lg border transition flex items-center gap-3 ${
                      avaliacao.recomendacao === 'banco'
                        ? 'bg-purple-50 border-purple-500 text-purple-700'
                        : 'border-[#E8EAE0] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    <Users className="h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium">Banco de Talentos</p>
                      <p className="text-xs text-[#708090]">Manter em banco para futuras oportunidades</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setAvaliacao({...avaliacao, recomendacao: 'reprovado'})}
                    className={`w-full py-3 px-4 rounded-lg border transition flex items-center gap-3 ${
                      avaliacao.recomendacao === 'reprovado'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'border-[#E8EAE0] hover:bg-[#F8F4E6]'
                    }`}
                  >
                    <ThumbsDown className="h-5 w-5 text-red-600" />
                    <div className="text-left">
                      <p className="font-medium">Reprovado</p>
                      <p className="text-xs text-[#708090]">Não recomendado para contratação</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* COMPETÊNCIAS */}
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2 border-b border-[#E8EAE0] pb-3">
                  <BarChart3 className="h-5 w-5 text-[#8B0000]" />
                  Competências Avaliadas
                </h3>
                <div className="space-y-3">
                  {['Comunicação', 'Trabalho em Equipe', 'Proatividade', 'Resiliência', 'Organização'].map((comp) => (
                    <div key={comp} className="flex items-center justify-between">
                      <span className="text-sm text-[#2D343A]">{comp}</span>
                      <select className="px-2 py-1 border border-[#E8EAE0] rounded-lg text-sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3" selected>3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTÃO SALVAR */}
              <button className="w-full py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center justify-center gap-2">
                <Save className="h-5 w-5" />
                Finalizar Avaliação
              </button>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
