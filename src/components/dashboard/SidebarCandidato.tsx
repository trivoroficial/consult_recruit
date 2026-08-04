'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  User, 
  FileText, 
  Search, 
  Briefcase, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  Star
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'  // ← CORRIGIDO: @/lib ao invés de @lib

export function SidebarCandidato() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState('Candidato')
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        const name = parsed.name || 'Candidato'
        const formattedName = name.split(' ').map((n: string) =>
          n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
        ).join(' ')
        setUserName(formattedName)
      } catch {
        setUserName('Candidato')
      }
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    await supabase.auth.signOut()
    router.push('/login')
  }

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/')
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/candidato' },
    { icon: User, label: 'Meu Perfil', href: '/candidato/perfil' },
    { icon: FileText, label: 'Currículo', href: '/candidato/curriculo' },
    { icon: Search, label: 'Buscar Vagas', href: '/candidato/vagas' },
    { icon: Star, label: 'Favoritas', href: '/candidato/favoritas' },
    { icon: Briefcase, label: 'Candidaturas', href: '/candidato/candidaturas' },
    { icon: Bell, label: 'Notificações', href: '/candidato/notificacoes' },
    { icon: Settings, label: 'Configurações', href: '/candidato/configuracoes' },
  ]

  return (
    <aside className={`bg-[#6B1A2A] text-white/80 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      {/* LOGO - 2cm altura */}
      <div className={`p-4 border-b border-white/10 flex items-center ${collapsed ? 'justify-center h-20' : 'h-24'}`}>
        <img 
          src="/logo.png" 
          alt="ZENTHOS" 
          className="object-contain"
          style={{
            height: '2cm',
            width: 'auto'
          }}
        />
      </div>

      {/* PERFIL */}
      <div className={`p-4 border-b border-white/10 ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-[#E3C9A8] rounded-full flex items-center justify-center text-[#6B1A2A] font-bold text-sm flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{userName}</p>
              <p className="text-xs text-[#E3C9A8] truncate">Candidato</p>
            </div>
          )}
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                active
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-3 px-3 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition ${collapsed ? 'justify-center' : ''}`}
        >
          <ChevronLeft className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span className="text-sm">Recolher</span>}
        </button>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 mt-2 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg transition ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
