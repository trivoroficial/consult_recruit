'use client'

import Link from 'next/link'

const whatsappNumber = "5537991177058"
const whatsappDisplay = "+55 37 99117-7058"
const whatsappMessage = "Olá! Gostaria de conhecer as soluções da ZENTHOS."
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
const emailContato = "contato@zenthos.com.br"

const navLinks = [
  { id: "home", label: "Início", href: "/#home" },
  { id: "sobre", label: "Sobre", href: "/#sobre" },
  { id: "servicos", label: "Serviços", href: "/#servicos" },
  { id: "solucoes", label: "Soluções", href: "/#solucoes" },
  { id: "tecnologia", label: "Tecnologia", href: "/#tecnologia" },
  { id: "contato", label: "Contato", href: "/#contato" },
]

export function Footer() {
  return (
    <footer className="bg-[#2D343A] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* COLUNA 1: MARCA ZENTHOS */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo-zenthos.png" 
                alt="ZENTHOS" 
                className="h-[1.5cm] w-auto object-contain brightness-0 invert" 
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold text-white leading-none">ZENTHOS</span>
                <span className="text-[10px] font-light text-[#E3C9A8] tracking-[0.2em] uppercase mt-1 whitespace-nowrap">
                  Gestão, Estratégia & Transformação
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Transformando organizações através de estratégia, tecnologia e inteligência humana.
            </p>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} ZENTHOS. Todos os direitos reservados.
            </p>
          </div>
          
          {/* COLUNA 2: NAVEGAÇÃO */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:text-[#E3C9A8] transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUNA 3: CONTATO */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-white/70">
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
          
          {/* COLUNA 4: ACESSO AO SISTEMA */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">Acesso ao Sistema</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/login" className="hover:text-[#E3C9A8] transition-colors duration-200 flex items-center gap-2">
                  <span>🔒</span> Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
