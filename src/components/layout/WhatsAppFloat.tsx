'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const whatsappNumber = "5534991850735"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista da ZENTHOS.")}`

  // Não mostrar em dashboards
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    if (pathname?.startsWith('/admin') || 
        pathname?.startsWith('/empresa') || 
        pathname?.startsWith('/candidato') ||
        pathname?.startsWith('/login') ||
        pathname?.startsWith('/cadastro')) {
      return null
    }
  }

  if (!isVisible) return null

  return (
    <div className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-8 right-8'} z-50 flex flex-col items-end gap-2`}>
      {/* BOTÃO WHATSAPP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/40"
      >
        {!isMobile && (
          <span className="pl-4 pr-2 py-2.5 text-sm font-medium whitespace-nowrap">
            Falar com Especialista
          </span>
        )}
        <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-sm">
          <MessageCircle className="h-6 w-6" />
        </div>
      </a>

      {/* BOTÃO FECHAR (opcional) */}
      <button
        onClick={() => setIsVisible(false)}
        className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md transition hover:scale-105 text-[#708090] hover:text-[#2D343A]"
        aria-label="Fechar WhatsApp"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
