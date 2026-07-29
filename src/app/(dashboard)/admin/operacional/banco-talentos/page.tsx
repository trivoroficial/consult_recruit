'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  Users, Search, Eye, RefreshCw, Award,
  Star, UserCheck, Filter, Download,
  Mail, Phone, MapPin, Briefcase
} from 'lucide-react'
import { listarParticipantes } from '@/actions/operacional'

export default function AdminBancoTalentos() {
  const router = useRouter()
  const [participantes, setParticipantes] = useState<any[]>([])
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
        // Filtrar participantes que estão no banco de talentos
        // (na prática, isso viria de uma tabela específica)
        setParticipantes(result.data?.slice(0, 10) || [])
      } else {
        setError(result.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const filtered = participantes.filter(p =>
    p.nome?.toLowerCase().includes(search.toLowerCase()) ||
    p.cargo_pretendido?.toLowerCase().includes(search.toLowerCase()) ||
    p.cidade?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Users className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando banco de talentos...</p>
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
              <Award className="h-6 w-6 text-[#6B1A2A]" />
              Banco de Talentos
            </h1>
            <p className="text-sm text-[#708090]">{participantes.length} talentos disponíveis</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarDados}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
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
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar talentos..." 
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

            {participantes.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhum talento no banco.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#E8EAE0] rounded-xl p-4 hover:shadow-md transition hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#6B1A2A]/10 rounded-full flex items-center justify-center text-[#6B1A2A] font-bold">
                          {item.nome?.charAt(0) || 'T'}
                        </div>
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.nome}</p>
                          <p className="text-xs text-[#708090]">{item.cargo_pretendido || 'Sem cargo'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => router.push(`/admin/operacional/participantes/${item.id}`)}
                        className="p-1 hover:bg-[#F8F4E6] rounded"
                      >
                        <Eye className="h-4 w-4 text-[#708090]" />
                      </button>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-[#708090]">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{item.telefone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{item.cidade || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-3 w-3" />
                        <span>{item.empresa_atual || 'Desempregado'}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E8EAE0] flex items-center justify-between">
                      <span className="text-xs text-[#708090]">Disponível</span>
                      <button className="text-xs text-[#6B1A2A] hover:underline font-medium flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        Contatar
                      </button>
                    </div>
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
