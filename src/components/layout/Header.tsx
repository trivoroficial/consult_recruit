'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, LogIn } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-600">TRIVOR</span>
          <span className="hidden text-sm font-light text-gray-500 md:inline">
            Gestão & Estratégia
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-purple-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* BOTÕES DESKTOP */}
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Cadastrar
            </Button>
          </Link>
        </div>

        {/* BOTÃO MENU MOBILE */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 px-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">Entrar</Button>
              </Link>
              <Link href="/cadastro">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
