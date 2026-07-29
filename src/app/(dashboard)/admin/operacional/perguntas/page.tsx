'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  HelpCircle, Plus, Search, Edit, Trash2, RefreshCw,
  CheckCircle, XCircle, Clock, Filter, Copy,
  Tag, Layers, FileText, Users, Award, Star
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminPerguntas() {
  const router = useRouter()
  const [perguntas, setPerguntas] = useState<any[]>([])
  const [categorias, setCategorias] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroCategoria, setFiltroCategoria] = useState('')

  useEffect(() => {
    carregarPerguntas()
  }, [])

  const carregarPerguntas = async () => {
    setLoading(true)
    setError(null)
    try {
      // Buscar perguntas da biblioteca
      const { data, error } = await supabase
        .from('perguntas_biblioteca')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      setPerguntas(data || [])

      // Extrair categorias únicas
      const cats = [...new Set((data || []).map((p: any) => p.categoria).filter(Boolean))]
      setCategorias(cats)
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar perguntas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta pergunta?')) return

    try {
      const { error } = await supabase
        .from('perguntas_biblioteca')
        .delete()
        .eq('id', id)

      if (error) throw error
      await carregarPerguntas()
    } catch (err: any) {
      alert(err.message || 'Erro ao excluir pergunta')
    }
  }

  const getTipoConfig = (tipo: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      'texto_curto': { label: 'Texto Curto', color: 'bg-blue-100 text-blue-700' },
      'texto_longo': { label: 'Texto Longo', color: 'bg-purple-100 text-purple-700' },
      'multipla_escolha': { label: 'Múltipla Escolha', color: 'bg-green-100 text-green-700' },
      'checkbox': { label: 'Checkbox', color: 'bg-yellow-100 text-yellow-700' },
      'escala': { label: 'Escala', color: 'bg-red-100 text-red-700' },
      'sim_nao': { label: 'Sim/Não', color: 'bg-gray-100 text-gray-700' }
    }
    return configs[tipo] || configs['texto_curto']
  }

  const filtered = perguntas.filter(p =>
    p.pergunta?.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(search.toLowerCase())
  ).filter(p => filtroCategoria ? p.categoria === filtroCategoria : true)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <HelpCircle className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando perguntas...</p>
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
              <HelpCircle className="h-6 w-6 text-[#6B1A2A]" />
              Biblioteca de Perguntas
            </h1>
            <p className="text-sm text-[#708090]">{perguntas.length} perguntas cadastradas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarPerguntas}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/construtor?tipo=pergunta')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Nova Pergunta
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar perguntas..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {categorias.length > 0 && (
                <select
                  className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {perguntas.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhuma pergunta cadastrada.</p>
                <button 
                  onClick={() => router.push('/admin/operacional/construtor?tipo=pergunta')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Criar primeira pergunta
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => {
                  const tipoConfig = getTipoConfig(item.tipo)
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${tipoConfig.color}`}>
                          <HelpCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-[#2D343A]">{item.pergunta}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#708090]">
                            <span className={`px-1.5 py-0.5 rounded-full ${tipoConfig.color}`}>
                              {tipoConfig.label}
                            </span>
                            {item.categoria && (
                              <span className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {item.categoria}
                              </span>
                            )}
                            {item.obrigatoria && (
                              <span className="text-[#6B1A2A]">* Obrigatória</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => router.push(`/admin/operacional/construtor?tipo=pergunta&id=${item.id}`)}
                          className="p-1.5 hover:bg-[#E8EAE0] rounded-lg transition"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
