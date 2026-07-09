'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Users, DollarSign, MessageCircle, FileText, Settings, LogOut } from 'lucide-react'

export function SidebarEmpresa() {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/empresa/dashboard' },
    { icon: Briefcase, label: 'Vagas', href: '/empresa/vagas' },
    { icon: Users, label: 'Candidatos', href: '/empresa/candidatos' },
    { icon: DollarSign, label: 'Financeiro', href: '/empresa/financeiro' },
    { icon: MessageCircle, label: 'Mensagens', href: '/empresa/mensagens' },
    { icon: FileText, label: 'Documentos', href: '/empresa/documentos' },
    { icon: Settings, label: 'Configurações', href: '/empresa/configuracoes' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-24">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            E
          </div>
          <div>
            <p className="font-semibold text-sm">Empresa XPTO</p>
            <p className="text-xs text-gray-500">Empresa</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sair</span>
        </Link>
      </div>
    </aside>
  )
}
