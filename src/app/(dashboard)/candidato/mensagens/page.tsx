'use client'

import { SidebarCandidato } from '@/components/layout/SidebarCandidato'
import { Search, Send, MessageCircle, Building2, Clock } from 'lucide-react'
import { useState } from 'react'

const conversas = [
  { id: 1, nome: 'Empresa XPTO', tipo: 'empresa', ultima: 'Entrevista confirmada para amanhã', data: '09/07/2026', lida: false },
  { id: 2, nome: 'Indústria ABC', tipo: 'empresa', ultima: 'Seu currículo está em análise', data: '08/07/2026', lida: true },
  { id: 3, nome: 'Suporte TRIVOR', tipo: 'suporte', ultima: 'Seu ticket foi resolvido', data: '05/07/2026', lida: true },
]

export default function MensagensCandidato() {
  const [mensagem, setMensagem] = useState('')
  const [conversaSelecionada, setConversaSelecionada] = useState(conversas[0])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarCandidato />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-purple-600">Mensagens</span>
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="grid grid-cols-3 h-[600px]">
            {/* Lista de conversas */}
            <div className="col-span-1 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[500px]">
                {conversas.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${conversaSelecionada?.id === conv.id ? 'bg-purple-50' : ''}`}
                    onClick={() => setConversaSelecionada(conv)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${conv.tipo === 'empresa' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        {conv.tipo === 'empresa' ? <Building2 className="h-5 w-5 text-blue-600" /> : <MessageCircle className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm truncate">{conv.nome}</p>
                          <span className="text-xs text-gray-400">{conv.data}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conv.ultima}</p>
                      </div>
                      {!conv.lida && <span className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Área da conversa */}
            <div className="col-span-2 flex flex-col">
              {/* Cabeçalho da conversa */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${conversaSelecionada?.tipo === 'empresa' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                  {conversaSelecionada?.tipo === 'empresa' ? <Building2 className="h-5 w-5 text-blue-600" /> : <MessageCircle className="h-5 w-5 text-purple-600" />}
                </div>
                <div>
                  <p className="font-semibold">{conversaSelecionada?.nome}</p>
                  <p className="text-xs text-gray-500">Última mensagem: {conversaSelecionada?.data}</p>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] border">
                      <p className="text-sm">Olá! Sua entrevista está confirmada para amanhã às 14h.</p>
                      <span className="text-xs text-gray-400 mt-1 block">09:30</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-purple-600 text-white p-3 rounded-lg max-w-[70%]">
                      <p className="text-sm">Perfeito! Estarei lá.</p>
                      <span className="text-xs text-purple-200 mt-1 block">09:35</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input de mensagem */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                  <button className="btn-primary btn-sm flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
