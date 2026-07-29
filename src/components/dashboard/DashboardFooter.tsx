'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export function DashboardFooter() {
  return (
    <footer className="bg-[#1A1A2E] border-t border-white/10 py-4 px-8 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img 
            src="/vigorre-logo.png" 
            alt="VIGORRE" 
            className="h-8 w-auto object-contain brightness-0 invert"
            onError={(e) => {
              // Fallback se a imagem não existir
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-white/80">
              VIGORRE
            </p>
            <p className="text-xs text-white/40">
              © 2026 VIGORRE DESIGNER™
            </p>
          </div>
        </div>
        
        <div className="text-center text-xs text-white/40">
          <p>
            <a href="https://www.vigorre.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition">
              www.vigorre.com.br
            </a>
            {' | '}
            <a href="tel:+5534991850735" className="hover:text-white/60 transition">
              (34) 99185-0735
            </a>
          </p>
          <p>
            <a href="mailto:contato@vigorre.com.br" className="hover:text-white/60 transition">
              contato@vigorre.com.br
            </a>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/30">
          <Heart className="h-3 w-3 text-[#8B0000]" />
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  )
}
