'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import {
  QrCode, Plus, Search, Trash2, Eye, RefreshCw,
  Download, Copy, Check, Smartphone, FileText,
  CreditCard, Building2, Users, Link2, Share2,
  Wallet, File, Image, Printer, Clock, Upload,
  Scan, RefreshCw as RefreshIcon, X
} from 'lucide-react'
import { listarQRCodes, excluirQRCode, gerarQRCode } from '@/actions/qrcode'

export default function AdminQRCode() {
  const router = useRouter()
  const [qrcodes, setQrcodes] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [qrType, setQrType] = useState('pix')
  const [qrValue, setQrValue] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [qrColor, setQrColor] = useState('#2D343A')
  const [qrSize, setQrSize] = useState(300)
  const [includeLogo, setIncludeLogo] = useState(true)
  const [gerando, setGerando] = useState(false)

  useEffect(() => {
    carregarQRCodes()
  }, [])

  const carregarQRCodes = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await listarQRCodes()
      if (result.success) {
        setQrcodes(result.data || [])
      } else {
        setError(result.error || 'Erro ao carregar QR Codes')
      }
    } catch (err) {
      setError('Erro ao carregar QR Codes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este QR Code?')) return

    try {
      const result = await excluirQRCode(id)
      if (result.success) {
        await carregarQRCodes()
      } else {
        alert(result.error || 'Erro ao excluir QR Code')
      }
    } catch (error) {
      alert('Erro ao excluir QR Code')
    }
  }

  const handleGenerateQR = async () => {
    if (!qrValue) return

    setGerando(true)
    try {
      const result = await gerarQRCode({
        conteudo: qrValue,
        tipo: qrType,
        nome: `${qrType}_${Date.now()}`,
        cor: qrColor,
        tamanho: qrSize
      })

      if (result.success) {
        setQrImage(result.qrCodeDataURL)
        setQrGenerated(true)
        await carregarQRCodes()
      } else {
        alert(result.error || 'Erro ao gerar QR Code')
      }
    } catch (error) {
      alert('Erro ao gerar QR Code')
    } finally {
      setGerando(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = (format: 'png' | 'jpg') => {
    if (!qrImage) return
    const link = document.createElement('a')
    link.download = `qrcode_zenthos.${format === 'png' ? 'png' : 'jpg'}`
    link.href = qrImage
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const qrOptions = [
    { id: 'pix', label: 'PIX', icon: Wallet },
    { id: 'documento', label: 'Documento', icon: FileText },
    { id: 'contrato', label: 'Contrato', icon: File },
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'vaga', label: 'Vaga', icon: Users },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { id: 'link', label: 'Link', icon: Link2 },
  ]

  const filtered = qrcodes.filter(q =>
    q.nome?.toLowerCase().includes(search.toLowerCase()) ||
    q.conteudo?.toLowerCase().includes(search.toLowerCase()) ||
    q.tipo?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
        <SidebarAdmin />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <QrCode className="h-12 w-12 text-[#6B1A2A] animate-pulse mx-auto mb-4" />
            <p className="text-[#708090]">Carregando QR Codes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A] flex items-center gap-2">
              <QrCode className="h-6 w-6 text-[#6B1A2A]" />
              QR Code Center
            </h1>
            <p className="text-sm text-[#708090]">{qrcodes.length} QR Codes gerados</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={carregarQRCodes}
              className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-[#708090]"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* GERADOR */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-[#6B1A2A]" />
                  Gerar QR Code
                </h2>

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
                              ? 'border-[#6B1A2A] bg-[#6B1A2A]/5 text-[#6B1A2A]'
                              : 'border-[#E8EAE0] hover:border-[#6B1A2A]/30 hover:bg-[#F8F4E6]'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${qrType === opt.id ? 'bg-[#6B1A2A]/10 text-[#6B1A2A]' : 'bg-[#F8F4E6] text-[#708090]'}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-xs">{opt.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                    {qrType === 'pix' ? 'Chave PIX' :
                     qrType === 'whatsapp' ? 'Número com DDD' :
                     'URL ou Link'}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      placeholder={
                        qrType === 'pix' ? 'exemplo@email.com' :
                        qrType === 'whatsapp' ? '5534991177058' :
                        'https://...'
                      }
                      value={qrValue}
                      onChange={(e) => setQrValue(e.target.value)}
                    />
                    <button
                      onClick={handleGenerateQR}
                      disabled={!qrValue || gerando}
                      className="px-6 py-3 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {gerando ? (
                        <RefreshIcon className="h-5 w-5 animate-spin" />
                      ) : (
                        <QrCode className="h-5 w-5" />
                      )}
                      Gerar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                      Tamanho
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={qrSize}
                      onChange={(e) => setQrSize(parseInt(e.target.value))}
                    >
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
                    <select
                      className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A] transition"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                    >
                      <option value="#2D343A">Preto</option>
                      <option value="#6B1A2A">Vinho</option>
                      <option value="#C9A84C">Dourado</option>
                      <option value="#2563EB">Azul</option>
                      <option value="#16A34A">Verde</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="logo"
                    className="rounded border-[#E8EAE0] text-[#6B1A2A] focus:ring-[#6B1A2A]"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                  />
                  <label htmlFor="logo" className="text-sm text-[#2D343A]">
                    Incluir logo ZENTHOS no centro
                  </label>
                </div>
              </div>
            </div>

            {/* PREVIEW */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 text-center">
                  Preview
                </h2>

                {qrGenerated && qrImage ? (
                  <div className="flex flex-col items-center">
                    <div className="w-64 h-64 bg-white border-2 border-[#E8EAE0] rounded-xl flex items-center justify-center p-4">
                      <img 
                        src={qrImage} 
                        alt="QR Code ZENTHOS" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-[#2D343A]">QR Code gerado!</p>
                      <p className="text-xs text-[#708090] mt-1 break-all max-w-[200px]">{qrValue}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      <button
                        onClick={() => handleDownload('png')}
                        className="px-4 py-2 bg-[#6B1A2A] text-white rounded-lg hover:bg-[#4A0E1A] transition flex items-center gap-2 text-sm"
                      >
                        <Download className="h-4 w-4" />
                        PNG
                      </button>
                      <button
                        onClick={() => handleDownload('jpg')}
                        className="px-4 py-2 border border-[#6B1A2A] text-[#6B1A2A] rounded-lg hover:bg-[#6B1A2A] hover:text-white transition flex items-center gap-2 text-sm"
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
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-[#F8F4E6] rounded-full flex items-center justify-center mx-auto mb-4">
                      <QrCode className="h-12 w-12 text-[#708090]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#2D343A]">Nenhum QR Code gerado</h3>
                    <p className="text-sm text-[#708090] mt-1">
                      Preencha e clique em "Gerar"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* LISTA DE QR CODES */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#708090]" />
                <input 
                  type="text" 
                  placeholder="Buscar QR Codes..." 
                  className="w-full pl-10 pr-4 py-2 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1A2A]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {qrcodes.length === 0 ? (
              <div className="text-center py-8 text-[#708090]">
                <QrCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum QR Code gerado ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filtered.map((item) => (
                  <div key={item.id} className="border border-[#E8EAE0] rounded-lg p-3 text-center hover:shadow-md transition">
                    <div className="w-full aspect-square bg-[#F8F4E6] rounded-lg flex items-center justify-center">
                      {item.imagem ? (
                        <img src={item.imagem} alt={item.nome} className="w-full h-full object-contain p-2" />
                      ) : (
                        <QrCode className="h-12 w-12 text-[#2D343A]" />
                      )}
                    </div>
                    <p className="text-xs text-[#2D343A] font-medium mt-2 truncate">{item.nome || 'QR Code'}</p>
                    <p className="text-[10px] text-[#708090] truncate">{item.tipo || 'link'}</p>
                    <div className="flex justify-center gap-1 mt-1">
                      <button 
                        onClick={() => {}} 
                        className="p-1 hover:bg-[#F8F4E6] rounded"
                        title="Baixar"
                      >
                        <Download className="h-3 w-3 text-[#708090]" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1 hover:bg-[#F8F4E6] rounded"
                        title="Excluir"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
