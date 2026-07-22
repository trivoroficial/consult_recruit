// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // NÃO MOSTRAR O HEADER EM PÁGINAS DE DASHBOARD E AUTH
  const isDashboard = pathname?.startsWith('/admin') || 
                      pathname?.startsWith('/empresa') || 
                      pathname?.startsWith('/candidato') ||
                      pathname?.startsWith('/login') ||
                      pathname?.startsWith('/cadastro')

  if (isDashboard) {
    return null
  }

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <header className="bg-white border-b border-[#E8EAE0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto object-contain" />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  pathname === item.href
                    ? 'text-[#8B0000]'
                    : 'text-[#708090] hover:text-[#8B0000]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition text-sm font-medium"
            >
              Entrar
            </Link>
          </nav>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F8F4E6] rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#2D343A]" /> : <Menu className="h-6 w-6 text-[#2D343A]" />}
          </button>
        </div>

        {/* NAV MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8EAE0]">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition px-2 py-2 rounded-lg ${
                    pathname === item.href
                      ? 'text-[#8B0000] bg-[#8B0000]/5'
                      : 'text-[#708090] hover:text-[#8B0000] hover:bg-[#F8F4E6]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-5 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition text-sm font-medium text-center"
              >
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
