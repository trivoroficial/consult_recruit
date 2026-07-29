'use client'

import { Suspense } from 'react'
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

// Componente que usa useSearchParams
function ConstrutorContent() {
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

  // ... resto do código do construtor

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
            onClick={() => {}}
            disabled={saving}
            className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Salvando...' : 'Salvar Modelo'}
          </button>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <p className="text-center text-[#708090] py-8">
              Construtor de modelos de entrevista - Em desenvolvimento
            </p>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}

export default function ConstrutorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-[#708090]">Carregando...</div>
          </div>
        </div>
      </div>
    }>
      <ConstrutorContent />
    </Suspense>
  )
}
