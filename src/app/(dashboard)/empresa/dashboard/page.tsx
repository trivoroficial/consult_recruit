'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Building2, Briefcase, Users, DollarSign } from 'lucide-react'

export default function DashboardEmpresa() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const verificarLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }

      setUser(session.user)
      setLoading(false)
    }

    verificarLogin()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-600 text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Bem-vindo, <span className="text-purple-600">{user?.user_metadata?.name || 'Empresa'}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Vagas Abertas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Candidatos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 0</p>
                <p className="text-sm text-gray-500">Investimento</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Building2 className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-500">Contratações</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Últimas Vagas</h2>
            <p className="text-gray-500 text-center py-8">
              Nenhuma vaga publicada ainda.
            </p>
            <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Publicar Vaga
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Candidatos Recentes</h2>
            <p className="text-gray-500 text-center py-8">
              Nenhum candidato recebido.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
