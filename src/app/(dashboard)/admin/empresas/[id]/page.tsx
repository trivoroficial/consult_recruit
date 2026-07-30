'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  ArrowLeft, Building2, MapPin, Calendar, Users, 
  Briefcase, Edit, Trash2, Mail, Phone, Globe, Shield,
  CheckCircle, XCircle, Clock
} from 'lucide-react'
import { buscarEmpresaPorId, excluirEmpresa } from '@/actions/empresas'

export default function VisualizarEmpresa() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [empresa, setEmpresa] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    carregarEmpresa()
  }, [id])

  const carregarEmpresa = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await buscarEmpresaPorId(parseInt(id))
      if (result.success) {
        setEmpresa(result.data)
      } else {
        setError(result.error || 'Empresa não encontrada')
      }
    } catch (err) {
      setError('Erro ao carregar empresa')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return
    try {
      const result = await excluirEmpresa(parseInt(id))
      if (result.success) {
        router.push('/admin/empresas')
      } else {
        alert(result.error || 'Erro ao excluir empresa')
      }
    } catch (error) {
      alert('Erro ao excluir empresa')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-[#6B1A2A] text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!empresa || error) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex flex-col items-center justify-center">
          <Building2 className="h-16 w-16 text-[#708090] mb-4" />
          <h2 className="text-2xl font-bold text-[#2D343A]">Empresa não encontrada</h2>
          <p className="text-[#708090]">{error || 'A empresa que você está procurando não existe.'}</p>
          <button 
            onClick={() => router.push('/admin/empresas')}
            className="mt-4 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Empresas
          </button>
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
              onClick={() => router.push('/admin/empresas')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A]">{empresa.nome}</h1>
              <p className="text-sm text-[#708090]">Detalhes da empresa</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push(`/admin/empresas/${id}/editar`)}
              className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#6B1A2A]/10 rounded-2xl flex items-center justify-center text-[#6B1A2A] text-3xl font-bold">
                {empresa.nome?.charAt(0) || 'E'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#2D343A]">{empresa.nome}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    empresa.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                    empresa.status === 'Inativo' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {empresa.status || 'Ativo'}
                  </span>
                  <span className="text-sm text-[#708090]">• CNPJ: {empresa.cnpj || 'Não informado'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <MapPin className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Localização</p>
                  <p className="font-medium text-[#2D343A]">{empresa.cidade || 'Não informado'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Calendar className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Cadastro</p>
                  <p className="font-medium text-[#2D343A]">{new Date(empresa.created_at || Date.now()).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Users className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Funcionários</p>
                  <p className="font-medium text-[#2D343A]">{empresa.funcionarios || '0'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F4E6] rounded-lg">
                <Briefcase className="h-5 w-5 text-[#6B1A2A]" />
                <div>
                  <p className="text-sm text-[#708090]">Vagas Ativas</p>
                  <p className="font-medium text-[#2D343A]">{empresa.vagas_ativas || '0'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 border border-[#E8EAE0] rounded-lg">
              <h3 className="font-semibold text-[#2D343A] mb-2">Descrição</h3>
              <p className="text-[#708090] text-sm">
                {empresa.descricao || 'Nenhuma descrição cadastrada para esta empresa.'}
              </p>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
