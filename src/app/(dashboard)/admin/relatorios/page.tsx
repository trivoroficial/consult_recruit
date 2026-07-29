'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  BarChart3, FileText, Download, Calendar, Filter,
  TrendingUp, TrendingDown, Users, Building2,
  Briefcase, DollarSign, FileSpreadsheet, FilePdf,
  RefreshCw, Clock, CheckCircle, XCircle,
  ArrowUpRight, ArrowDownRight, PieChart
} from 'lucide-react'
import {
  gerarRelatorioFinanceiro,
  gerarRelatorioProcessos,
  gerarRelatorioCandidatos,
  gerarRelatorioVagas,
  exportarRelatorioExcel,
  exportarRelatorioPDF
} from '@/actions/relatorios'

export default function AdminRelatorios() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [relatorio, setRelatorio] = useState<any>(null)
  const [tipoRelatorio, setTipoRelatorio] = useState('financeiro')
  const [periodo, setPeriodo] = useState({ inicio: '', fim: '' })
  const [filtroStatus, setFiltroStatus] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleGerarRelatorio = async () => {
    setLoading(true)
    setError(null)
    setRelatorio(null)

    try {
      let result
      switch (tipoRelatorio) {
        case 'financeiro':
          result = await gerarRelatorioFinanceiro({
            dataInicio: periodo.inicio || undefined,
            dataFim: periodo.fim || undefined
          })
          break
        case 'processos':
          result = await gerarRelatorioProcessos({
            status: filtroStatus || undefined,
            dataInicio: periodo.inicio || undefined
          })
          break
        case 'candidatos':
          result = await gerarRelatorioCandidatos({
            status: filtroStatus || undefined
          })
          break
        case 'vagas':
          result = await gerarRelatorioVagas({
            status: filtroStatus || undefined
          })
          break
        default:
          result = await gerarRelatorioFinanceiro()
      }

      if (result.success) {
        setRelatorio(result.data)
      } else {
        setError(result.error || 'Erro ao gerar relatório')
      }
    } catch (err) {
      setError('Erro ao gerar relatório')
    } finally {
      setLoading(false)
    }
  }

  const handleExportarExcel = async () => {
    if (!relatorio) return
    try {
      const result = await exportarRelatorioExcel(relatorio, tipoRelatorio)
      if (result.success) {
        alert('📊 Relatório exportado com sucesso!')
      }
    } catch (error) {
      alert('Erro ao exportar Excel')
    }
  }

  const handleExportarPDF = async () => {
    if (!relatorio) return
    try {
      const result = await exportarRelatorioPDF(relatorio, tipoRelatorio)
      if (result.success) {
        alert('📄 Relatório exportado com sucesso!')
      }
    } catch (error) {
      alert('Erro ao exportar PDF')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const tipos = [
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'processos', label: 'Processos', icon: Briefcase },
    { id: 'candidatos', label: 'Candidatos', icon: Users },
    { id: 'vagas', label: 'Vagas', icon: Building2 },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-[#6B1A2A]" />
              Relatórios
            </h1>
            <p className="text-sm text-[#708090]">Análise e exportação de dados</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CONFIGURAÇÕES */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-[#6B1A2A]" />
                  Configurações
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Tipo de Relatório
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {tipos.map((tipo) => {
                        const Icon = tipo.icon
                        return (
                          <button
                            key={tipo.id}
                            onClick={() => setTipoRelatorio(tipo.id)}
                            className={`p-3 rounded-lg border transition flex items-center gap-2 ${
                              tipoRelatorio === tipo.id
                                ? 'border-[#6B1A2A] bg-[#6B1A2A]/5 text-[#6B1A2A]'
                                : 'border-[#E8EAE0] hover:border-[#6B1A2A]/30'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{tipo.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Período
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] text-sm"
                        value={periodo.inicio}
                        onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
                      />
                      <input
                        type="date"
                        className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] text-sm"
                        value={periodo.fim}
                        onChange={(e) => setPeriodo({...periodo, fim: e.target.value})}
                      />
                    </div>
                  </div>

                  {tipoRelatorio !== 'financeiro' && (
                    <div>
                      <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                        Status
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] text-sm"
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                      >
                        <option value="">Todos</option>
                        {tipoRelatorio === 'processos' && (
                          <>
                            <option value="triagem">Triagem</option>
                            <option value="entrevista">Entrevista</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="encerrado">Encerrado</option>
                          </>
                        )}
                        {tipoRelatorio === 'candidatos' && (
                          <>
                            <option value="Disponível">Disponível</option>
                            <option value="Em processo">Em processo</option>
                            <option value="Contratado">Contratado</option>
                            <option value="Inativo">Inativo</option>
                          </>
                        )}
                        {tipoRelatorio === 'vagas' && (
                          <>
                            <option value="Aberta">Aberta</option>
                            <option value="Em análise">Em análise</option>
                            <option value="Pausada">Pausada</option>
                            <option value="Fechada">Fechada</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  <button
                    onClick={handleGerarRelatorio}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-4 w-4" />
                        Gerar Relatório
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RELATÓRIO */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#2D343A] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#6B1A2A]" />
                    Resultado
                  </h3>
                  {relatorio && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleExportarExcel}
                        className="px-3 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm flex items-center gap-1 text-[#708090]"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        Excel
                      </button>
                      <button
                        onClick={handleExportarPDF}
                        className="px-3 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-sm flex items-center gap-1 text-[#708090]"
                      >
                        <FilePdf className="h-4 w-4" />
                        PDF
                      </button>
                    </div>
                  )}
                </div>

                {!relatorio && !loading && !error && (
                  <div className="text-center py-16">
                    <BarChart3 className="h-16 w-16 text-[#708090] mx-auto mb-4 opacity-50" />
                    <p className="text-[#708090]">Configure os filtros e clique em "Gerar Relatório"</p>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <RefreshCw className="h-12 w-12 text-[#6B1A2A] animate-spin mx-auto mb-4" />
                      <p className="text-[#708090]">Gerando relatório...</p>
                    </div>
                  </div>
                )}

                {relatorio && (
                  <div className="space-y-4">
                    {/* FINANCEIRO */}
                    {tipoRelatorio === 'financeiro' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-[#2D343A]">{relatorio.total || 0}</p>
                            <p className="text-xs text-[#708090]">Transações</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{formatCurrency(relatorio.totalReceitas || 0)}</p>
                            <p className="text-xs text-[#708090]">Receitas</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-red-600">{formatCurrency(relatorio.totalDespesas || 0)}</p>
                            <p className="text-xs text-[#708090]">Despesas</p>
                          </div>
                          <div className={`bg-[#F8F4E6] rounded-lg p-4 text-center ${(relatorio.saldo || 0) >= 0 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                            <p className={`text-2xl font-bold ${(relatorio.saldo || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(relatorio.saldo || 0)}
                            </p>
                            <p className="text-xs text-[#708090]">Saldo</p>
                          </div>
                        </div>
                        {relatorio.transacoes && relatorio.transacoes.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-medium text-[#2D343A] mb-2">Últimas transações</h4>
                            <div className="space-y-2">
                              {relatorio.transacoes.slice(0, 5).map((t: any) => (
                                <div key={t.id} className="flex items-center justify-between p-2 bg-[#F8F4E6] rounded-lg text-sm">
                                  <span>{t.descricao}</span>
                                  <span className={t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}>
                                    {formatCurrency(t.valor)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* PROCESSOS */}
                    {tipoRelatorio === 'processos' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-[#2D343A]">{relatorio.total || 0}</p>
                            <p className="text-xs text-[#708090]">Total</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-600">{relatorio.statusCount?.triagem || 0}</p>
                            <p className="text-xs text-[#708090]">Triagem</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">{relatorio.statusCount?.entrevista || 0}</p>
                            <p className="text-xs text-[#708090]">Entrevista</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{relatorio.statusCount?.aprovado || 0}</p>
                            <p className="text-xs text-[#708090]">Aprovados</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* CANDIDATOS */}
                    {tipoRelatorio === 'candidatos' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-[#2D343A]">{relatorio.total || 0}</p>
                            <p className="text-xs text-[#708090]">Total</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{relatorio.statusCount?.Disponivel || 0}</p>
                            <p className="text-xs text-[#708090]">Disponíveis</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-600">{relatorio.statusCount?.EmProcesso || 0}</p>
                            <p className="text-xs text-[#708090]">Em processo</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">{relatorio.statusCount?.Contratado || 0}</p>
                            <p className="text-xs text-[#708090]">Contratados</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* VAGAS */}
                    {tipoRelatorio === 'vagas' && (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-[#2D343A]">{relatorio.total || 0}</p>
                            <p className="text-xs text-[#708090]">Total</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-green-600">{relatorio.statusCount?.Aberta || 0}</p>
                            <p className="text-xs text-[#708090]">Abertas</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-600">{relatorio.statusCount?.EmAnalise || 0}</p>
                            <p className="text-xs text-[#708090]">Em análise</p>
                          </div>
                          <div className="bg-[#F8F4E6] rounded-lg p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">{relatorio.totalCandidatos || 0}</p>
                            <p className="text-xs text-[#708090]">Candidatos</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
