// src/components/layout/Footer.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Footer() {
  const pathname = usePathname()

  // NÃO MOSTRAR O FOOTER EM PÁGINAS DE DASHBOARD
  const isDashboard = pathname?.startsWith('/admin') || 
                      pathname?.startsWith('/empresa') || 
                      pathname?.startsWith('/candidato') ||
                      pathname?.startsWith('/login') ||
                      pathname?.startsWith('/cadastro')

  if (isDashboard) {
    return null
  }

  return (
    <footer className="bg-[#1A1A2E] text-white/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUNA 1 - LOGO */}
          <div>
            <img src="/logo.png" alt="ZENTHOS" className="h-[1.5cm] w-auto object-contain brightness-0 invert" />
            <p className="text-sm mt-4 max-w-xs text-white/50">
              Plataforma de recrutamento e seleção conectando talentos às melhores oportunidades.
            </p>
          </div>

          {/* COLUNA 2 - LINKS RÁPIDOS */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Início</Link></li>
              <li><Link href="/vagas" className="hover:text-white transition">Vagas</Link></li>
              <li><Link href="/empresas" className="hover:text-white transition">Empresas</Link></li>
              <li><Link href="/sobre" className="hover:text-white transition">Sobre</Link></li>
              <li><Link href="/contato" className="hover:text-white transition">Contato</Link></li>
            </ul>
          </div>

          {/* COLUNA 3 - CANDIDATO */}
          <div>
            <h4 className="text-white font-semibold mb-4">Para Candidatos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cadastro" className="hover:text-white transition">Cadastre-se</Link></li>
              <li><Link href="/vagas" className="hover:text-white transition">Buscar Vagas</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Acessar Conta</Link></li>
              <li><Link href="/candidato/perfil" className="hover:text-white transition">Meu Perfil</Link></li>
            </ul>
          </div>

          {/* COLUNA 4 - EMPRESA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Para Empresas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/empresa/cadastro" className="hover:text-white transition">Cadastre sua empresa</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Acessar Conta</Link></li>
              <li><Link href="/contato" className="hover:text-white transition">Fale Conosco</Link></li>
              <li><Link href="/empresa/vagas" className="hover:text-white transition">Publicar Vagas</Link></li>
            </ul>
          </div>
        </div>

        {/* RODAPÉ FINAL COM COPYRIGHT */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-white/60">
                © 2026 <span className="font-semibold text-white/80">VIGORRE</span> - Todos os direitos reservados
              </p>
              <p className="text-xs text-white/40 mt-1">
                criado pela <span className="text-white/50">Vigorre Tech</span>
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacidade" className="text-white/40 hover:text-white transition">
                Privacidade
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/termos" className="text-white/40 hover:text-white transition">
                Termos de Uso
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/contato" className="text-white/40 hover:text-white transition">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
