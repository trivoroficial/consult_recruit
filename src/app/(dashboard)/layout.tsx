'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Briefcase, Users, UserCircle, 
  Settings, LogOut, ChevronLeft, ChevronRight,
  Building2
} from 'lucide-react'

const menuItems = [
  { href: '/empresa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/empresa/vagas', label: 'Vagas', icon: Briefcase },
  { href: '/empresa/candidatos', label: 'Candidatos', icon: Users },
  { href: '/empresa/perfil', label: 'Perfil', icon: Building2 },
  { href: '/empresa/configuracoes', label: 'Configurações', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50/80 flex pt-20">
      
      {/* ===== SIDEBAR ===== */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100/80 fixed left-0 top-20 bottom-0 transition-all duration-300 overflow-hidden`}>
        <div className="h-full flex flex-col">
          
          {/* MENU */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#8B0000]/10 text-[#8B0000]' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-[#8B0000]' : 'text-gray-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </nav>

          {/* FOOTER */}
          <div className="border-t border-gray-100 p-3">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>Sair</span>}
            </button>
          </div>

          {/* TOGGLE */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* ===== CONTEÚDO ===== */}
      <main className={`${collapsed ? 'ml-20' : 'ml-64'} flex-1 transition-all duration-300`}>
        {children}
      </main>

    </div>
  )
}
