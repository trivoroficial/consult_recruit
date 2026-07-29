'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, Building2, Users, Briefcase, BarChart3, 
  CreditCard, Settings, LogOut, QrCode, FileText, 
  Calendar, Database, Shield, UsersRound, ClipboardList,
  MessageCircle, TrendingUp, UserCheck, Award,
  ChevronDown, ChevronRight, ChevronLeft, Menu, X,
  Sun, Moon, User, LogIn, HelpCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export function SidebarAdmin() {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState('Administrador')
  const [userRole, setUserRole] = useState('Master')
  const [collapsed, setCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['gestao', 'financas', 'suporte'])

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUserName(parsed.name || 'Administrador')
        setUserRole(parsed.role || 'Master')
      } catch {
        setUserName('Administrador')
        setUserRole('Master')
      }
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    await supabase.auth.signOut()
    router.push('/login')
  }

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/')
  }

  const menuGroups = [
    {
      id: 'gestao',
      label: 'Gestão',
      icon: Building2,
      items: [
        { icon: Building2, label: 'Empresas', href: '/admin/empresas' },
        { icon: Users, label: 'Candidatos', href: '/admin/candidatos' },
        { icon: UsersRound, label: 'Operacional', href: '/admin/operacional/dashboard' },
        { icon: Briefcase, label: 'Vagas', href: '/admin/vagas' },
        { icon: FileText, label: 'Processos', href: '/admin/processos' },
      ]
    },
    {
      id: 'financas',
      label: 'Finanças',
      icon: CreditCard,
      items: [
        { icon: CreditCard, label: 'Financeiro', href: '/admin/financeiro' },
        { icon: BarChart3, label: 'Relatórios', href: '/admin/relatorios' },
      ]
    },
    {
      id: 'suporte',
      label: 'Suporte',
      icon: Settings,
      items: [
        { icon: Calendar, label: 'Agenda', href: '/admin/agenda' },
        { icon: QrCode, label: 'QR Code Center', href: '/admin/qrcode' },
        { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
        { icon: Shield, label: 'Controle de Acessos', href: '/admin/acessos' },
        { icon: Database, label: 'Backup', href: '/admin/backup' },
      ]
    }
  ]

  return (
    <aside className={`bg-[#1A1A2E] text-white/70 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      
      <div className={`p-4 border-b border-white/10 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed ? (
          <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto object-contain brightness-0 invert" />
        ) : (
          <img src="/logo.png" alt="ZENTHOS" className="h-8 w-auto object-contain brightness-0 invert" />
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-white/10 rounded-lg transition"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <div className={`p-4 border-b border-white/10 ${collapsed ? 'text-center' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {userName.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{userName}</p>
              <p className="text-xs text-white/50 truncate">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition mb-1 ${
            isActive('/admin/dashboard')
              ? 'bg-[#8B0000]/20 text-white'
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Home className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Dashboard</span>}
        </Link>

        {menuGroups.map((group) => {
          const Icon = group.icon
          const isExpanded = expandedMenus.includes(group.id)
          
          return (
            <div key={group.id} className="mt-2">
              <button
                onClick={() => toggleMenu(group.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left ${
                  isExpanded ? 'text-white' : 'text-white/50'
                } hover:bg-white/5 hover:text-white`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="text-xs font-medium uppercase tracking-wider flex-1">
                      {group.label}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </button>

              {isExpanded && !collapsed && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                          isActive(item.href)
                            ? 'bg-[#8B0000]/20 text-white'
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <ItemIcon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition w-full"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
