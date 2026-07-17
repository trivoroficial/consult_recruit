'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, Briefcase, TrendingUp, 
  Settings, Bell, LogOut, Home,
  Calendar, FileText, DollarSign
} from 'lucide-react'

export default function EmpresaDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('zenthos_user')
    if (!userData) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('zenthos_user')
    document.cookie = 'zenthos_user=; path=/; max-age=0'
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4E6]">
        <div className="text-[#8B0000] text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      {/* ===== SIDEBAR FIXA ===== */}
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
              {user?.name?.charAt(0) || 'E'}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#2D343A]">{user?.name || 'Empresa'}</p>
              <p className="text-xs text-[#708090]">Cliente</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/empresa/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#8B0000]/10 text-[#8B0000] font-medium">
            <Home className="h-5 w-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/empresa/vagas" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Briefcase className="h-5 w-5" />
            <span className="text-sm">Minhas Vagas</span>
          </Link>
          <Link href="/empresa/candidatos" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Users className="h-5 w-5" />
            <span className="text-sm">Candidatos</span>
          </Link>
          <Link href="/empresa/processos" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Processos</span>
          </Link>
          <Link href="/empresa/financeiro" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <DollarSign className="h-5 w-5" />
            <span className="text-sm">Financeiro</span>
          </Link>
          <Link href="/empresa/configuracoes" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Settings className="h-5 w-5" />
            <span className="text-sm">Configurações</span>
          </Link>
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

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">Dashboard Empresa</h1>
            <p className="text-sm text-[#708090]">Gerencie suas vagas e candidatos</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[#F8F4E6] transition">
              <Bell className="h-5 w-5 text-[#708090]" />
            </button>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Vagas Abertas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Candidatos</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Entrevistas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Contratações</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
            <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Suas Vagas</h2>
            <p className="text-[#708090] text-center py-8">Nenhuma vaga cadastrada ainda.</p>
            <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
              Criar Nova Vaga
            </button>
          </div>
        </div>

        {/* ===== RODAPÉ FIXO ===== */}
        <footer className="bg-white border-t border-[#E8EAE0] px-8 py-3 text-center text-sm text-[#708090] flex-shrink-0">
          <span className="font-medium text-[#2D343A]">ZENTHOS</span>
          <span className="mx-2">•</span>
          Gestão, Estratégia & Transformação
          <span className="mx-2">•</span>
          © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
