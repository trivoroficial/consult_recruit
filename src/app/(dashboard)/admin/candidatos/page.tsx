'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Users, Plus, Search, Edit, Trash2, Eye, X, Save, Upload } from 'lucide-react'

const initialCandidatos = [
  { id: 1, nome: 'João Silva', cidade: 'Uberlândia/MG', status: 'Disponível', score: 94 },
  { id: 2, nome: 'Maria Santos', cidade: 'Uberlândia/MG', status: 'Em processo', score: 87 },
]

export default function AdminCandidatos() {
  const router = useRouter()
  const [candidatos, setCandidatos] = useState(initialCandidatos)
  const [search, setSearch] = useState('')
  const [editando, setEditando] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ nome: '', cidade: '', status: 'Disponível', score: 0 })

  useEffect(() => {
    const saved = localStorage.getItem('zenthos_candidatos')
    if (saved) setCandidatos(JSON.parse(saved))
  }, [])

  const saveCandidatos = (data: typeof candidatos) => {
    setCandidatos(data)
    localStorage.setItem('zenthos_candidatos', JSON.stringify(data))
  }

  const handleEdit = (id: number) => {
    const item = candidatos.find(c => c.id === id)
    if (item) { setEditForm(item); setEditando(id) }
  }

  const handleSaveEdit = () => {
    if (editando === null) return
    const updated = candidatos.map(c => c.id === editando ? { ...c, ...editForm } : c)
    saveCandidatos(updated)
    setEditando(null)
  }

  const handleCancelEdit = () => {
    setEditando(null)
    setEditForm({ nome: '', cidade: '', status: 'Disponível', score: 0 })
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este candidato?')) {
      saveCandidatos(candidatos.filter(c => c.id !== id))
    }
  }

  const filtered = candidatos.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.cidade.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Candidatos</h1>
            <p className="text-sm text-[#708090]">Gerencie o banco de talentos</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition font-medium flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Importar
            </button>
            <button 
              onClick={() => router.push('/admin/candidatos/novo')}
              className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Candidato
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
                  placeholder="Buscar candidatos..." 
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
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Cidade</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                      {editando === item.id ? (
                        <td className="py-3 px-4" colSpan={5}>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <input type="text" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.nome} onChange={(e) => setEditForm({...editForm, nome: e.target.value})} placeholder="Nome" />
                            <input type="text" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.cidade} onChange={(e) => setEditForm({...editForm, cidade: e.target.value})} placeholder="Cidade" />
                            <select className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                              <option value="Disponível">Disponível</option>
                              <option value="Em processo">Em processo</option>
                              <option value="Contratado">Contratado</option>
                              <option value="Inativo">Inativo</option>
                            </select>
                            <input type="number" className="px-3 py-2 border border-[#E8EAE0] rounded-lg" value={editForm.score} onChange={(e) => setEditForm({...editForm, score: parseInt(e.target.value)})} placeholder="Score" />
                          </div>
                          <div className="flex gap-2 mt-3">
                            <button onClick={handleSaveEdit} className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"><Save className="h-4 w-4" /> Salvar</button>
                            <button onClick={handleCancelEdit} className="px-4 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-1"><X className="h-4 w-4" /> Cancelar</button>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="py-3 px-4 font-medium text-[#2D343A]">{item.nome}</td>
                          <td className="py-3 px-4 text-[#708090]">{item.cidade}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Disponível' ? 'bg-green-100 text-green-700' :
                            item.status === 'Em processo' ? 'bg-yellow-100 text-yellow-700' :
                            item.status === 'Contratado' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>{item.status}</span></td>
                          <td className="py-3 px-4"><span className="font-medium text-[#8B0000]">{item.score}%</span></td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button onClick={() => router.push(`/admin/candidatos/${item.id}`)} className="p-1 hover:bg-[#F8F4E6] rounded"><Eye className="h-4 w-4 text-[#708090]" /></button>
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
