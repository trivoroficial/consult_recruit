'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Building2, Briefcase, DollarSign, MessageCircle, Settings, LogOut, BarChart3, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

export function SidebarAdmin() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('trivor_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('trivor_user')
    localStorage.removeItem('trivor_role')
    router.push('/login')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Usuários', href: '/admin/usuarios' },
    { icon: Building2, label: 'Empresas', href: '/admin/empresas' },
    { icon: Briefcase, label: 'Vagas', href: '/admin/vagas' },
    { icon: BarChart3, label: 'Relatórios', href: '/admin/relatorios' },
    { icon: DollarSign, label: 'Financeiro', href: '/admin/financeiro' },
    { icon: MessageCircle, label: 'Mensagens', href: '/admin/mensagens' },
    { icon: Shield, label: 'Segurança', href: '/admin/seguranca' },
    { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-24">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.avatar || 'A'}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name || 'Administrador'}</p>
            <p className="text-xs text-gray-500">Master</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
