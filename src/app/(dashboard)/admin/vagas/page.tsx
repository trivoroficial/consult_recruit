'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Plus, Search, Edit, Trash2, Eye, RefreshCw, Star, StarOff, Lock, Unlock } from 'lucide-react'
import { listarVagas, excluirVaga } from '@/actions/vagas'

export default function AdminVagas() {
  const router = useRouter()
  const [vagas, setVagas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarVagas()
  }, [])

  const carregarVagas = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarVagas()
      if (result.success) {
        setVagas(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar vagas')
      }
    } catch (err) {
      setError('Erro ao carregar vagas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) return

    try {
      const result = await excluirVaga(id)
      if (result.success) {
        await carregarVagas()
      } else {
        alert(result.error || 'Erro ao excluir vaga')
      }
    } catch (error) {
      alert('Erro ao excluir vaga')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Aberta': 'bg-green-100 text-green-700',
      'Em análise': 'bg-yellow-100 text-yellow-700',
      'Pausada': 'bg-blue-100 text-blue-700',
      'Fechada': 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const filtered = vagas.filter(v =>
    v.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    v.empresa?.toLowerCase().includes(search.toLowerCase()) ||
    v.local?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Briefcase className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando vagas...</p>
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
            <h1 className="text-2xl font-bold text-[#2D343A]">Vagas</h1>
            <p className="text-sm text-[#708090]">{vagas.length} vagas cadastradas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarVagas}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/vagas/nova')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Vaga
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
                  placeholder="Buscar vagas por título, empresa ou local..." 
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

            {vagas.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma vaga cadastrada.</p>
                <button 
                  onClick={() => router.push('/admin/vagas/nova')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Cadastrar primeira vaga
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vaga</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Destaque</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.titulo}</td>
                        <td className="py-3 px-4 text-[#708090]">
                          {item.confidencial ? (
                            <span className="flex items-center gap-1 text-[#708090]">
                              <Lock className="h-3 w-3" /> Confidencial
                            </span>
                          ) : (
                            item.empresa
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status || 'Aberta'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#708090]">{item.candidatos || 0}</td>
                        <td className="py-3 px-4">
                          {item.exibir_carrossel ? (
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          ) : (
                            <StarOff className="h-5 w-5 text-gray-300" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/vagas/${item.id}`)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                            >
                              <Eye className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button 
                              onClick={() => router.push(`/admin/vagas/${item.id}/editar`)}
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
