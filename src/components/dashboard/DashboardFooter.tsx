// src/components/dashboard/DashboardFooter.tsx
'use client'

import Link from 'next/link'
import { Heart, Zap } from 'lucide-react'

export function DashboardFooter() {
  return (
    <footer className="bg-white border-t border-[#E8EAE0] py-4 px-8 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-center md:text-left">
          <p className="text-sm text-[#708090]">
            © 2026 <span className="font-semibold text-[#2D343A]">VIGORRE</span> - Todos os direitos reservados
          </p>
          <p className="text-xs text-[#708090]/60 flex items-center justify-center md:justify-start gap-1">
            criado pela <span className="text-[#708090]/80 font-medium">Vigorre Tech</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-[#708090]/40">
              <Heart className="h-3 w-3 text-[#8B0000]" />
              v1.0
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/privacidade" className="text-[#708090] hover:text-[#8B0000] transition">
            Privacidade
          </Link>
          <span className="text-[#E8EAE0]">|</span>
          <Link href="/termos" className="text-[#708090] hover:text-[#8B0000] transition">
            Termos de Uso
          </Link>
          <span className="text-[#E8EAE0]">|</span>
          <Link href="/contato" className="text-[#708090] hover:text-[#8B0000] transition">
            Contato
          </Link>
          <span className="text-[#E8EAE0]">|</span>
          <span className="text-[#708090]/40 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            v1.0
          </span>
        </div>
      </div>
    </footer>
  )
}
