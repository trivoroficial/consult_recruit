'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, FileText, User, Calendar, Clock,
  Save, CheckCircle, XCircle, Award, Star,
  TrendingUp, TrendingDown, MessageCircle,
  Edit, Trash2, Eye, Users, MapPin,
  Mic, Video, Phone, Monitor
} from 'lucide-react'
import { buscarEntrevistaOperacionalPorId, atualizarEntrevistaOperacional } from '@/actions/operacional'

export default function EntrevistaPresencial() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [entrevista, setEntrevista] = useState<any>(null)
  const [form, setForm] = useState({
    status: 'realizada',
    observacoes: '',
    resultado: 'aguardando'
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
          status: result.data?.status || 'realizada',
          observacoes: result.data?.observacoes || '',
          resultado: result.data?.resultado || 'aguardando'
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
        setError(result.error || 'Erro ao salvar')
        setSaving(false)
      }
    } catch (err) {
      setError('Erro ao salvar')
      setSaving(false)
    }
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
              <h2 className="text-2xl font-bold text-[#2D343A]">Entrevista finalizada!</h2>
              <p className="text-[#708090] mt-2">
                A entrevista foi registrada como realizada.
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
              <h1 className="text-2xl font-bold text-[#2D343A]">Entrevista Presencial</h1>
              <p className="text-sm text-[#708090]">{entrevista.titulo}</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#6B1A2A]/10 rounded-2xl flex items-center justify-center text-[#6B1A2A] text-2xl font-bold">
                    {entrevista.participantes?.nome?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D343A]">{entrevista.participantes?.nome || 'Participante'}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                        Presencial
                      </span>
                      <span className="text-sm text-[#708090]">• {new Date(entrevista.data).toLocaleDateString('pt-BR')} às {entrevista.hora?.substring(0, 5) || '09:00'}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Status da Entrevista</label>
                    <select
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={form.status}
                      onChange={(e) => setForm({...form, status: e.target.value})}
                    >
                      <option value="realizada">Realizada</option>
                      <option value="cancelada">Cancelada</option>
                      <option value="pendente">Pendente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Resultado</label>
                    <select
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
                      rows={3}
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                      value={form.observacoes}
                      onChange={(e) => setForm({...form, observacoes: e.target.value})}
                      placeholder="Registre as observações da entrevista presencial..."
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-[#E8EAE0]">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-8 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="h-5 w-5" />
                      {saving ? 'Salvando...' : 'Finalizar Entrevista'}
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
                  <h4 className="text-sm font-semibold text-[#2D343A] mb-2">Instruções</h4>
                  <ul className="text-xs text-[#708090] space-y-1 list-disc pl-4">
                    <li>Realize a entrevista presencialmente</li>
                    <li>Registre as observações durante a entrevista</li>
                    <li>Após finalizar, registre o resultado</li>
                    <li>Encaminhe para a próxima etapa se aprovado</li>
                  </ul>
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
