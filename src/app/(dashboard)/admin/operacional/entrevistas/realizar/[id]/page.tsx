'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Save, CheckCircle, Clock, User, Briefcase,
  Calendar, Send, MessageSquare, Star, AlertCircle,
  ChevronLeft, ChevronRight, FileText, Users
} from 'lucide-react'

export default function RealizarEntrevista() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [notas, setNotas] = useState<Record<number, number>>({})

  const entrevista = {
    id: params.id,
    participante: 'João Silva',
    cargo: 'Operador de Produção',
    processo: 'Operador de Produção - Indústria ABC',
    data: '20/07/2026',
    hora: '09:00',
    modelo: 'Entrevista Operacional',
    perguntas: [
      { id: 1, texto: 'Quais são seus principais objetivos profissionais?', obrigatoria: true },
      { id: 2, texto: 'Quais competências considera fundamentais para exercer esta função?', obrigatoria: true },
      { id: 3, texto: 'Como costuma superar desafios profissionais?', obrigatoria: true },
      { id: 4, texto: 'Conte uma situação em que trabalhou sob pressão.', obrigatoria: false },
      { id: 5, texto: 'O que mais o motiva em um ambiente de trabalho?', obrigatoria: false },
    ]
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const handleAnswerChange = (value: string) => {
    setAnswers({...answers, [currentQuestion]: value})
  }

  const handleNotaChange = (value: number) => {
    setNotas({...notas, [currentQuestion]: value})
  }

  const nextQuestion = () => {
    if (currentQuestion < entrevista.perguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const isComplete = () => {
    const current = entrevista.perguntas[currentQuestion]
    if (current.obrigatoria && !answers[currentQuestion]?.trim()) {
      return false
    }
    return true
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

  const pergunta = entrevista.perguntas[currentQuestion]

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
              <h1 className="text-2xl font-bold text-[#2D343A]">Realizar Entrevista</h1>
              <p className="text-sm text-[#708090]">{entrevista.participante} - {entrevista.cargo}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Save className="h-4 w-4" />
            Finalizar Entrevista
          </button>
        </header>

        <div className="flex-1 p-8">
          {/* INFO DA ENTREVISTA */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <User className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Participante</p>
                <p className="font-medium text-[#2D343A]">{entrevista.participante}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Cargo</p>
                <p className="font-medium text-[#2D343A]">{entrevista.cargo}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Data/Hora</p>
                <p className="font-medium text-[#2D343A]">{entrevista.data} às {entrevista.hora}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Modelo</p>
                <p className="font-medium text-[#2D343A]">{entrevista.modelo}</p>
              </div>
            </div>
          </div>

          {/* PROGRESSO */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#708090]">Pergunta {currentQuestion + 1} de {entrevista.perguntas.length}</span>
              <span className="text-sm text-[#708090]">{Math.round(((currentQuestion + 1) / entrevista.perguntas.length) * 100)}%</span>
            </div>
            <div className="w-full bg-[#E8EAE0] rounded-full h-2">
              <div 
                className="bg-[#8B0000] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / entrevista.perguntas.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* PERGUNTA */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-[#8B0000]" />
                <span className="text-sm text-[#708090]">
                  {pergunta.obrigatoria ? 'Obrigatória' : 'Opcional'}
                </span>
                {pergunta.obrigatoria && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>
              <h2 className="text-xl font-bold text-[#2D343A]">{pergunta.texto}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-2">Resposta</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                  placeholder="Digite a resposta do participante..."
                  value={answers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-2">Nota (1-10)</label>
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleNotaChange(num)}
                      className={`w-10 h-10 rounded-lg border transition ${
                        notas[currentQuestion] === num
                          ? 'bg-[#8B0000] text-white border-[#8B0000]'
                          : 'border-[#E8EAE0] hover:border-[#8B0000] hover:bg-[#F8F4E6]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2D343A] mb-2">Observações</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                  placeholder="Observações adicionais sobre esta pergunta..."
                />
              </div>
            </div>

            {/* NAVEGAÇÃO */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E8EAE0]">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition ${
                  currentQuestion === 0
                    ? 'text-[#708090] cursor-not-allowed'
                    : 'border border-[#E8EAE0] hover:bg-[#F8F4E6]'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-[#708090]">
                  {answers[currentQuestion] ? '✅ Respondida' : 'Aguardando resposta'}
                </span>
                {!isComplete() && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Pergunta obrigatória
                  </span>
                )}
              </div>

              {currentQuestion === entrevista.perguntas.length - 1 ? (
                <button className="flex items-center gap-2 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition">
                  Finalizar
                  <CheckCircle className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition"
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
