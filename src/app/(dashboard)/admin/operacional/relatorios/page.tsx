'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  BarChart3, Download, Filter, Calendar, RefreshCw,
  FileText, FileSpreadsheet, Printer,
  TrendingUp, TrendingDown, Users, Award,
  CheckCircle, XCircle, Clock, Eye, ChevronDown
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminRelatoriosOperacionais() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' })
  const [stats, setStats] = useState({
    participantes: 0,
    entrevistas: 0,
    processos: 0,
    aprovados: 0,
    reprovados: 0,
    bancoTalentos: 0,
    taxaAprovacao: 0,
    taxaReprovacao: 0
  })
  const [ultimasEntrevistas, setUltimasEntrevistas] = useState<any[]>([])
  const [resultadosPorCargo, setResultadosPorCargo] = useState<any[]>([])

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const [
        { count: participantes },
        { count: entrevistas },
        { count: processos },
        { data: resultados }
      ] = await Promise.all([
        supabase.from('participantes').select('*', { count: 'exact', head: true }),
        supabase.from('entrevistas_operacionais').select('*', { count: 'exact', head: true }),
        supabase.from('processos_operacionais').select('*', { count: 'exact', head: true }),
        supabase.from('entrevistas_operacionais').select('resultado, participantes(nome, cargo_pretendido)')
      ])

      const aprovados = resultados?.filter(r => r.resultado === 'aprovado').length || 0
      const reprovados = resultados?.filter(r => r.resultado === 'reprovado').length || 0
      const bancoTalentos = resultados?.filter(r => r.resultado === 'banco_talentos').length || 0
      const totalAvaliados = aprovados + reprovados + bancoTalentos

      setStats({
        participantes: participantes || 0,
        entrevistas: entrevistas || 0,
        processos: processos || 0,
        aprovados,
        reprovados,
        bancoTalentos,
        taxaAprovacao: totalAvaliados > 0 ? Math.round((aprovados / totalAvaliados) * 100) : 0,
        taxaReprovacao: totalAvaliados > 0 ? Math.round((reprovados / totalAvaliados) * 100) : 0
      })

      const { data: ultimas } = await supabase
        .from('entrevistas_operacionais')
        .select('*, participantes(nome, cargo_pretendido)')
        .order('data', { ascending: false })
        .limit(5)

      setUltimasEntrevistas(ultimas || [])

      const cargos = resultados?.reduce((acc: any, r: any) => {
        const cargo = r.participantes?.cargo_pretendido || 'Não informado'
        if (!acc[cargo]) {
          acc[cargo] = { aprovados: 0, reprovados: 0, bancoTalentos: 0 }
        }
        if (r.resultado === 'aprovado') acc[cargo].aprovados++
        else if (r.resultado === 'reprovado') acc[cargo].reprovados++
        else if (r.resultado === 'banco_talentos') acc[cargo].bancoTalentos++
        return acc
      }, {})

      setResultadosPorCargo(Object.entries(cargos || {}).map(([cargo, data]: [string, any]) => ({
        cargo,
        ...data
      })))

    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const handleExportar = (formato: string) => {
    alert(`📊 Exportando relatório em formato ${formato.toUpperCase()}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando relatórios...</p>
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
              Relatórios Operacionais
            </h1>
            <p className="text-sm text-[#708090]">Análise completa dos processos operacionais</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => handleExportar('excel')}
              className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Excel
            </button>
            <button 
              onClick={() => handleExportar('pdf')}
              className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              PDF
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.participantes}</p>
              <p className="text-xs text-[#708090]">Participantes</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.entrevistas}</p>
              <p className="text-xs text-[#708090]">Entrevistas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.processos}</p>
              <p className="text-xs text-[#708090]">Processos</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ÚLTIMAS ENTREVISTAS */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#6B1A2A]" />
                Últimas Entrevistas
              </h3>
              {ultimasEntrevistas.length === 0 ? (
                <p className="text-center text-[#708090] py-4">Nenhuma entrevista realizada</p>
              ) : (
                <div className="space-y-3">
                  {ultimasEntrevistas.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-[#F8F4E6] rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#2D343A]">{item.participantes?.nome || 'Sem nome'}</p>
                        <p className="text-xs text-[#708090]">{item.titulo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#708090]">{new Date(item.data).toLocaleDateString('pt-BR')}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.resultado === 'aprovado' ? 'bg-green-100 text-green-700' :
                          item.resultado === 'reprovado' ? 'bg-red-100 text-red-700' :
                          item.resultado === 'banco_talentos' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.resultado || 'Aguardando'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RESULTADOS POR CARGO */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#6B1A2A]" />
                Resultados por Cargo
              </h3>
              {resultadosPorCargo.length === 0 ? (
                <p className="text-center text-[#708090] py-4">Nenhum dado disponível</p>
              ) : (
                <div className="space-y-3">
                  {resultadosPorCargo.map((item) => (
                    <div key={item.cargo} className="p-3 bg-[#F8F4E6] rounded-lg">
                      <p className="text-sm font-medium text-[#2D343A]">{item.cargo}</p>
                      <div className="flex gap-4 mt-1 text-xs">
                        <span className="text-green-600">✓ {item.aprovados}</span>
                        <span className="text-red-600">✗ {item.reprovados}</span>
                        <span className="text-yellow-600">★ {item.bancoTalentos}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
