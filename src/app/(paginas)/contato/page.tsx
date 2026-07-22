'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setForm({ nome: '', email: '', telefone: '', mensagem: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#2D343A] text-center mb-4">Fale Conosco</h1>
        <p className="text-center text-[#708090] max-w-2xl mx-auto mb-12">
          Estamos aqui para ajudar. Entre em contato conosco.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-[#E8EAE0]">
              <h2 className="text-xl font-bold text-[#2D343A] mb-6">Envie uma mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Nome</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.nome}
                    onChange={(e) => setForm({...form, nome: e.target.value})}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    value={form.telefone}
                    onChange={(e) => setForm({...form, telefone: e.target.value})}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition resize-none"
                    value={form.mensagem}
                    onChange={(e) => setForm({...form, mensagem: e.target.value})}
                    placeholder="Sua mensagem..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Enviando...' : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
                {status === 'success' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                    ✅ Mensagem enviada com sucesso!
                  </div>
                )}
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 border border-[#E8EAE0]">
              <h2 className="text-xl font-bold text-[#2D343A] mb-6">Informações</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#8B0000] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2D343A]">Email</p>
                    <p className="text-sm text-[#708090]">contato@zenthos.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#8B0000] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2D343A]">Telefone</p>
                    <p className="text-sm text-[#708090]">+55 37 99117-7058</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#8B0000] mt-0.5" />
                  <div>
                    <p className="font-medium text-[#2D343A]">Localização</p>
                    <p className="text-sm text-[#708090]">Uberlândia/MG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
