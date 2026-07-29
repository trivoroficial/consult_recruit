'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Building2, Plus, Search, Edit, Trash2, Eye, RefreshCw } from 'lucide-react'
import { listarEmpresas, excluirEmpresa } from '@/actions/empresas'

export default function AdminEmpresas() {
  const router = useRouter()
  const [empresas, setEmpresas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarEmpresas()
  }, [])

  const carregarEmpresas = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarEmpresas()
      if (result.success) {
        setEmpresas(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar empresas')
      }
    } catch (err) {
      setError('Erro ao carregar empresas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return

    try {
      const result = await excluirEmpresa(id)
      if (result.success) {
        await carregarEmpresas()
      } else {
        alert(result.error || 'Erro ao excluir empresa')
      }
    } catch (error) {
      alert('Erro ao excluir empresa')
    }
  }

  const filtered = empresas.filter(e =>
    e.nome?.toLowerCase().includes(search.toLowerCase()) ||
    e.cnpj?.includes(search) ||
    e.cidade?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando empresas...</p>
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
            <h1 className="text-2xl font-bold text-[#2D343A]">Empresas</h1>
            <p className="text-sm text-[#708090]">{empresas.length} empresas cadastradas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarEmpresas}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/empresas/nova')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Empresa
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
                  placeholder="Buscar empresas..." 
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

            {empresas.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma empresa cadastrada.</p>
                <button 
                  onClick={() => router.push('/admin/empresas/nova')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Cadastrar primeira empresa
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F4E6]">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">CNPJ</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cidade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                        <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cnpj || '-'}</td>
                        <td className="py-3 px-4 text-[#708090]">{item.cidade || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                            item.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status || 'Ativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => router.push(`/admin/empresas/${item.id}`)}
                              className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar"
                            >
                              <Eye className="h-4 w-4 text-[#708090]" />
                            </button>
                            <button 
                              onClick={() => router.push(`/admin/empresas/${item.id}/editar`)}
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
