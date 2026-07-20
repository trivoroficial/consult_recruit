'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Save, CheckCircle, Clock, User, Briefcase,
  Calendar, Send, MessageSquare, AlertCircle,
  ChevronLeft, ChevronRight, FileText
} from 'lucide-react'

export default function RealizarEntrevistaCandidato() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [finalizado, setFinalizado] = useState(false)

  const entrevista = {
    id: params.id,
    titulo: 'Entrevista RH - Analista Administrativo',
    empresa: 'Empresa XPTO',
    cargo: 'Analista Administrativo',
    data: '22/07/2026',
    hora: '09:00',
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

  const finalizarEntrevista = () => {
    setFinalizado(true)
    setTimeout(() => {
      router.push('/candidato/entrevistas')
    }, 2000)
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
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6]">
        <div className="text-[#8B0000] text-xl">Carregando...</div>
      </div>
    )
  }

  if (finalizado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6]">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Entrevista finalizada!</h2>
          <p className="text-[#708090] mt-2">Suas respostas foram enviadas com sucesso.</p>
          <p className="text-sm text-[#708090] mt-1">Aguarde o retorno da empresa.</p>
        </div>
      </div>
    )
  }

  const pergunta = entrevista.perguntas[currentQuestion]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/candidato/entrevistas')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{entrevista.titulo}</h1>
              <p className="text-sm text-[#708090]">{entrevista.empresa}</p>
            </div>
          </div>
          <span className="text-sm text-[#708090]">{currentQuestion + 1}/{entrevista.perguntas.length}</span>
        </header>

        <div className="flex-1 p-8">
          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <p className="text-xs text-[#708090]">Data</p>
                <p className="font-medium text-[#2D343A]">{entrevista.data} às {entrevista.hora}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#8B0000]" />
              <div>
                <p className="text-xs text-[#708090]">Tempo estimado</p>
                <p className="font-medium text-[#2D343A]">{entrevista.perguntas.length * 2} minutos</p>
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

            <div>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                placeholder="Digite sua resposta..."
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              />
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
                <button
                  onClick={finalizarEntrevista}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
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
