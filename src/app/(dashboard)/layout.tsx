// src/app/(dashboard)/layout.tsx
'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  
  // Verifica se é admin, empresa ou candidato
  const isAdmin = pathname?.startsWith('/admin')
  const isEmpresa = pathname?.startsWith('/empresa')
  const isCandidato = pathname?.startsWith('/candidato')

  // Determina qual sidebar usar
  const getSidebar = () => {
    // Os sidebars serão importados dinamicamente nos componentes filhos
    return children
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6]">
      {children}
    </div>
  )
}
