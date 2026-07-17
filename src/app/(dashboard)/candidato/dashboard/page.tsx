'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, Briefcase, FileText, 
  Settings, Bell, LogOut, Home,
  Search, CheckCircle, User
} from 'lucide-react'

export default function CandidatoDashboard() {
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
              {user?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <p className="font-semibold text-sm text-[#2D343A]">{user?.name || 'Candidato'}</p>
              <p className="text-xs text-[#708090]">Candidato</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/candidato/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#8B0000]/10 text-[#8B0000] font-medium">
            <Home className="h-5 w-5" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link href="/candidato/perfil" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <User className="h-5 w-5" />
            <span className="text-sm">Meu Perfil</span>
          </Link>
          <Link href="/candidato/curriculo" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <FileText className="h-5 w-5" />
            <span className="text-sm">Currículo</span>
          </Link>
          <Link href="/candidato/vagas" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <Search className="h-5 w-5" />
            <span className="text-sm">Buscar Vagas</span>
          </Link>
          <Link href="/candidato/candidaturas" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Minhas Candidaturas</span>
          </Link>
          <Link href="/candidato/configuracoes" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#708090] hover:bg-[#F8F4E6] transition">
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
            <h1 className="text-2xl font-bold text-[#2D343A]">Dashboard Candidato</h1>
            <p className="text-sm text-[#708090]">Acompanhe sua jornada profissional</p>
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
                  <p className="text-sm text-[#708090]">Candidaturas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <Search className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0</p>
                  <p className="text-sm text-[#708090]">Vagas Recomendadas</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#8B0000]/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-[#8B0000]" />
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
                  <FileText className="h-6 w-6 text-[#8B0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D343A]">0%</p>
                  <p className="text-sm text-[#708090]">Perfil Completo</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Vagas Recomendadas</h2>
              <p className="text-[#708090] text-center py-8">Nenhuma vaga recomendada ainda.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E8EAE0]">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4">Seu Progresso</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#708090]">Perfil</p>
                  <div className="w-full bg-[#E8EAE0] rounded-full h-2 mt-1">
                    <div className="bg-[#8B0000] h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium">
                  Completar Perfil
                </button>
              </div>
            </div>
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
