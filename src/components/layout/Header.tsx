'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E3C9A8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold text-[#2D343A]">ZENTHOS</span>
              <span className="text-[9px] font-light text-[#708090] tracking-[0.15em] uppercase">
                Recrutamento & Seleção
              </span>
            </div>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#708090] hover:text-[#8B0000] transition">
              Início
            </Link>
            <Link href="/sobre" className="text-sm font-medium text-[#708090] hover:text-[#8B0000] transition">
              Sobre
            </Link>
            <Link href="/servicos" className="text-sm font-medium text-[#708090] hover:text-[#8B0000] transition">
              Serviços
            </Link>
            <Link href="/contato" className="text-sm font-medium text-[#708090] hover:text-[#8B0000] transition">
              Contato
            </Link>
          </nav>

          {/* BOTÕES */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <button className="text-sm font-medium text-[#708090] hover:text-[#8B0000] px-4 py-2 transition">
                Entrar
              </button>
            </Link>
            <Link href="/cadastro">
              <button className="text-sm font-semibold text-white bg-[#8B0000] hover:bg-[#700000] px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg">
                Solicitar Acesso
              </button>
            </Link>
          </div>

          {/* MOBILE */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6 text-[#8B0000]" /> : <Menu className="h-6 w-6 text-[#8B0000]" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E3C9A8]/30">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-base font-medium text-[#708090] hover:text-[#8B0000]">Início</Link>
            <Link href="/sobre" className="block text-base font-medium text-[#708090] hover:text-[#8B0000]">Sobre</Link>
            <Link href="/servicos" className="block text-base font-medium text-[#708090] hover:text-[#8B0000]">Serviços</Link>
            <Link href="/contato" className="block text-base font-medium text-[#708090] hover:text-[#8B0000]">Contato</Link>
            <div className="pt-4 border-t space-y-3">
              <Link href="/login" className="block w-full text-center py-3 text-sm font-medium border border-[#708090] rounded-lg">Entrar</Link>
              <Link href="/cadastro" className="block w-full text-center py-3 text-sm font-semibold text-white bg-[#8B0000] rounded-lg">Solicitar Acesso</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
