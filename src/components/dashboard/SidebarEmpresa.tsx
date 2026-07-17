'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, Briefcase, Users, Calendar, DollarSign, Settings, LogOut
} from 'lucide-react'

export function SidebarEmpresa() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    router.push('/login')
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/empresa/dashboard' },
    { icon: Briefcase, label: 'Minhas Vagas', href: '/empresa/vagas' },
    { icon: Users, label: 'Candidatos', href: '/empresa/candidatos' },
    { icon: Calendar, label: 'Processos', href: '/empresa/processos' },
    { icon: DollarSign, label: 'Financeiro', href: '/empresa/financeiro' },
    { icon: Settings, label: 'Configurações', href: '/empresa/configuracoes' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-[#E8EAE0] h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* LOGO 2cm */}
      <div className="p-4 border-b border-[#E8EAE0] flex justify-center">
        <img 
          src="/logo.png" 
          alt="ZENTHOS" 
          className="h-[2cm] w-auto object-contain"
        />
      </div>

      {/* PERFIL */}
      <div className="p-4 border-b border-[#E8EAE0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B0000]/10 rounded-full flex items-center justify-center text-[#8B0000] font-bold text-sm">
            E
          </div>
          <div>
            <p className="font-semibold text-sm text-[#2D343A]">Empresa</p>
            <p className="text-xs text-[#708090]">Cliente</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                isActive
                  ? 'bg-[#8B0000]/10 text-[#8B0000] font-medium'
                  : 'text-[#708090] hover:bg-[#F8F4E6]'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* SAIR */}
      <div className="p-4 border-t border-[#E8EAE0]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
