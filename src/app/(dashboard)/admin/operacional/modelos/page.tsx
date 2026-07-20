'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  FileText, Plus, Search, Filter, Eye, Edit, Trash2,
  Copy, Clock, Users, Briefcase, CheckCircle,
  ArrowUpDown, MoreVertical, Download
} from 'lucide-react'

export default function OperacionalModelos() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const modelos = [
    { 
      id: 1, 
      nome: 'Entrevista Operacional',
      descricao: 'Modelo padrão para cargos operacionais',
      perguntas: 12,
      tempo: 15,
      cargos: ['Operador', 'Auxiliar', 'Soldador'],
      criado: '15/07/2026',
      ativo: true
    },
    { 
      id: 2, 
      nome: 'Entrevista Administrativa',
      descricao: 'Modelo para cargos administrativos',
      perguntas: 10,
      tempo: 20,
      cargos: ['Auxiliar Adm', 'Assistente', 'Analista'],
      criado: '10/07/2026',
      ativo: true
    },
    { 
      id: 3, 
      nome: 'Entrevista Liderança',
      descricao: 'Modelo para cargos de liderança e supervisão',
      perguntas: 15,
      tempo: 30,
      cargos: ['Supervisor', 'Coordenador', 'Gerente'],
      criado: '05/07/2026',
      ativo: true
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Modelos de Entrevista</h1>
            <p className="text-sm text-[#708090]">Gerencie modelos reutilizáveis de entrevistas</p>
          </div>
          <button 
            onClick={() => router.push('/admin/operacional/modelos/novo')}
            className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Modelo
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
              <input 
                type="text" 
                placeholder="Buscar modelos..." 
                className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modelos.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-[#E8EAE0] p-6 hover:shadow-lg transition hover:-translate-y-1 group">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-[#8B0000]/10 rounded-lg">
                    <FileText className="h-5 w-5 text-[#8B0000]" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#2D343A] mt-3 group-hover:text-[#8B0000] transition">{item.nome}</h3>
                <p className="text-sm text-[#708090] mt-1">{item.descricao}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#708090]">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> {item.perguntas} perguntas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {item.tempo} min
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.cargos.map((cargo, index) => (
                    <span key={index} className="px-2 py-0.5 bg-[#F8F4E6] rounded-full text-xs text-[#708090]">
                      {cargo}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#E8EAE0] flex items-center justify-between">
                  <span className="text-xs text-[#708090]">Criado em {item.criado}</span>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
