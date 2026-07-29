'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  BarChart3, Users, CheckCircle, XCircle, Clock,
  TrendingUp, TrendingDown, Filter, Search,
  Download, FileText, UserCheck, UserX,
  Award, Target, PieChart, ArrowUpRight
} from 'lucide-react'
import { listarEntrevistasOperacionais } from '@/actions/operacional'

export default function AdminResultados() {
  const router = useRouter()
  const [entrevistas, setEntrevistas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filtroResultado, setFiltroResultado] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarEntrevistasOperacionais()
      if (result.success) {
        setEntrevistas(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const resultados = entrevistas.filter(e => e.resultado && e.resultado !== 'aguardando')
  const pendentes = entrevistas.filter(e => e.resultado === 'aguardando' || !e.resultado)

  const stats = {
    total: entrevistas.length,
    aprovados: resultados.filter(r => r.resultado === 'aprovado').length,
    reprovados: resultados.filter(r => r.resultado === 'reprovado').length,
    bancoTalentos: resultados.filter(r => r.resultado === 'banco_talentos').length,
    pendentes: pendentes.length,
    taxaAprovacao: resultados.length > 0 ? Math.round((resultados.filter(r => r.resultado === 'aprovado').length / resultados.length) * 100) : 0
  }

  const getResultadoConfig = (resultado: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      'aprovado': { label: 'Aprovado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'reprovado': { label: 'Reprovado', color: 'bg-red-100 text-red-700', icon: XCircle },
      'banco_talentos': { label: 'Banco de Talentos', color: 'bg-yellow-100 text-yellow-700', icon: Award }
    }
    return configs[resultado] || configs['aprovado']
  }

  const filtered = entrevistas.filter(e =>
    e.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    e.participantes?.nome?.toLowerCase().includes(search.toLowerCase()) ||
    e.entrevistador?.toLowerCase().includes(search.toLowerCase())
  ).filter(e => filtroResultado ? e.resultado === filtroResultado : true)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando resultados...</p>
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
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#6B1A2A]" />
              Resultados
            </h1>
            <p className="text-sm text-[#708090]">{resultados.length} entrevistas avaliadas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS DE RESULTADOS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{stats.aprovados}</p>
              <p className="text-xs text-[#708090]">Aprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-red-600">{stats.reprovados}</p>
              <p className="text-xs text-[#708090]">Reprovados</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.bancoTalentos}</p>
              <p className="text-xs text-[#708090]">Banco de Talentos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#6B1A2A]">{stats.taxaAprovacao}%</p>
              <p className="text-xs text-[#708090]">Taxa de Aprovação</p>
            </div>
          </div>

          {/* PENDENTES */}
          {pendentes.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-yellow-700">
                  {pendentes.length} entrevistas aguardando avaliação
                </span>
              </div>
              <button 
                onClick={() => router.push('/admin/operacional/entrevistas')}
                className="text-sm text-yellow-700 hover:underline font-medium"
              >
                Ver pendentes →
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar resultados..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                value={filtroResultado}
                onChange={(e) => setFiltroResultado(e.target.value)}
              >
                <option value="">Todos os resultados</option>
                <option value="aprovado">Aprovado</option>
                <option value="reprovado">Reprovado</option>
                <option value="banco_talentos">Banco de Talentos</option>
                <option value="aguardando">Aguardando</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {entrevistas.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma entrevista realizada.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => {
                  const resultadoConfig = getResultadoConfig(item.resultado || 'aguardando')
                  const ResultadoIcon = resultadoConfig.icon
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${resultadoConfig.color}`}>
                          <ResultadoIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.titulo}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                            <span>{item.participantes?.nome || 'Sem participante'}</span>
                            <span>•</span>
                            <span>{item.entrevistador || '-'}</span>
                            <span>•</span>
                            <span>{new Date(item.data).toLocaleDateString('pt-BR')}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${resultadoConfig.color}`}>
                              {resultadoConfig.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => router.push(`/admin/operacional/entrevistas/${item.id}`)}
                        className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                        title="Ver detalhes"
                      >
                        <ArrowUpRight className="h-4 w-4 text-[#6B1A2A]" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
