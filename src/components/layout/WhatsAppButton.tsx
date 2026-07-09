'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5534991177058?text=Olá! Gostaria de conhecer as soluções da TRIVOR."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-300 hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </a>
  )
}
