'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Building2, Plus, Search, Edit, Trash2, Eye, X, Save } from 'lucide-react'

export default function AdminEmpresas() {
  const router = useRouter()
  const [empresas, setEmpresas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [editando, setEditando] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ nome: '', cnpj: '', cidade: '', status: 'Ativo' })
  const [loading, setLoading] = useState(true)

  // CARREGAR EMPRESAS DO LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem('zenthos_empresas')
    if (saved) {
      setEmpresas(JSON.parse(saved))
    } else {
      // Dados iniciais se não houver nada
      const initialEmpresas = [
        { id: 1, nome: 'Empresa XPTO', cnpj: '12.345.678/0001-99', cidade: 'Uberlândia/MG', status: 'Ativo' },
        { id: 2, nome: 'Indústria ABC', cnpj: '98.765.432/0001-11', cidade: 'Uberlândia/MG', status: 'Ativo' },
      ]
      setEmpresas(initialEmpresas)
      localStorage.setItem('zenthos_empresas', JSON.stringify(initialEmpresas))
    }
    setLoading(false)
  }, [])

  const saveEmpresas = (data: typeof empresas) => {
    setEmpresas(data)
    localStorage.setItem('zenthos_empresas', JSON.stringify(data))
  }

  const handleEdit = (id: number) => {
    const empresa = empresas.find(e => e.id === id)
    if (empresa) {
      setEditForm(empresa)
      setEditando(id)
    }
  }

  const handleSaveEdit = () => {
    if (editando === null) return
    const updated = empresas.map(e => 
      e.id === editando ? { ...e, ...editForm } : e
    )
    saveEmpresas(updated)
    setEditando(null)
    setEditForm({ nome: '', cnpj: '', cidade: '', status: 'Ativo' })
  }

  const handleCancelEdit = () => {
    setEditando(null)
    setEditForm({ nome: '', cnpj: '', cidade: '', status: 'Ativo' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      const updated = empresas.filter(e => e.id !== id)
      saveEmpresas(updated)
    }
  }

  const filtered = empresas.filter(e =>
    e.nome.toLowerCase().includes(search.toLowerCase()) ||
    e.cnpj.includes(search) ||
    e.cidade.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl">Carregando...</div>
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
          <button 
            onClick={() => router.push('/admin/empresas/nova')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Empresa
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar empresas..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

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
                      {editando === item.id ? (
                        <td className="py-3 px-4" colSpan={5}>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg"
                              value={editForm.nome}
                              onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                              placeholder="Nome"
                            />
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg"
                              value={editForm.cnpj}
                              onChange={(e) => setEditForm({...editForm, cnpj: e.target.value})}
                              placeholder="CNPJ"
                            />
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg"
                              value={editForm.cidade}
                              onChange={(e) => setEditForm({...editForm, cidade: e.target.value})}
                              placeholder="Cidade"
                            />
                            <select 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg"
                              value={editForm.status}
                              onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                            >
                              <option value="Ativo">Ativo</option>
                              <option value="Inativo">Inativo</option>
                              <option value="Pendente">Pendente</option>
                            </select>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button 
                              onClick={handleSaveEdit}
                              className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                            >
                              <Save className="h-4 w-4" /> Salvar
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="px-4 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-1"
                            >
                              <X className="h-4 w-4" /> Cancelar
                            </button>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.cnpj}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.cidade}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                              item.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {item.status}
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
                                onClick={() => handleEdit(item.id)}
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
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-8 text-[#708090]">
                Nenhuma empresa encontrada.
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
