'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, LogIn, UserPlus, Crown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#F0F0ED] shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="TRIVOR"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl md:text-3xl font-bold text-[#2D3121] group-hover:text-[#8E7AB5] transition">
                TRIVOR
              </span>
              <span className="text-[10px] font-light text-[#8E7AB5] align-top mt-1">™</span>
            </div>
            <span className="text-[10px] font-light text-[#5C6347] tracking-wider uppercase">
              Gestão & Estratégia Empresarial
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#5C6347] transition-all duration-300 hover:text-[#2D3121] hover:scale-105 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8E7AB5] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* BOTÕES */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5C6347] hover:text-[#2D3121] hover:bg-[#F5F2FA] rounded-lg transition">
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          </Link>
          <Link href="/cadastro">
            <button className="btn-primary btn-sm">
              <UserPlus className="h-4 w-4" />
              Cadastrar
            </button>
          </Link>
          <Link href="/servicos">
            <button className="btn-lilas btn-sm">
              <Crown className="h-4 w-4" />
              Premium
            </button>
          </Link>
        </div>

        {/* BOTÃO MOBILE */}
        <button 
          className="lg:hidden p-2 hover:bg-[#F5F2FA] rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-[#2D3121]" /> : <Menu className="h-6 w-6 text-[#5C6347]" />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#F0F0ED] bg-white shadow-lg">
          <div className="container mx-auto flex flex-col space-y-3 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-[#5C6347] hover:text-[#2D3121] hover:bg-[#F5F2FA] px-4 py-3 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-[#F0F0ED]">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#5C6347] text-[#5C6347] font-medium rounded-lg hover:bg-[#F4F5F0] transition">
                  <LogIn className="h-4 w-4" />
                  Entrar
                </button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full btn-primary justify-center">
                  <UserPlus className="h-4 w-4" />
                  Cadastrar
                </button>
              </Link>
              <Link href="/servicos" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full btn-lilas justify-center">
                  <Crown className="h-4 w-4" />
                  Premium
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
