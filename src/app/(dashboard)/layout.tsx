'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarAdmin } from '@/components/layout/SidebarAdmin'
import { SidebarEmpresa } from '@/components/layout/SidebarEmpresa'
import { SidebarCandidato } from '@/components/layout/SidebarCandidato'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  
  // Verifica qual tipo de dashboard está sendo acessado pela URL
  const isAdmin = pathname?.startsWith('/admin')
  const isEmpresa = pathname?.startsWith('/empresa')
  const isCandidato = pathname?.startsWith('/candidato')

  // Função para renderizar a Sidebar correta dinamicamente
  const renderSidebar = () => {
    if (isAdmin) return <SidebarAdmin />
    if (isEmpresa) return <SidebarEmpresa />
    if (isCandidato) return <SidebarCandidato />
    
    // Retorna nada se for uma rota de dashboard não identificada
    return null 
  }

  return (
    <div className="flex min-h-screen bg-[#F8F4E6]">
      {/* Renderiza a Sidebar lateral apenas se for uma rota de dashboard válida */}
      {renderSidebar()}
      
      {/* Área principal de conteúdo do dashboard (onde as páginas serão renderizadas) */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
