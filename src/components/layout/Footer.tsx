'use client'

import Link from 'next/link'

const whatsappNumber = "5537991177058"
const whatsappDisplay = "+55 37 99117-7058"
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da ZENTHOS."
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
const emailContato = "contato@zenthos.com.br"

const navLinks = [
  { id: "home", label: "Início", href: "/" },
  { id: "sobre", label: "Sobre", href: "/sobre" },
  { id: "servicos", label: "Serviços", href: "/servicos" },
  { id: "contato", label: "Contato", href: "/contato" },
]

export function Footer() {
  return (
    <footer className="bg-[#2D343A] text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* ===== COLUNA 1: ZEN + THOS ===== */}
          <div className="lg:col-span-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="text-[#8B4513]">ZEN</span><span className="text-[#A1A8AE]">THOS</span>
                </span>
                <span className="text-[8px] font-light text-[#E3C9A8] align-top mt-[-2px]">™</span>
              </div>
              <span className="text-[9px] font-light text-[#A1A8AE] tracking-[0.15em] uppercase whitespace-nowrap">
                Gestão, Estratégia & Transformação
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Transformando organizações através de estratégia, tecnologia e inteligência humana.
            </p>
            <p className="mt-6 text-xs text-white/40">
              © {new Date().getFullYear()} ZENTHOS. Todos os direitos reservados.
            </p>
          </div>
          
          {/* ===== COLUNA 2: NAVEGAÇÃO ===== */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="hover:text-[#E3C9A8] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* ===== COLUNA 3: CONTATO ===== */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#E3C9A8] transition-colors duration-200 flex items-center gap-2">
                  <span>📱</span> {whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${emailContato}`} className="hover:text-[#E3C9A8] transition-colors duration-200 flex items-center gap-2">
                  <span>✉️</span> {emailContato}
                </a>
              </li>
            </ul>
          </div>
          
          {/* ===== COLUNA 4: ACESSO ===== */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Acesso</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="/login" className="hover:text-[#E3C9A8] transition-colors duration-200 flex items-center gap-2">
                  <span>🔒</span> Entrar
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="hover:text-[#E3C9A8] transition-colors duration-200 flex items-center gap-2">
                  <span>🚀</span> Cadastrar
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
