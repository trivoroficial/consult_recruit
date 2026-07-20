'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  HelpCircle, Plus, Search, Filter, Eye, Edit, Trash2,
  Copy, Clock, Users, Briefcase, CheckCircle,
  ArrowUpDown, MoreVertical, Download, Tag, MessageSquare
} from 'lucide-react'

export default function OperacionalPerguntas() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('todas')

  const perguntas = [
    { 
      id: 1, 
      texto: 'Quais são seus principais objetivos profissionais?',
      categoria: 'Objetivos',
      tipo: 'texto_longo',
      obrigatoria: true,
      usos: 45
    },
    { 
      id: 2, 
      texto: 'Quais competências considera fundamentais para exercer esta função?',
      categoria: 'Competências',
      tipo: 'texto_longo',
      obrigatoria: true,
      usos: 38
    },
    { 
      id: 3, 
      texto: 'Como costuma superar desafios profissionais?',
      categoria: 'Comportamental',
      tipo: 'texto_longo',
      obrigatoria: true,
      usos: 32
    },
    { 
      id: 4, 
      texto: 'Conte uma situação em que trabalhou sob pressão.',
      categoria: 'Comportamental',
      tipo: 'texto_longo',
      obrigatoria: false,
      usos: 28
    },
    { 
      id: 5, 
      texto: 'O que mais o motiva em um ambiente de trabalho?',
      categoria: 'Motivação',
      tipo: 'texto_longo',
      obrigatoria: false,
      usos: 25
    },
  ]

  const categorias = ['Todas', 'Objetivos', 'Competências', 'Comportamental', 'Motivação', 'Técnica']

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Biblioteca de Perguntas</h1>
            <p className="text-sm text-[#708090]">Gerencie perguntas reutilizáveis para entrevistas</p>
          </div>
          <button 
            onClick={() => router.push('/admin/operacional/perguntas/nova')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Pergunta
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar perguntas por texto ou categoria..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] bg-white"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F4E6]">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Pergunta</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Categoria</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Obrigatória</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Usos</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2D343A]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {perguntas.map((item) => (
                    <tr key={item.id} className="border-b border-[#E8EAE0] hover:bg-[#F8F4E6] transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-[#8B0000]" />
                          <span className="font-medium text-[#2D343A]">{item.texto}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-[#F8F4E6] rounded-full text-xs text-[#708090]">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#708090]">
                        {item.tipo === 'texto_longo' ? 'Texto longo' : 'Texto curto'}
                      </td>
                      <td className="py-3 px-4">
                        {item.obrigatoria ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-[#708090]">Opcional</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#708090]">{item.usos}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Visualizar">
                            <Eye className="h-4 w-4 text-[#708090]" />
                          </button>
                          <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Editar">
                            <Edit className="h-4 w-4 text-[#708090]" />
                          </button>
                          <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Duplicar">
                            <Copy className="h-4 w-4 text-[#708090]" />
                          </button>
                          <button className="p-1 hover:bg-[#F8F4E6] rounded" title="Excluir">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E8EAE0] text-sm text-[#708090]">
              <p>Mostrando {perguntas.length} perguntas</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Anterior</button>
                <button className="px-3 py-1 bg-[#8B0000] text-white rounded">1</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">2</button>
                <button className="px-3 py-1 border border-[#E8EAE0] rounded hover:bg-[#F8F4E6]">Próximo</button>
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
