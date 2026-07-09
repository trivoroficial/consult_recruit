'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, LogIn, UserPlus, Crown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-extrabold text-purple-600 group-hover:text-purple-700 transition">TRIVOR</span>
            <span className="text-xs font-light text-gray-400 hidden md:block">®</span>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-200"></div>
          <span className="hidden md:block text-xs font-light text-gray-500 tracking-wider uppercase">
            Gestão & Estratégia
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-all duration-300 hover:text-purple-600 hover:scale-105 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* BOTÕES DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600 hover:bg-purple-50">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200 hover:shadow-purple-300 transition-all">
              <UserPlus className="h-4 w-4 mr-2" />
              Cadastrar
            </Button>
          </Link>
          <Link href="/servicos">
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-md shadow-yellow-200 hover:shadow-yellow-300 transition-all">
              <Crown className="h-4 w-4 mr-2" />
              Premium
            </Button>
          </Link>
        </div>

        {/* BOTÃO MENU MOBILE */}
        <button 
          className="lg:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white shadow-lg">
          <div className="container mx-auto flex flex-col space-y-3 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Cadastrar
                </Button>
              </Link>
              <Link href="/servicos" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
