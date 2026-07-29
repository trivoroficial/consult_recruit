'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, FileText, User, Calendar, Clock,
  Save, CheckCircle, XCircle, Award, Star,
  TrendingUp, TrendingDown, MessageCircle,
  Edit, Trash2, Eye, Users, MapPin
} from 'lucide-react'
import { buscarEntrevistaOperacionalPorId, atualizarEntrevistaOperacional } from '@/actions/operacional'

export default function AvaliarEntrevista() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [entrevista, setEntrevista] = useState<any>(null)
  const [form, setForm] = useState({
    avaliacao: '',
    parecer: '',
    resultado: 'aguardando',
    observacoes: ''
  })

  useEffect(() => {
    carregarEntrevista()
  }, [id])

  const carregarEntrevista = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarEntrevistaOperacionalPorId(parseInt(id))
      if (result.success) {
        setEntrevista(result.data)
        setForm({
          avaliacao: result.data?.avaliacao || '',
          parecer: result.data?.parecer || '',
          resultado: result.data?.resultado || 'aguardando',
          observacoes: result.data?.observacoes || ''
        })
      } else {
        setError(result.error || 'Entrevista não encontrada')
      }
    } catch (err) {
      setError('Erro ao carregar entrevista')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const result = await atualizarEntrevistaOperacional(parseInt(id), form)
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/admin/operacional/entrevistas')
        }, 2000)
      } else {
        setError(result.error || 'Erro ao salvar avaliação')
        setSaving(false)
      }
    } catch (err) {
      setError('Erro ao salvar avaliação')
      setSaving(false)
    }
  }

  const getResultadoConfig = (resultado: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'aprovado': { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'reprovado': { label: 'Reprovado', color: 'bg-red-100 text-red-700', icon: XCircle },
      'banco_talentos': { label: 'Banco de Talentos', color: 'bg-yellow-100 text-yellow-700', icon: Award },
      'aguardando': { label: 'Aguardando', color: 'bg-gray-100 text-gray-700', icon: Clock }
    }
    return configs[resultado] || configs['aguardando']
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando entrevista...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!entrevista || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Entrevista não encontrada</h2>
          <p className="text-[#708090]">{error || 'A entrevista que você está procurando não existe.'}</p>
          <button 
            onClick={() => router.push('/admin/operacional/entrevistas')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Entrevistas
          </button>
        </div>
      </div>
    )
  }

  const resultadoConfig = getResultadoConfig(form.resultado)
  const ResultadoIcon = resultadoConfig.icon

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Avaliação salva com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                A avaliação da entrevista foi registrada.
              </p>
              <button
                onClick={() => router.push('/admin/operacional/entrevistas')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Entrevistas
              </button>
            </div>
          </div>
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
              onClick={() => router.push('/admin/operacional/entrevistas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Avaliar Entrevista</h1>
              <p className="text-sm text-[#708090]">{entrevista.titulo}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Avaliação <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                      value={form.avaliacao}
                      onChange={(e) => setForm({...form, avaliacao: e.target.value})}
                      placeholder="Descreva a avaliação do candidato..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Parecer <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                      value={form.parecer}
                      onChange={(e) => setForm({...form, parecer: e.target.value})}
                      placeholder="Parecer sobre o candidato..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Resultado <span className="text-[#6B1A2A]">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={form.resultado}
                      onChange={(e) => setForm({...form, resultado: e.target.value})}
                    >
                      <option value="aguardando">Aguardando</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="reprovado">Reprovado</option>
                      <option value="banco_talentos">Banco de Talentos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Observações</label>
                    <textarea
                      rows={2}
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                      value={form.observacoes}
                      onChange={(e) => setForm({...form, observacoes: e.target.value})}
                      placeholder="Observações adicionais..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E8EAE0]">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    {saving ? 'Salvando...' : 'Salvar Avaliação'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/admin/operacional/entrevistas')}
                    className="px-8 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4">Informações</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{entrevista.participantes?.nome || 'Sem participante'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{new Date(entrevista.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{entrevista.hora?.substring(0, 5) || '09:00'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">{entrevista.local || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-[#708090]" />
                    <span className="text-[#708090]">Entrevistador: {entrevista.entrevistador || '-'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8EAE0]">
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Status Atual</h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      form.resultado === 'aprovado' ? 'bg-green-500' :
                      form.resultado === 'reprovado' ? 'bg-red-500' :
                      form.resultado === 'banco_talentos' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="text-sm text-[#708090]">{resultadoConfig.label}</span>
                  </div>
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
