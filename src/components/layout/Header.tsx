'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { id: "home", label: "Início", href: "/#home" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "solucoes", label: "Soluções", href: "/#solucoes" },
  { id: "tecnologia", label: "Tecnologia", href: "/#tecnologia" },
  { id: "contato", label: "Contato", href: "/#contato" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#E3C9A8]/20' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ===== LOGO ZENTHOS ===== */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* CAMINHO CORRIGIDO PARA logo.png */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="ZENTHOS" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* TEXTO ZENTHOS + TM (COM align-super) */}
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl md:text-3xl font-bold tracking-tight">
                  <span className="text-[#8B4513]">ZEN</span><span className="text-[#708090]">THOS</span>
                </span>
                <span className="text-[10px] font-light text-[#8B0000] align-super">™</span>
              </div>
              <span className="text-[9px] font-light text-[#708090] tracking-[0.15em] uppercase whitespace-nowrap mt-0.5">
                Gestão, Estratégia & Transformação
              </span>
            </div>
          </Link>

          {/* ===== MENU DESKTOP ===== */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                className="text-sm font-medium text-[#708090] hover:text-[#8B0000] transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#8B0000] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ===== BOTÕES DESKTOP (PREMIUM) ===== */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <button className="text-sm font-medium text-[#708090] hover:text-[#8B0000] px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#F8F4E6]">
                Entrar
              </button>
            </Link>
            <Link href="/servicos">
              <button className="text-sm font-medium text-[#8B0000] border border-[#8B0000]/30 hover:border-[#8B0000] px-5 py-2 rounded-lg transition-all duration-200 hover:bg-[#8B0000] hover:text-white hover:shadow-lg hover:-translate-y-0.5">
                Serviços Premium
              </button>
            </Link>
            <Link href="/cadastro">
              <button className="text-sm font-medium text-white bg-[#8B0000] hover:bg-[#700000] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-[#8B0000]/20 hover:shadow-xl hover:-translate-y-0.5">
                Solicitar Acesso
              </button>
            </Link>
          </div>

          {/* BOTÃO MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#8B0000]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ===== MENU MOBILE ===== */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E3C9A8]/30 absolute w-full shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                className="block text-base font-medium text-[#708090] hover:text-[#8B0000] py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-center py-3 text-sm font-medium text-[#708090] border border-[#708090] rounded-lg">
                  Entrar
                </button>
              </Link>
              <Link href="/servicos" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-center py-3 text-sm font-medium text-[#8B0000] border border-[#8B0000] rounded-lg">
                  Serviços Premium
                </button>
              </Link>
              <Link href="/cadastro" onClick={() => setMenuOpen(false)}>
                <button className="w-full text-center py-3 text-sm font-medium text-white bg-[#8B0000] rounded-lg">
                  Solicitar Acesso
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
