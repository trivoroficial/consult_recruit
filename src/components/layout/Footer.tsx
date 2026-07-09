import Link from 'next/link'
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, Crown } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Linha dourada no topo */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-yellow-500 to-purple-600"></div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* COLUNA 1 - LOGO */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-purple-400">TRIVOR</span>
              <Crown className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="mt-3 text-sm text-gray-400">Gestão & Estratégia Empresarial</p>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Transformando empresas através de pessoas, processos e inteligência.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* COLUNA 2 - NAVEGAÇÃO */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegação</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-purple-400 transition-colors">Sobre</Link></li>
              <li><Link href="/servicos" className="hover:text-purple-400 transition-colors">Serviços</Link></li>
              <li><Link href="/contato" className="hover:text-purple-400 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* COLUNA 3 - SERVIÇOS */}
          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Recrutamento & Seleção</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Gestão de Pessoas</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Consultoria Financeira</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Segurança dos Alimentos</li>
            </ul>
          </div>

          {/* COLUNA 4 - CONTATO */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4 text-purple-400" />
                contato@trivor.com.br
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-purple-400" />
                (34) 99117-7058
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-purple-400" />
                Uberlândia - MG
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; 2026 TRIVOR. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacidade" className="text-gray-500 hover:text-purple-400 transition-colors">Política de Privacidade</Link>
              <Link href="/termos" className="text-gray-500 hover:text-purple-400 transition-colors">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
