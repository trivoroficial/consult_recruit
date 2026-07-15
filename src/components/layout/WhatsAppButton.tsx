'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const whatsappNumber = "5537991177058"
  const whatsappMessage = "Olá! Gostaria de conhecer as soluções da ZENTHOS."
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </a>
  )
}
