'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  UsersRound, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  User, Phone, MapPin, Briefcase, Upload, FileText,
  CheckCircle, XCircle, Clock, UserCheck, UserPlus
} from 'lucide-react'
import { listarParticipantes, excluirParticipante } from '@/actions/operacional'

export default function AdminParticipantes() {
  const router = useRouter()
  const [participantes, setParticipantes] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarParticipantes()
  }, [])

  const carregarParticipantes = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarParticipantes()
      if (result.success) {
        setParticipantes(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar participantes')
      }
    } catch (err) {
      setError('Erro ao carregar participantes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este participante?')) return

    try {
      const result = await excluirParticipante(id)
      if (result.success) {
        await carregarParticipantes()
      } else {
        alert(result.error || 'Erro ao excluir participante')
      }
    } catch (error) {
      alert('Erro ao excluir participante')
    }
  }

  const filtered = participantes.filter(p =>
    p.nome?.toLowerCase().includes(search.toLowerCase()) ||
    p.telefone?.includes(search) ||
    p.cidade?.toLowerCase().includes(search.toLowerCase()) ||
    p.cargo_pretendido?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <UsersRound className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando participantes...</p>
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
              <UsersRound className="h-6 w-6 text-[#6B1A2A]" />
              Participantes Operacionais
            </h1>
            <p className="text-sm text-[#708090]">{participantes.length} participantes cadastrados</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarParticipantes}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition font-medium flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/participantes/novo')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Participante
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
                  placeholder="Buscar participantes por nome, telefone, cidade ou cargo..." 
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
                <UsersRound className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhum participante cadastrado.</p>
                <button 
                  onClick={() => router.push('/admin/operacional/participantes/novo')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Cadastrar primeiro participante
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Nome</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Telefone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cidade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cargo Pretendido</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.telefone || '-'}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cidade || '-'}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cargo_pretendido || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/operacional/participantes/${item.id}`)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                            >
                              <Eye className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button 
                              onClick={() => router.push(`/admin/operacional/participantes/${item.id}/editar`)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar"
                            >
                              <Edit className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Excluir"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
