'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Building2, 
  Users, 
  Briefcase, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  QrCode,
  FileText,
  Calendar,
  UsersRound,
  Award,
  TrendingUp,
  Shield,
  UserCog
} from 'lucide-react'

export function SidebarAdmin() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    router.push('/login')
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Building2, label: 'Empresas', href: '/admin/empresas' },
    { icon: Users, label: 'Candidatos', href: '/admin/candidatos' },
    { icon: Briefcase, label: 'Vagas', href: '/admin/vagas' },
    // MÓDULO OPERACIONAL
    { icon: UsersRound, label: 'Operacional', href: '/admin/operacional/dashboard' },
    { icon: Award, label: 'Banco de Talentos', href: '/admin/operacional/banco-talentos' },
    { icon: TrendingUp, label: 'Contratações', href: '/admin/operacional/contratacoes' },
    // FIM MÓDULO OPERACIONAL
    { icon: BarChart3, label: 'Relatórios', href: '/admin/relatorios' },
    { icon: CreditCard, label: 'Financeiro', href: '/admin/financeiro' },
    { icon: QrCode, label: 'QR Code Center', href: '/admin/qrcode' },
    { icon: Calendar, label: 'Agenda', href: '/admin/agenda' },
    { icon: Settings, label: 'Configurações', href: '/admin/configuracoes' },
    // SUB-ITENS DE CONFIGURAÇÕES (aparecem como itens separados)
    { icon: Shield, label: 'Perfil de Acesso', href: '/admin/configuracoes/perfil-acesso' },
  ]

  // Verifica se é uma rota de configurações para destacar o item
  const isConfigActive = pathname?.startsWith('/admin/configuracoes')

  return (
    <aside className="w-64 bg-white border-r border-[#E8EAE0] h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* LOGO 2cm */}
      <div className="p-4 border-b border-[#E8EAE0] flex justify-center">
        <img src="/logo.png" alt="ZENTHOS" className="h-[2cm] w-auto object-contain" />
      </div>

      {/* PERFIL */}
      <div className="p-4 border-b border-[#E8EAE0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
          <div>
            <p className="font-semibold text-sm text-[#2D343A]">Administrador</p>
            <p className="text-xs text-[#708090]">Master</p>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          // Para Configurações, destacar também os sub-itens
          const isConfig = item.href === '/admin/configuracoes'
          const isConfigActive = isConfig && (pathname === '/admin/configuracoes' || pathname?.startsWith('/admin/configuracoes/'))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                isActive || isConfigActive
                  ? 'bg-[#8B0000]/10 text-[#8B0000] font-medium'
                  : 'text-[#708090] hover:bg-[#F8F4E6] hover:text-[#8B0000]'
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
