'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'

function ConstrutorContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const tipo = searchParams.get('tipo') || 'modelo'

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">
              {id ? 'Editar Modelo' : 'Novo Modelo'}
            </h1>
            <p className="text-sm text-[#708090]">
              {id ? `Editando modelo ID: ${id}` : 'Criando novo modelo de entrevista'}
            </p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-8 text-center">
            <div className="py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-[#2D343A] mb-2">Construtor em Desenvolvimento</h2>
              <p className="text-[#708090]">
                Esta funcionalidade está em construção. 
                {id && ` Modelo ID: ${id}`}
                {!id && ' Crie um novo modelo de entrevista.'}
              </p>
              <p className="text-sm text-[#708090] mt-2">
                Tipo: {tipo === 'modelo' ? 'Modelo de Entrevista' : 'Pergunta'}
              </p>
              <button 
                onClick={() => window.location.href = '/admin/operacional/modelos'}
                className="mt-6 px-6 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition"
              >
                Voltar para Modelos
              </button>
            </div>
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
