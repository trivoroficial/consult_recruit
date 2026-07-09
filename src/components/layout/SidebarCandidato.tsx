'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, FileText, Briefcase, ClipboardList, MessageCircle, Settings, LogOut } from 'lucide-react'

export function SidebarCandidato() {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/candidato/dashboard' },
    { icon: User, label: 'Perfil', href: '/candidato/perfil' },
    { icon: FileText, label: 'Currículo', href: '/candidato/curriculo' },
    { icon: Briefcase, label: 'Vagas', href: '/candidato/vagas' },
    { icon: ClipboardList, label: 'Candidaturas', href: '/candidato/candidaturas' },
    { icon: MessageCircle, label: 'Mensagens', href: '/candidato/mensagens' },
    { icon: Settings, label: 'Configurações', href: '/candidato/configuracoes' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-24">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
            JC
          </div>
          <div>
            <p className="font-semibold text-sm">João Silva</p>
            <p className="text-xs text-gray-500">Candidato</p>
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
