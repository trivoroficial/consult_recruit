'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarEmpresa } from '@/components/dashboard/SidebarEmpresa'

export default function EmpresaLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/cadastro')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex">
      <SidebarEmpresa />
      <div className="flex-1 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  )
}
