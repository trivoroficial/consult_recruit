'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  GripVertical, Plus, Save, ArrowLeft, CheckCircle,
  MessageSquare, Trash2, Copy, ArrowUp, ArrowDown,
  Edit, Eye, Clock, Users, Briefcase
} from 'lucide-react'

export default function OperacionalConstrutor() {
  const router = useRouter()
  const [nome, setNome] = useState('Nova Entrevista')
  const [descricao, setDescricao] = useState('Descrição do modelo')
  const [perguntas, setPerguntas] = useState([
    { id: 1, texto: 'Quais são seus principais objetivos profissionais?', tipo: 'texto_longo', obrigatoria: true },
    { id: 2, texto: 'Quais competências considera fundamentais para esta função?', tipo: 'texto_longo', obrigatoria: true },
    { id: 3, texto: 'Como costuma superar desafios profissionais?', tipo: 'texto_longo', obrigatoria: false },
  ])

  const [novaPergunta, setNovaPergunta] = useState('')

  const adicionarPergunta = () => {
    if (novaPergunta.trim()) {
      setPerguntas([...perguntas, { 
        id: Date.now(), 
        texto: novaPergunta, 
        tipo: 'texto_longo', 
        obrigatoria: false 
      }])
      setNovaPergunta('')
    }
  }

  const removerPergunta = (id: number) => {
    setPerguntas(perguntas.filter(p => p.id !== id))
  }

  const moverPergunta = (index: number, direcao: 'up' | 'down') => {
    const novoIndex = direcao === 'up' ? index - 1 : index + 1
    if (novoIndex < 0 || novoIndex >= perguntas.length) return
    const newPerguntas = [...perguntas]
    const [item] = newPerguntas.splice(index, 1)
    newPerguntas.splice(novoIndex, 0, item)
    setPerguntas(newPerguntas)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/admin/operacional/modelos')} className="p-2 hover:bg-[#F8F4E6] rounded-lg transition">
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">Construtor de Entrevistas</h1>
              <p className="text-sm text-[#708090]">Monte sua entrevista arrastando perguntas</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
            <Save className="h-4 w-4" />
            Salvar Modelo
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PAINEL ESQUERDO - CONFIGURAÇÃO */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4">Informações</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Nome do Modelo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Descrição</label>
                    <textarea 
                      rows={2}
                      className="w-full px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] resize-none"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4">Adicionar Pergunta</h3>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    placeholder="Digite a pergunta..."
                    value={novaPergunta}
                    onChange={(e) => setNovaPergunta(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && adicionarPergunta()}
                  />
                  <button 
                    onClick={adicionarPergunta}
                    className="p-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-[#708090]">
                  Dica: Pressione Enter para adicionar rapidamente
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6">
                <h3 className="text-lg font-semibold text-[#2D343A] mb-4">Resumo</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#708090]">Total de perguntas</span>
                    <span className="font-medium text-[#2D343A]">{perguntas.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#708090]">Obrigatórias</span>
                    <span className="font-medium text-[#2D343A]">{perguntas.filter(p => p.obrigatoria).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#708090]">Tempo estimado</span>
                    <span className="font-medium text-[#2D343A]">{perguntas.length * 2} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PAINEL DIREITO - CONSTRUTOR */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#2D343A]">Perguntas</h3>
                  <span className="text-sm text-[#708090]">Arraste para reorganizar</span>
                </div>

                <div className="space-y-3">
                  {perguntas.map((pergunta, index) => (
                    <div 
                      key={pergunta.id} 
                      className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg border border-[#E8EAE0] hover:border-[#8B0000]/30 transition group"
                    >
                      <div className="cursor-move text-[#708090]">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-[#8B0000]" />
                          <span className="font-medium text-[#2D343A]">{pergunta.texto}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-[#708090]">
                          <span>Tipo: Texto longo</span>
                          <span>{pergunta.obrigatoria ? 'Obrigatória' : 'Opcional'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button 
                          onClick={() => moverPergunta(index, 'up')}
                          className="p-1 hover:bg-[#F8F4E6] rounded"
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => moverPergunta(index, 'down')}
                          className="p-1 hover:bg-[#F8F4E6] rounded"
                          disabled={index === perguntas.length - 1}
                        >
                          <ArrowDown className="h-4 w-4 text-[#708090]" />
                        </button>
                        <button 
                          onClick={() => removerPergunta(pergunta.id)}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {perguntas.length === 0 && (
                  <div className="text-center py-12 text-[#708090]">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#E8EAE0]" />
                    <p>Nenhuma pergunta adicionada</p>
                    <p className="text-sm">Adicione perguntas ao lado esquerdo</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => router.push('/admin/operacional/modelos')}
                  className="px-6 py-3 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition text-[#708090]"
                >
                  Cancelar
                </button>
                <button className="px-6 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Salvar Modelo
                </button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
