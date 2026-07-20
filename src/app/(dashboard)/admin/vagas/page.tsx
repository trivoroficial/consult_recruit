'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Briefcase, Plus, Search, Edit, Trash2, Eye, X, Save, Star, StarOff } from 'lucide-react'

const initialVagas = [
  { id: 1, titulo: 'Analista Administrativo', empresa: 'XPTO', status: 'Aberta', candidatos: 12, exibirCarrossel: true, badge: 'Destaque', corBadge: 'bg-purple-500' },
  { id: 2, titulo: 'Auxiliar de RH', empresa: 'ABC', status: 'Em análise', candidatos: 8, exibirCarrossel: false, badge: '', corBadge: '' },
]

export default function AdminVagas() {
  const router = useRouter()
  const [vagas, setVagas] = useState(initialVagas)
  const [search, setSearch] = useState('')
  const [editando, setEditando] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ 
    titulo: '', empresa: '', status: 'Aberta', candidatos: 0,
    exibirCarrossel: false, badge: '', corBadge: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_vagas')
    if (saved) setVagas(JSON.parse(saved))
  }, [])

  const saveVagas = (data: typeof vagas) => {
    setVagas(data)
    localStorage.setItem('zenthos_vagas', JSON.stringify(data))
  }

  const handleEdit = (id: number) => {
    const item = vagas.find(v => v.id === id)
    if (item) { 
      setEditForm({ 
        titulo: item.titulo, 
        empresa: item.empresa, 
        status: item.status, 
        candidatos: item.candidatos,
        exibirCarrossel: item.exibirCarrossel || false,
        badge: item.badge || '',
        corBadge: item.corBadge || ''
      })
      setEditando(id) 
    }
  }

  const handleSaveEdit = () => {
    if (editando === null) return
    const updated = vagas.map(v => v.id === editando ? { ...v, ...editForm } : v)
    saveVagas(updated)
    setEditando(null)
  }

  const handleCancelEdit = () => {
    setEditando(null)
    setEditForm({ titulo: '', empresa: '', status: 'Aberta', candidatos: 0, exibirCarrossel: false, badge: '', corBadge: '' })
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      saveVagas(vagas.filter(v => v.id !== id))
    }
  }

  const toggleCarrossel = (id: number) => {
    const updated = vagas.map(v => 
      v.id === id ? { ...v, exibirCarrossel: !v.exibirCarrossel } : v
    )
    saveVagas(updated)
  }

  const filtered = vagas.filter(v =>
    v.titulo.toLowerCase().includes(search.toLowerCase()) ||
    v.empresa.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Vagas</h1>
            <p className="text-sm text-[#708090]">Gerencie todas as vagas</p>
          </div>
          <button 
            onClick={() => router.push('/admin/vagas/nova')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input type="text" placeholder="Buscar vagas..." className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <span className="text-sm text-[#708090]">{filtered.length} vagas</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Vaga</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Empresa</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Candidatos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Carrossel</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                      {editando === item.id ? (
                        <td className="py-3 px-4" colSpan={6}>
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                            <input type="text" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.titulo} onChange={(e) => setEditForm({...editForm, titulo: e.target.value})} placeholder="Título" />
                            <input type="text" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.empresa} onChange={(e) => setEditForm({...editForm, empresa: e.target.value})} placeholder="Empresa" />
                            <select className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                              <option value="Aberta">Aberta</option>
                              <option value="Em análise">Em análise</option>
                              <option value="Pausada">Pausada</option>
                              <option value="Fechada">Fechada</option>
                            </select>
                            <input type="number" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.candidatos} onChange={(e) => setEditForm({...editForm, candidatos: parseInt(e.target.value)})} placeholder="Candidatos" />
                            <select className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.badge} onChange={(e) => setEditForm({...editForm, badge: e.target.value})}>
                              <option value="">Sem badge</option>
                              <option value="Destaque">Destaque</option>
                              <option value="Urgente">Urgente</option>
                              <option value="Novo">Novo</option>
                              <option value="Premium">Premium</option>
                            </select>
                            <select className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.corBadge} onChange={(e) => setEditForm({...editForm, corBadge: e.target.value})}>
                              <option value="bg-purple-500">Roxo</option>
                              <option value="bg-red-500">Vermelho</option>
                              <option value="bg-green-500">Verde</option>
                              <option value="bg-yellow-500">Amarelo</option>
                              <option value="bg-blue-500">Azul</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="rounded border-[#E8EAE0] text-[#8B0000]" checked={editForm.exibirCarrossel} onChange={(e) => setEditForm({...editForm, exibirCarrossel: e.target.checked})} />
                              <span className="text-sm text-[#2D343A]">Exibir no Carrossel</span>
                            </label>
                            <div className="flex gap-2">
                              <button onClick={handleSaveEdit} className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"><Save className="h-4 w-4" /> Salvar</button>
                              <button onClick={handleCancelEdit} className="px-4 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-1"><X className="h-4 w-4" /> Cancelar</button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.titulo}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.empresa}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                            item.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                            item.status === 'Pausada' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>{item.status}</span></td>
                          <td className="py-3 px-4 text-[#708090]">{item.candidatos}</td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => toggleCarrossel(item.id)}
                              className={`p-1 rounded-lg transition ${item.exibirCarrossel ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 hover:text-gray-400'}`}
                              title={item.exibirCarrossel ? 'Remover do carrossel' : 'Adicionar ao carrossel'}
                            >
                              {item.exibirCarrossel ? <Star className="h-5 w-5 fill-yellow-500" /> : <StarOff className="h-5 w-5" />}
                            </button>
                            {item.exibirCarrossel && item.badge && (
                              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs text-white ${item.corBadge || 'bg-purple-500'}`}>
                                {item.badge}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button onClick={() => router.push(`/admin/vagas/${item.id}`)} className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
                              <button onClick={() => handleEdit(item.id)} className="p-1 hover:bg-[#F8F4E6] rounded"><Edit className="h-4 w-4 text-[#708090]" /></button>
                              <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-[#F8F4E6] rounded"><Trash2 className="h-4 w-4 text-red-500" /></button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
