'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  FileText, Plus, Search, Edit, Trash2, Eye, RefreshCw,
  Copy, CheckCircle, XCircle, Clock, Filter,
  Users, Award, Star, TrendingUp, Layers
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminModelos() {
  const router = useRouter()
  const [modelos, setModelos] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarModelos()
  }, [])

  const carregarModelos = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('modelos_entrevista')
        .select('*')
        .order('id', { ascending: false })

      if (error) throw error
      setModelos(data || [])
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar modelos')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este modelo?')) return

    try {
      const { error } = await supabase
        .from('modelos_entrevista')
        .delete()
        .eq('id', id)

      if (error) throw error
      await carregarModelos()
    } catch (err: any) {
      alert(err.message || 'Erro ao excluir modelo')
    }
  }

  const handleDuplicar = async (modelo: any) => {
    try {
      const { data, error } = await supabase
        .from('modelos_entrevista')
        .insert([{
          nome: `${modelo.nome} (cópia)`,
          descricao: modelo.descricao,
          perguntas: modelo.perguntas,
          competencias: modelo.competencias
        }])
        .select()

      if (error) throw error
      await carregarModelos()
      alert('✅ Modelo duplicado com sucesso!')
    } catch (err: any) {
      alert(err.message || 'Erro ao duplicar modelo')
    }
  }

  const filtered = modelos.filter(m =>
    m.nome?.toLowerCase().includes(search.toLowerCase()) ||
    m.descricao?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Layers className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando modelos...</p>
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
              <Layers className="h-6 w-6 text-[#6B1A2A]" />
              Modelos de Entrevista
            </h1>
            <p className="text-sm text-[#708090]">{modelos.length} modelos cadastrados</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarModelos}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
            <button 
              onClick={() => router.push('/admin/operacional/construtor')}
              className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Novo Modelo
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
                  placeholder="Buscar modelos..." 
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

            {modelos.length === 0 ? (
              <div className="text-center py-12">
                <Layers className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                <p className="text-[#708090]">Nenhum modelo cadastrado.</p>
                <button 
                  onClick={() => router.push('/admin/operacional/construtor')}
                  className="mt-4 px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
                >
                  Criar primeiro modelo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item) => {
                  const perguntas = item.perguntas || []
                  return (
                    <div
                      key={item.id}
                      className="border border-[#E8EAE0] rounded-xl p-4 hover:shadow-md transition hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-[#6B1A2A]" />
                            <p className="font-medium text-[#2D343A]">{item.nome}</p>
                          </div>
                          <p className="text-xs text-[#708090] mt-1">{item.descricao || 'Sem descrição'}</p>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => router.push(`/admin/operacional/construtor?id=${item.id}`)}
                            className="p-1 hover:bg-[#F8F4E6] rounded"
                            title="Editar"
                          >
                            <Edit className="h-3.5 w-3.5 text-[#708090]" />
                          </button>
                          <button 
                            onClick={() => handleDuplicar(item)}
                            className="p-1 hover:bg-[#F8F4E6] rounded"
                            title="Duplicar"
                          >
                            <Copy className="h-3.5 w-3.5 text-[#708090]" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-1 hover:bg-[#F8F4E6] rounded"
                            title="Excluir"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-[#E8EAE0]">
                        <div className="flex items-center gap-4 text-xs text-[#708090]">
                          <span>{perguntas.length} perguntas</span>
                          <span>•</span>
                          <span>{item.competencias?.length || 0} competências</span>
                        </div>
                        {perguntas.length > 0 && (
                          <div className="mt-2 text-xs text-[#708090]">
                            <span className="font-medium">Perguntas:</span>{' '}
                            {perguntas.slice(0, 2).map((p: any, i: number) => (
                              <span key={i}>"{p.pergunta}"{i < Math.min(perguntas.length, 2) - 1 ? ', ' : ''}</span>
                            ))}
                            {perguntas.length > 2 && <span>...</span>}
                          </div>
                        )}
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-[#F8F4E6] rounded-full text-[#708090]">
                          {item.tipo || 'Padrão'}
                        </span>
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
