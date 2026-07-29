'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  UserCheck, Search, Eye, RefreshCw,
  TrendingUp, Building2, Calendar, Award,
  Filter, Download, CheckCircle, Clock,
  Briefcase, Users, FileText
} from 'lucide-react'
import { listarParticipantes } from '@/actions/operacional'

export default function AdminContratacoes() {
  const router = useRouter()
  const [contratacoes, setContratacoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarParticipantes()
      if (result.success) {
        // Simular contratações (na prática viria de uma tabela específica)
        setContratacoes(result.data?.filter((_, i) => i % 3 === 0).slice(0, 8) || [])
      } else {
        setError(result.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: contratacoes.length,
    ativas: Math.floor(contratacoes.length * 0.7),
    concluidas: Math.floor(contratacoes.length * 0.3)
  }

  const filtered = contratacoes.filter(p =>
    p.nome?.toLowerCase().includes(search.toLowerCase()) ||
    p.cargo_pretendido?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <UserCheck className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando contratações...</p>
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
              <UserCheck className="h-6 w-6 text-[#6B1A2A]" />
              Contratações
            </h1>
            <p className="text-sm text-[#708090]">{contratacoes.length} contratações realizadas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition font-medium flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* CARDS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-[#2D343A]">{stats.total}</p>
              <p className="text-xs text-[#708090]">Total</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.ativas}</p>
              <p className="text-xs text-[#708090]">Ativas</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8EAE0] text-center">
              <p className="text-2xl font-bold text-green-600">{stats.concluidas}</p>
              <p className="text-xs text-[#708090]">Concluídas</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar contratações..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {contratacoes.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma contratação registrada.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#2D343A]">{item.nome}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                          <span>{item.cargo_pretendido || 'Sem cargo'}</span>
                          <span>•</span>
                          <span>{item.empresa_atual || 'Empresa'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            Contratado
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => router.push(`/admin/operacional/participantes/${item.id}`)}
                      className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                    >
                      <Eye className="h-4 w-4 text-[#708090]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
