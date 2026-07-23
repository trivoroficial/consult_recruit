'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  Briefcase, Plus, Search, Edit, Trash2, Eye, X, Save, 
  Star, StarOff, Lock, Unlock, Filter
} from 'lucide-react'

// Importando as ações do servidor
import { 
  buscarTodasVagas, 
  atualizarVaga, 
  excluirVaga 
} from '@/actions/vagas'

export default function AdminVagas() {
  const router = useRouter()
  const [vagas, setVagas] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [editando, setEditando] = useState<string | null>(null) // Mudado para string (UUID do Supabase)
  const [editForm, setEditForm] = useState({ 
    titulo: '', 
    empresa: '', 
    status: 'Aberta', 
    candidatos: 0,
    exibirCarrossel: false, 
    badge: '', 
    corBadge: 'bg-purple-500', 
    confidencial: false,
    descricao: '',
    local: '',
    tipo: 'CLT'
  })
  const [loading, setLoading] = useState(true)

  // CARREGAR VAGAS DO SUPABASE
  useEffect(() => {
    const carregarVagas = async () => {
      setLoading(true)
      const resultado = await buscarTodasVagas()
      if (resultado.success) {
        setVagas(resultado.data)
      } else {
        console.error('Erro ao carregar:', resultado.message)
      }
      setLoading(false)
    }
    carregarVagas()
  }, [])

  // INICIAR EDIÇÃO
  const handleEdit = (id: string) => {
    const vaga = vagas.find(v => v.id === id)
    if (vaga) { 
      setEditForm({ 
        titulo: vaga.titulo || '', 
        empresa: vaga.empresa || '', 
        status: vaga.status || 'Aberta', 
        candidatos: vaga.candidatos || 0,
        exibirCarrossel: vaga.exibirCarrossel || false,
        badge: vaga.badge || '',
        corBadge: vaga.corBadge || 'bg-purple-500',
        confidencial: vaga.confidencial || false,
        descricao: vaga.descricao || '',
        local: vaga.local || '',
        tipo: vaga.tipo || 'CLT'
      })
      setEditando(id) 
    }
  }

  // SALVAR EDIÇÃO NO SUPABASE
  const handleSaveEdit = async () => {
    if (editando === null) return
    
    // Atualização otimista na tela (para parecer instantâneo)
    const updatedLocally = vagas.map(v => 
      v.id === editando ? { 
        ...v, 
        ...editForm,
        empresaExibida: editForm.confidencial ? 'Confidencial' : editForm.empresa
      } : v
    )
    setVagas(updatedLocally)

    // Envio real para o banco de dados
    const resultado = await atualizarVaga(editando, editForm)
    
    if (!resultado.success) {
      alert('Erro ao salvar: ' + resultado.message)
      // Reverte em caso de erro (opcional, mas recomendado)
      const resultadoRecarrega = await buscarTodasVagas()
      if (resultadoRecarrega.success) setVagas(resultadoRecarrega.data)
    }

    setEditando(null)
    setEditForm({ 
      titulo: '', empresa: '', status: 'Aberta', candidatos: 0, 
      exibirCarrossel: false, badge: '', corBadge: 'bg-purple-500', 
      confidencial: false, descricao: '', local: '', tipo: 'CLT' 
    })
  }

  // CANCELAR EDIÇÃO
  const handleCancelEdit = () => {
    setEditando(null)
    setEditForm({ 
      titulo: '', empresa: '', status: 'Aberta', candidatos: 0, 
      exibirCarrossel: false, badge: '', corBadge: 'bg-purple-500', 
      confidencial: false, descricao: '', local: '', tipo: 'CLT' 
    })
  }

  // EXCLUIR VAGA DO SUPABASE
  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.')) {
      // Remove da tela imediatamente
      setVagas(vagas.filter(v => v.id !== id))
      
      // Exclui do banco
      const resultado = await excluirVaga(id)
      if (!resultado.success) {
        alert('Erro ao excluir: ' + resultado.message)
        // Recarrega em caso de erro
        const resultadoRecarrega = await buscarTodasVagas()
        if (resultadoRecarrega.success) setVagas(resultadoRecarrega.data)
      }
    }
  }

  // ALTERNAR CARROSSEL NO SUPABASE
  const toggleCarrossel = async (id: string) => {
    const vaga = vagas.find(v => v.id === id)
    if (!vaga) return

    const novoValor = !vaga.exibirCarrossel
    
    // Atualiza na tela
    const updated = vagas.map(v => v.id === id ? { ...v, exibirCarrossel: novoValor } : v)
    setVagas(updated)

    // Salva no banco (enviando apenas o campo alterado)
    await atualizarVaga(id, { exibirCarrossel: novoValor })
  }

  // FILTRAR VAGAS (Localmente, para ser rápido)
  const filtered = vagas.filter(v =>
    v.titulo?.toLowerCase().includes(search.toLowerCase()) ||
    v.empresa?.toLowerCase().includes(search.toLowerCase()) ||
    (v.descricao && v.descricao.toLowerCase().includes(search.toLowerCase()))
  )

  // SE ESTIVER CARREGANDO
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#8B0000] text-xl flex items-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-[#8B0000] border-t-transparent rounded-full"></span>
            Carregando vagas do banco...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Vagas</h1>
            <p className="text-sm text-[#708090]">{vagas.length} vagas cadastradas no banco de dados</p>
          </div>
          <button 
            onClick={() => router.push('/admin/vagas/nova')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Vaga
          </button>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            
            {/* BUSCA */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar vagas por título, empresa ou descrição..." 
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="px-4 py-2.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]">
                <Filter className="h-4 w-4" />
                Filtrar
              </button>
            </div>

            {/* TABELA */}
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
                      
                      {/* EDIÇÃO INLINE */}
                      {editando === item.id ? (
                        <td className="py-3 px-4" colSpan={6}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.titulo} 
                              onChange={(e) => setEditForm({...editForm, titulo: e.target.value})} 
                              placeholder="Título" 
                            />
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.empresa} 
                              onChange={(e) => setEditForm({...editForm, empresa: e.target.value})} 
                              placeholder="Empresa" 
                            />
                            <input 
                              type="text" 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.local} 
                              onChange={(e) => setEditForm({...editForm, local: e.target.value})} 
                              placeholder="Local" 
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                            <select 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.status} 
                              onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                            >
                              <option value="Aberta">Aberta</option>
                              <option value="Em análise">Em análise</option>
                              <option value="Pausada">Pausada</option>
                              <option value="Fechada">Fechada</option>
                            </select>
                            <select 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.tipo} 
                              onChange={(e) => setEditForm({...editForm, tipo: e.target.value})}
                            >
                              <option value="CLT">CLT</option>
                              <option value="PJ">PJ</option>
                              <option value="Estágio">Estágio</option>
                              <option value="Temporário">Temporário</option>
                            </select>
                            <select 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.badge} 
                              onChange={(e) => setEditForm({...editForm, badge: e.target.value})}
                            >
                              <option value="">Sem badge</option>
                              <option value="Destaque">Destaque</option>
                              <option value="Urgente">Urgente</option>
                              <option value="Novo">Novo</option>
                              <option value="Premium">Premium</option>
                            </select>
                            <select 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                              value={editForm.corBadge} 
                              onChange={(e) => setEditForm({...editForm, corBadge: e.target.value})}
                            >
                              <option value="bg-purple-500">Roxo</option>
                              <option value="bg-red-500">Vermelho</option>
                              <option value="bg-green-500">Verde</option>
                              <option value="bg-yellow-500">Amarelo</option>
                              <option value="bg-blue-500">Azul</option>
                              <option value="bg-pink-500">Rosa</option>
                              <option value="bg-indigo-500">Índigo</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <textarea 
                              className="px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] resize-none"
                              value={editForm.descricao} 
                              onChange={(e) => setEditForm({...editForm, descricao: e.target.value})} 
                              placeholder="Descrição da vaga"
                              rows={2}
                            />
                            <div>
                              <label className="block text-sm text-[#708090] mb-1">Candidatos</label>
                              <input 
                                type="number" 
                                className="w-full px-3 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                                value={editForm.candidatos} 
                                onChange={(e) => setEditForm({...editForm, candidatos: parseInt(e.target.value) || 0})} 
                                placeholder="0" 
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]"
                                checked={editForm.exibirCarrossel} 
                                onChange={(e) => setEditForm({...editForm, exibirCarrossel: e.target.checked})} 
                              />
                              <span className="text-sm text-[#2D343A]">Exibir no Carrossel</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]"
                                checked={editForm.confidencial} 
                                onChange={(e) => setEditForm({...editForm, confidencial: e.target.checked})} 
                              />
                              <span className="text-sm text-[#2D343A]">Vaga Confidencial</span>
                            </label>
                            <div className="flex gap-2 ml-auto">
                              <button 
                                onClick={handleSaveEdit}
                                className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                              >
                                <Save className="h-4 w-4" /> Salvar no Banco
                              </button>
                              <button 
                                onClick={handleCancelEdit}
                                className="px-4 py-1.5 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-1"
                              >
                                <X className="h-4 w-4" /> Cancelar
                              </button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        // VISUALIZAÇÃO NORMAL
                        <>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-[#2D343A]">{item.titulo}</p>
                              {item.descricao && (
                                <p className="text-xs text-[#708090] truncate max-w-[200px]">{item.descricao}</p>
                              )}
                              {item.tipo && (
                                <span className="text-xs text-[#708090]">{item.tipo}</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {item.confidencial ? (
                              <span className="flex items-center gap-1 text-[#708090]">
                                <Lock className="h-3 w-3" /> Confidencial
                              </span>
                            ) : (
                              <div>
                                <span className="text-[#708090]">{item.empresa}</span>
                                {item.local && (
                                  <p className="text-xs text-[#708090]">{item.local}</p>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Aberta' ? 'bg-green-100 text-green-700' :
                              item.status === 'Em análise' ? 'bg-yellow-100 text-yellow-700' :
                              item.status === 'Pausada' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status}
                            </span>
                            {item.badge && (
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs text-white ${item.corBadge || 'bg-purple-500'}`}>
                                {item.badge}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-[#708090]">{item.candidatos || 0}</td>
                          <td className="py-3 px-4">
                            <button 
                              onClick={() => toggleCarrossel(item.id)}
                              className={`p-1 rounded-lg transition ${item.exibirCarrossel ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 hover:text-gray-400'}`}
                              title={item.exibirCarrossel ? 'Remover do carrossel' : 'Adicionar ao carrossel'}
                            >
                              {item.exibirCarrossel ? <Star className="h-5 w-5 fill-yellow-500" /> : <StarOff className="h-5 w-5" />}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => router.push(`/admin/vagas/${item.id}`)}
                                className="p-1 hover:bg-[#F8F4E6] rounded transition" 
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => handleEdit(item.id)}
                                className="p-1 hover:bg-[#F8F4E6] rounded transition" 
                                title="Editar"
                              >
                                <Edit className="h-4 w-4 text-[#708090]" />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-1 hover:bg-[#F8F4E6] rounded transition" 
                                title="Excluir"
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

            {/* MENSAGEM QUANDO NÃO HÁ VAGAS */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090] text-lg">Nenhuma vaga encontrada</p>
                <p className="text-sm text-[#708090]">Tente ajustar seus filtros ou criar uma nova vaga</p>
                <button 
                  onClick={() => router.push('/admin/vagas/nova')}
                  className="mt-4 px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Nova Vaga
                </button>
              </div>
            )}

            {/* RODAPÉ DA TABELA */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8EAE0] text-sm text-[#708090]">
              <p>Mostrando {filtered.length} de {vagas.length} vagas</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded-lg">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition">Próximo</button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
