'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  ArrowLeft, Save, CheckCircle, Plus, Trash2,
  GripVertical, Layers, HelpCircle, Tag, Type,
  List, CheckSquare, Sliders, ToggleLeft,
  X, Edit, Copy, Eye, EyeOff, AlertCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function ConstrutorEntrevista() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const tipo = searchParams.get('tipo') || 'modelo'
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    tipo: 'padrao',
    perguntas: [] as any[],
    competencias: [] as string[]
  })
  const [novaPergunta, setNovaPergunta] = useState('')
  const [novaCompetencia, setNovaCompetencia] = useState('')
  const [tipoPergunta, setTipoPergunta] = useState('texto_longo')
  const [perguntaObrigatoria, setPerguntaObrigatoria] = useState(true)

  useEffect(() => {
    if (id) {
      carregarModelo()
    }
  }, [id])

  const carregarModelo = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('modelos_entrevista')
        .select('*')
        .eq('id', parseInt(id))
        .single()

      if (error) throw error
      if (data) {
        setForm({
          nome: data.nome || '',
          descricao: data.descricao || '',
          tipo: data.tipo || 'padrao',
          perguntas: data.perguntas || [],
          competencias: data.competencias || []
        })
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar modelo')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    if (!form.nome.trim()) {
      setError('Nome do modelo é obrigatório')
      setSaving(false)
      return
    }

    try {
      if (id) {
        const { error } = await supabase
          .from('modelos_entrevista')
          .update({
            nome: form.nome,
            descricao: form.descricao,
            tipo: form.tipo,
            perguntas: form.perguntas,
            competencias: form.competencias
          })
          .eq('id', parseInt(id))

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('modelos_entrevista')
          .insert([{
            nome: form.nome,
            descricao: form.descricao,
            tipo: form.tipo,
            perguntas: form.perguntas,
            competencias: form.competencias
          }])

        if (error) throw error
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/admin/operacional/modelos')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar modelo')
    } finally {
      setSaving(false)
    }
  }

  const adicionarPergunta = () => {
    if (!novaPergunta.trim()) return

    setForm({
      ...form,
      perguntas: [
        ...form.perguntas,
        {
          id: Date.now(),
          pergunta: novaPergunta,
          tipo: tipoPergunta,
          obrigatoria: perguntaObrigatoria
        }
      ]
    })
    setNovaPergunta('')
  }

  const removerPergunta = (id: number) => {
    setForm({
      ...form,
      perguntas: form.perguntas.filter(p => p.id !== id)
    })
  }

  const adicionarCompetencia = () => {
    if (!novaCompetencia.trim()) return
    setForm({
      ...form,
      competencias: [...form.competencias, novaCompetencia.trim()]
    })
    setNovaCompetencia('')
  }

  const removerCompetencia = (index: number) => {
    setForm({
      ...form,
      competencias: form.competencias.filter((_, i) => i !== index)
    })
  }

  const moverPergunta = (from: number, to: number) => {
    const items = [...form.perguntas]
    const [movedItem] = items.splice(from, 1)
    items.splice(to, 0, movedItem)
    setForm({ ...form, perguntas: items })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-12 text-center max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#2D343A]">Modelo salvo com sucesso!</h2>
              <p className="text-[#708090] mt-2">
                O modelo {form.nome} foi {id ? 'atualizado' : 'criado'}.
              </p>
              <button
                onClick={() => router.push('/admin/operacional/modelos')}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Modelos
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <Layers className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando...</p>
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/admin/operacional/modelos')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <Layers className="h-6 w-6 text-[#6B1A2A]" />
                {id ? 'Editar Modelo' : 'Novo Modelo'}
              </h1>
              <p className="text-sm text-[#708090]">Construa seu modelo de entrevista</p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar Modelo'}
          </button>
        </header>

        <div className="flex-1 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    Nome do Modelo <span className="text-[#6B1A2A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                    placeholder="Ex: Entrevista Operacional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Tipo</label>
                  <select
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                  >
                    <option value="padrao">Padrão</option>
                    <option value="operacional">Operacional</option>
                    <option value="administrativa">Administrativa</option>
                    <option value="lideranca">Liderança</option>
                    <option value="comercial">Comercial</option>
                    <option value="tecnica">Técnica</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Descrição</label>
                <textarea
                  rows={2}
                  className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition resize-none"
                  value={form.descricao}
                  onChange={(e) => setForm({...form, descricao: e.target.value})}
                  placeholder="Descreva o propósito deste modelo..."
                />
              </div>
            </div>

            {/* PERGUNTAS */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
              <h3 className="font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#6B1A2A]" />
                Perguntas ({form.perguntas.length})
              </h3>

              <div className="flex flex-wrap gap-3 mb-4">
                <input
                  type="text"
                  className="flex-1 min-w-[200px] px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] text-sm"
                  placeholder="Digite a pergunta..."
                  value={novaPergunta}
                  onChange={(e) => setNovaPergunta(e.target.value)}
                />
                <select
                  className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] bg-white text-sm"
                  value={tipoPergunta}
                  onChange={(e) => setTipoPergunta(e.target.value)}
                >
                  <option value="texto_curto">Texto Curto</option>
                  <option value="texto_longo">Texto Longo</option>
                  <option value="multipla_escolha">Múltipla Escolha</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="escala">Escala</option>
                  <option value="sim_nao">Sim/Não</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-[#2D343A]">
                  <input
                    type="checkbox"
                    checked={perguntaObrigatoria}
                    onChange={(e) => setPerguntaObrigatoria(e.target.checked)}
                    className="rounded border-[#E8EAE0] text-[#6B1A2A]"
                  />
                  Obrigatória
                </label>
                <button
                  type="button"
                  onClick={adicionarPergunta}
                  className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar
                </button>
              </div>

              <div className="space-y-2">
                {form.perguntas.length === 0 ? (
                  <p className="text-center text-[#708090] py-4 text-sm">
                    Nenhuma pergunta adicionada. Adicione perguntas acima.
                  </p>
                ) : (
                  form.perguntas.map((p, index) => {
                    const tipoLabel = {
                      'texto_curto': 'Texto Curto',
                      'texto_longo': 'Texto Longo',
                      'multipla_escolha': 'Múltipla Escolha',
                      'checkbox': 'Checkbox',
                     
