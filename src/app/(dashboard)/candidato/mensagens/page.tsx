'use client'

import { SidebarCandidato } from '@/components/dashboard/SidebarCandidato'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { Search, Send, MessageCircle, Building2, Clock, User, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const conversas = [
  { id: 1, nome: 'Empresa XPTO', tipo: 'empresa', ultima: 'Entrevista confirmada para amanhã', data: '09/07/2026', lida: false },
  { id: 2, nome: 'Indústria ABC', tipo: 'empresa', ultima: 'Seu currículo está em análise', data: '08/07/2026', lida: true },
  { id: 3, nome: 'Suporte ZENTHOS', tipo: 'suporte', ultima: 'Seu ticket foi resolvido', data: '05/07/2026', lida: true },
]

export default function MensagensCandidato() {
  const router = useRouter()
  const [mensagem, setMensagem] = useState('')
  const [conversaSelecionada, setConversaSelecionada] = useState(conversas[0])
  const [search, setSearch] = useState('')

  const filteredConversas = conversas.filter(conv =>
    conv.nome.toLowerCase().includes(search.toLowerCase())
  )

  const getTipoIcon = (tipo: string) => {
    return tipo === 'empresa' ? Building2 : MessageCircle
  }

  const getTipoColor = (tipo: string) => {
    return tipo === 'empresa' ? 'bg-[#6B1A2A]/10 text-[#6B1A2A]' : 'bg-[#E3C9A8] text-[#6B1A2A]'
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarCandidato />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/candidato/dashboard')}
              className="p-2 hover:bg-[#F8F4E6] rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-[#708090]" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-[#6B1A2A]" />
                Mensagens
              </h1>
              <p className="text-sm text-[#708090]">Comunique-se com empresas e suporte</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#708090]">
            <Clock className="h-4 w-4" />
            {conversas.filter(c => !c.lida).length} não lidas
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              {/* Lista de conversas */}
              <div className="col-span-1 border-r border-[#E8EAE0]">
                <div className="p-4 border-b border-[#E8EAE0] bg-[#F8F4E6]">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#708090]" />
                    <input
                      type="text"
                      placeholder="Buscar conversas..."
                      className="w-full pl-9 pr-4 py-2 border border-[#E8EAE0] rounded-lg text-sm focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none bg-white"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[500px]">
                  {filteredConversas.length === 0 ? (
                    <div className="p-8 text-center text-[#708090]">
                      <MessageCircle className="h-8 w-8 mx-auto mb-2 text-[#708090]" />
                      <p className="text-sm">Nenhuma conversa encontrada</p>
                    </div>
                  ) : (
                    filteredConversas.map((conv) => {
                      const Icon = getTipoIcon(conv.tipo)
                      const color = getTipoColor(conv.tipo)
                      return (
                        <div
                          key={conv.id}
                          className={`p-4 border-b border-[#E8EAE0] hover:bg-[#F8F4E6] cursor-pointer transition ${
                            conversaSelecionada?.id === conv.id ? 'bg-[#6B1A2A]/5 border-l-4 border-l-[#6B1A2A]' : ''
                          }`}
                          onClick={() => setConversaSelecionada(conv)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold text-sm text-[#2D343A] truncate">{conv.nome}</p>
                                <span className="text-xs text-[#708090] flex-shrink-0">{conv.data}</span>
                              </div>
                              <p className="text-sm text-[#708090] truncate">{conv.ultima}</p>
                            </div>
                            {!conv.lida && (
                              <span className="w-2 h-2 bg-[#6B1A2A] rounded-full flex-shrink-0"></span>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Área da conversa */}
              <div className="col-span-2 flex flex-col">
                {conversaSelecionada ? (
                  <>
                    {/* Cabeçalho da conversa */}
                    <div className="p-4 border-b border-[#E8EAE0] flex items-center gap-3 bg-[#F8F4E6]">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTipoColor(conversaSelecionada.tipo)}`}>
                        {conversaSelecionada.tipo === 'empresa' ? 
                          <Building2 className="h-5 w-5" /> : 
                          <MessageCircle className="h-5 w-5" />
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-[#2D343A]">{conversaSelecionada.nome}</p>
                        <p className="text-xs text-[#708090]">Última mensagem: {conversaSelecionada.data}</p>
                      </div>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 p-4 overflow-y-auto bg-[#F8F4E6]/50">
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] border border-[#E8EAE0]">
                            <p className="text-sm text-[#2D343A]">Olá! Sua entrevista está confirmada para amanhã às 14h.</p>
                            <span className="text-xs text-[#708090] mt-1 block">09:30</span>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#6B1A2A] text-white p-3 rounded-lg max-w-[70%]">
                            <p className="text-sm">Perfeito! Estarei lá.</p>
                            <span className="text-xs text-[#E3C9A8] mt-1 block">09:35</span>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] border border-[#E8EAE0]">
                            <p className="text-sm text-[#2D343A]">Ótimo! Aguardamos você. Traga seus documentos.</p>
                            <span className="text-xs text-[#708090] mt-1 block">09:40</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Input de mensagem */}
                    <div className="p-4 border-t border-[#E8EAE0] bg-white">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Digite sua mensagem..."
                          className="flex-1 px-4 py-2.5 border border-[#E8EAE0] rounded-lg focus:ring-2 focus:ring-[#6B1A2A] focus:outline-none transition"
                          value={mensagem}
                          onChange={(e) => setMensagem(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && mensagem.trim()) {
                              // Enviar mensagem
                              setMensagem('')
                            }
                          }}
                        />
                        <button 
                          className="px-5 py-2.5 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!mensagem.trim()}
                        >
                          <Send className="h-4 w-4" />
                          Enviar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-[#F8F4E6]/50">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                      <p className="text-[#708090]">Selecione uma conversa para começar</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
