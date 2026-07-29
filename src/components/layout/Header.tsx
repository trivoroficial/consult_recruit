'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, LogIn } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    { label: 'Sobre', href: '/sobre' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Contato', href: '/contato' },
  ]

  const whatsappNumber = "5534991850735"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista da ZENTHOS.")}`

  return (
    <header className="bg-white border-b border-[#E8EAE0] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition text-sm font-medium flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Fale com Especialista
            </a>
            <Link
              href="/login"
              className="px-5 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition text-sm font-medium flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F8F4E6] rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-[#2D343A]" /> : <Menu className="h-6 w-6 text-[#2D343A]" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8EAE0]">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition px-3 py-2 rounded-lg ${
                    pathname === item.href
                      ? 'text-[#8B0000] bg-[#8B0000]/5'
                      : 'text-[#708090] hover:text-[#8B0000] hover:bg-[#F8F4E6]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1DA851] transition text-sm font-medium text-center flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Fale com Especialista
              </a>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition text-sm font-medium text-center flex items-center justify-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
