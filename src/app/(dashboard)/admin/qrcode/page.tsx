'use client'

import { useState, useRef } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  QrCode, Download, Copy, Check, 
  Smartphone, FileText, CreditCard, 
  Building2, Users, Link2, Share2,
  Wallet, File, Image, Printer
} from 'lucide-react'

export default function AdminQRCode() {
  const [qrType, setQrType] = useState('pix')
  const [qrValue, setQrValue] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const qrOptions = [
    { id: 'pix', label: 'PIX', icon: Wallet, color: 'bg-green-100 text-green-600' },
    { id: 'documento', label: 'Documento', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { id: 'contrato', label: 'Contrato', icon: File, color: 'bg-purple-100 text-purple-600' },
    { id: 'empresa', label: 'Empresa', icon: Building2, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'vaga', label: 'Vaga', icon: Users, color: 'bg-pink-100 text-pink-600' },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone, color: 'bg-green-100 text-green-600' },
    { id: 'link', label: 'Link', icon: Link2, color: 'bg-cyan-100 text-cyan-600' },
  ]

  const handleGenerate = () => {
    if (!qrValue) return
    setQrGenerated(true)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (format: 'png' | 'jpg') => {
    // SIMULAÇÃO DE DOWNLOAD
    alert(`Baixando QR Code em formato ${format.toUpperCase()}`)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">QR Code Center</h1>
            <p className="text-sm text-[#708090]">Gere QR Codes para PIX, documentos, contratos e muito mais</p>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PAINEL DE CONFIGURAÇÃO */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-[#8B0000]" />
                  Gerar QR Code
                </h2>

                {/* TIPO DE QR */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2D343A] mb-3">
                    Tipo de QR Code
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {qrOptions.map((opt) => {
                      const Icon = opt.icon
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setQrType(opt.id)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition ${
                            qrType === opt.id
                              ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000]'
                              : 'border-[#E8EAE0] hover:border-[#8B0000]/30 hover:bg-[#F8F4E6]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${qrType === opt.id ? opt.color : 'bg-[#F8F4E6] text-[#708090]'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-xs">{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* VALOR/CONTEÚDO */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    {qrType === 'pix' ? 'Chave PIX' :
                     qrType === 'documento' ? 'URL do Documento' :
                     qrType === 'contrato' ? 'URL do Contrato' :
                     qrType === 'empresa' ? 'URL da Empresa' :
                     qrType === 'vaga' ? 'URL da Vaga' :
                     qrType === 'whatsapp' ? 'Número com DDD' :
                     'URL ou Link'}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                      placeholder={
                        qrType === 'pix' ? 'exemplo@email.com' :
                        qrType === 'whatsapp' ? '5534991177058' :
                        'https://...'
                      }
                      value={qrValue}
                      onChange={(e) => setQrValue(e.target.value)}
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={!qrValue}
                      className="px-6 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <QrCode className="h-5 w-5" />
                      Gerar
                    </button>
                  </div>
                </div>

                {/* CONFIGURAÇÕES ADICIONAIS */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Tamanho
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition">
                      <option value="200">200px</option>
                      <option value="300" selected>300px</option>
                      <option value="400">400px</option>
                      <option value="500">500px</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Cor
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition">
                      <option value="black">Preto</option>
                      <option value="burgundy">Vermelho (ZENTHOS)</option>
                      <option value="gold">Dourado</option>
                      <option value="blue">Azul</option>
                      <option value="green">Verde</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input type="checkbox" id="logo" className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" defaultChecked />
                  <label htmlFor="logo" className="text-sm text-[#2D343A]">
                    Incluir logo ZENTHOS no centro
                  </label>
                </div>
              </div>
            </div>

            {/* PREVIEW DO QR CODE */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 text-center">
                  Preview
                </h2>

                {qrGenerated ? (
                  <div ref={qrRef} className="flex flex-col items-center">
                    <div className="w-64 h-64 bg-white border-2 border-[#E8EAE0] rounded-xl flex items-center justify-center relative">
                      {/* SIMULAÇÃO DE QR CODE COM LOGO */}
                      <div className="relative">
                        <div className="w-56 h-56 bg-[#2D343A] rounded-lg p-2">
                          <div className="w-full h-full bg-white rounded-md grid grid-cols-6 grid-rows-6 gap-1 p-2">
                            {Array.from({ length: 36 }).map((_, i) => (
                              <div key={i} className={`rounded-sm ${Math.random() > 0.55 ? 'bg-[#2D343A]' : 'bg-white'}`} />
                            ))}
                          </div>
                        </div>
                        {/* LOGO NO CENTRO */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#E8EAE0]">
                            <img src="/logo.png" alt="ZENTHOS" className="w-10 h-10 object-contain" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-[#2D343A]">QR Code gerado com sucesso!</p>
                      <p className="text-xs text-[#708090] mt-1">Clique em Baixar para salvar</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      <button
                        onClick={() => handleDownload('png')}
                        className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition flex items-center gap-2 text-sm"
                      >
                        <Download className="h-4 w-4" />
                        PNG
                      </button>
                      <button
                        onClick={() => handleDownload('jpg')}
                        className="px-4 py-2 border border-[#8B0000] text-[#8B0000] rounded-lg hover:bg-[#8B0000] hover:text-white transition flex items-center gap-2 text-sm"
                      >
                        <Image className="h-4 w-4" />
                        JPG
                      </button>
                      <button
                        onClick={handleCopy}
                        className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-sm"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copiado!' : 'Copiar'}
                      </button>
                      <button className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-sm">
                        <Printer className="h-4 w-4" />
                        Imprimir
                      </button>
                    </div>

                    <div className="mt-4 w-full">
                      <div className="flex items-center gap-2 p-3 bg-[#F8F4E6] rounded-lg text-xs text-[#708090]">
                        <Share2 className="h-4 w-4 flex-shrink-0" />
                        <span>Compartilhe o QR Code com seus clientes e parceiros.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-[#F8F4E6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <QrCode className="h-12 w-12 text-[#708090]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2D343A]">Nenhum QR Code gerado</h3>
                    <p className="text-sm text-[#708090] mt-1">
                      Preencha os campos ao lado e clique em "Gerar"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className="px-2 py-1 bg-[#F8F4E6] rounded text-xs text-[#708090]">📱 PIX</span>
                      <span className="px-2 py-1 bg-[#F8F4E6] rounded text-xs text-[#708090]">📄 Documentos</span>
                      <span className="px-2 py-1 bg-[#F8F4E6] rounded text-xs text-[#708090]">📋 Contratos</span>
                      <span className="px-2 py-1 bg-[#F8F4E6] rounded text-xs text-[#708090]">🏢 Empresas</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QR CODES GERADOS RECENTEMENTE */}
          {qrGenerated && (
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
              <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#8B0000]" />
                QR Codes Gerados Recentemente
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-[#E8EAE0] rounded-lg p-3 text-center hover:shadow-md transition">
                    <div className="w-full aspect-square bg-[#F8F4E6] rounded-lg flex items-center justify-center">
                      <QrCode className="h-12 w-12 text-[#2D343A]" />
                    </div>
                    <p className="text-xs text-[#708090] mt-2 truncate">QR-{String(i).padStart(4, '0')}</p>
                    <button className="mt-1 text-xs text-[#8B0000] hover:underline">Baixar</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
