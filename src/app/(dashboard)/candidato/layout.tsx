'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'

export default function CandidatoLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  // Verifica se está na página de login ou cadastro
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/cadastro')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex">
      <SidebarCandidato />
      <div className="flex-1 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
