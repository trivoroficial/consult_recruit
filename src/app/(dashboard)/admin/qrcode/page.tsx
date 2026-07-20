'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  QrCode, Download, Copy, Check, 
  Smartphone, FileText, CreditCard, 
  Building2, Users, Link2, Share2,
  Wallet, File, Image, Printer,
  Clock, Camera, Upload, Scan,
  X, RefreshCw
} from 'lucide-react'

// BIBLIOTECA QRCODE (via CDN)
// Usaremos qrcode.js para gerar e html5-qrcode para ler

export default function AdminQRCode() {
  const router = useRouter()
  const [qrType, setQrType] = useState('pix')
  const [qrValue, setQrValue] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [scanMode, setScanMode] = useState<'gerar' | 'ler'>('gerar')
  const [scanResult, setScanResult] = useState('')
  const [scanning, setScanning] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const qrOptions = [
    { id: 'pix', label: 'PIX', icon: Wallet, color: 'bg-green-100 text-green-600' },
    { id: 'documento', label: 'Documento', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { id: 'contrato', label: 'Contrato', icon: File, color: 'bg-purple-100 text-purple-600' },
    { id: 'empresa', label: 'Empresa', icon: Building2, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'vaga', label: 'Vaga', icon: Users, color: 'bg-pink-100 text-pink-600' },
    { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone, color: 'bg-green-100 text-green-600' },
    { id: 'link', label: 'Link', icon: Link2, color: 'bg-cyan-100 text-cyan-600' },
  ]

  // Gerar QR Code
  const generateQR = () => {
    if (!qrValue) return
    
    // Criar canvas temporário para gerar QR Code com logo
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const size = 400
    canvas.width = size
    canvas.height = size

    // Fundo branco
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, size, size)

    // Simular QR Code (na vida real, usaríamos biblioteca)
    // Aqui criamos uma representação visual
    const qrSize = size - 60
    const cellSize = qrSize / 21
    const offset = 30

    // Desenhar padrão de QR Code simulado
    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 21; col++) {
        // Posicionar células do QR Code
        const x = offset + col * cellSize
        const y = offset + row * cellSize
        
        // Células dos cantos (padrão de posicionamento)
        const isCorner = (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7)
        const isFinder = isCorner && ((row < 3 || row > 3) || (col < 3 || col > 3))
        const isCenter = isCorner && row > 1 && row < 5 && col > 1 && col < 5
        
        if (isCorner) {
          ctx.fillStyle = isCenter ? '#FFFFFF' : '#2D343A'
          ctx.fillRect(x, y, cellSize, cellSize)
          continue
        }

        // Gerar padrão pseudo-aleatório baseado no valor do QR
        const hash = (row * 31 + col * 17) % 3
        const value = (qrValue.charCodeAt(row % qrValue.length) || 0) + col
        const isFilled = (value % 2 === 0) && hash !== 0
        
        if (isFilled) {
          ctx.fillStyle = '#2D343A'
          ctx.fillRect(x, y, cellSize, cellSize)
        }
      }
    }

    // Desenhar a logo no centro
    const logoSize = 60
    const logoX = (size - logoSize) / 2
    const logoY = (size - logoSize) / 2
    
    // Fundo branco para a logo
    ctx.fillStyle = '#FFFFFF'
    ctx.shadowColor = 'rgba(0,0,0,0.1)'
    ctx.shadowBlur = 20
    ctx.beginPath()
    ctx.arc(size/2, size/2, 40, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Carregar logo
    const logo = new Image()
    logo.crossOrigin = 'anonymous'
    logo.src = '/logo.png'
    logo.onload = () => {
      ctx.drawImage(logo, logoX + 5, logoY + 5, logoSize - 10, logoSize - 10)
      setQrImage(canvas.toDataURL('image/png'))
      setQrGenerated(true)
    }
    logo.onerror = () => {
      // Se a logo não carregar, desenhar um placeholder
      ctx.fillStyle = '#8B0000'
      ctx.font = 'bold 30px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Z', size/2, size/2)
      setQrImage(canvas.toDataURL('image/png'))
      setQrGenerated(true)
    }

    // Se a logo já estiver no cache, usar
    if (logo.complete && logo.naturalWidth > 0) {
      ctx.drawImage(logo, logoX + 5, logoY + 5, logoSize - 10, logoSize - 10)
      setQrImage(canvas.toDataURL('image/png'))
      setQrGenerated(true)
    }
  }

  // Baixar QR Code
  const handleDownload = (format: 'png' | 'jpg') => {
    if (!qrImage) return
    
    const link = document.createElement('a')
    link.download = `qrcode_zenthos.${format === 'png' ? 'png' : 'jpg'}`
    link.href = qrImage
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Copiar valor
  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Imprimir QR Code
  const handlePrint = () => {
    if (!qrImage) return
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>QR Code ZENTHOS</title></head>
          <body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#f8f4e6;">
            <div style="text-align:center;">
              <img src="${qrImage}" style="max-width:400px;border:2px solid #8B0000;border-radius:12px;padding:20px;background:white;" />
              <p style="font-family:Arial;color:#2D343A;margin-top:20px;">ZENTHOS - ${qrType.toUpperCase()}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  // Scanear QR Code via upload de imagem
  const handleScanImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        // Simular leitura do QR Code
        // Na vida real, usaríamos uma biblioteca como html5-qrcode
        setScanning(true)
        setTimeout(() => {
          const mockResult = `https://zenthos.com.br/${Math.random().toString(36).substring(7)}`
          setScanResult(mockResult)
          setScanning(false)
          setQrValue(mockResult)
          setQrType('link')
          setScanMode('gerar')
          generateQR()
        }, 1500)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">QR Code Center</h1>
            <p className="text-sm text-[#708090]">Gere ou leia QR Codes para PIX, documentos, contratos e muito mais</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setScanMode('gerar')}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                scanMode === 'gerar' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'border border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
              }`}
            >
              <QrCode className="h-4 w-4 inline mr-2" />
              Gerar
            </button>
            <button 
              onClick={() => setScanMode('ler')}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                scanMode === 'ler' 
                  ? 'bg-[#8B0000] text-white' 
                  : 'border border-[#E8EAE0] text-[#708090] hover:bg-[#F8F4E6]'
              }`}
            >
              <Scan className="h-4 w-4 inline mr-2" />
              Ler QR Code
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ===== PAINEL ESQUERDO ===== */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                
                {scanMode === 'gerar' ? (
                  // ===== MODO GERAR QR CODE =====
                  <>
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

                    {/* VALOR */}
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
                          onClick={generateQR}
                          disabled={!qrValue}
                          className="px-6 py-3 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <QrCode className="h-5 w-5" />
                          Gerar
                        </button>
                      </div>
                    </div>

                    {/* CONFIGURAÇÕES */}
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
                  </>
                ) : (
                  // ===== MODO LER QR CODE =====
                  <>
                    <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                      <Scan className="h-5 w-5 text-[#8B0000]" />
                      Ler QR Code
                    </h2>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-[#E8EAE0] rounded-xl p-8 text-center hover:border-[#8B0000] transition cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-12 w-12 text-[#708090] mx-auto mb-4" />
                        <p className="text-[#2D343A] font-medium">Clique para fazer upload</p>
                        <p className="text-sm text-[#708090]">ou arraste uma imagem com QR Code</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleScanImage}
                        />
                      </div>

                      {scanning && (
                        <div className="text-center py-4">
                          <RefreshCw className="h-8 w-8 text-[#8B0000] animate-spin mx-auto mb-2" />
                          <p className="text-sm text-[#708090]">Lendo QR Code...</p>
                        </div>
                      )}

                      {scanResult && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-green-800">✅ QR Code lido com sucesso!</p>
                          <p className="text-sm text-green-700 mt-1 break-all">{scanResult}</p>
                          <button 
                            onClick={() => {
                              setQrValue(scanResult)
                              setQrType('link')
                              setScanMode('gerar')
                              generateQR()
                            }}
                            className="mt-3 px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#700000] transition text-sm"
                          >
                            Usar este valor
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ===== PAINEL DIREITO - PREVIEW ===== */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 text-center">
                  {scanMode === 'gerar' ? 'Preview' : 'Leitor'}
                </h2>

                {scanMode === 'gerar' ? (
                  // ===== PREVIEW DO QR CODE GERADO =====
                  qrGenerated && qrImage ? (
                    <div ref={qrRef} className="flex flex-col items-center">
                      <div className="w-64 h-64 bg-white border-2 border-[#E8EAE0] rounded-xl flex items-center justify-center p-4">
                        <img 
                          src={qrImage} 
                          alt="QR Code ZENTHOS" 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-sm font-medium text-[#2D343A]">QR Code gerado com sucesso!</p>
                        <p className="text-xs text-[#708090] mt-1">Conteúdo: {qrValue}</p>
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
                        <button 
                          onClick={handlePrint}
                          className="px-4 py-2 border border-[#E8EAE0] rounded-lg hover:bg-[#F8F4E6] transition flex items-center gap-2 text-sm"
                        >
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
                  )
                ) : (
                  // ===== LEITOR DE QR CODE =====
                  <div className="text-center">
                    <Scan className="h-16 w-16 text-[#8B0000] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#2D343A]">Leitor de QR Code</h3>
                    <p className="text-sm text-[#708090] mt-2">
                      Faça upload de uma imagem contendo um QR Code para ler seu conteúdo.
                    </p>
                    {scanResult && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-medium">Conteúdo lido:</p>
                        <p className="text-sm text-green-700 break-all">{scanResult}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QR CODES GERADOS RECENTEMENTE */}
          {qrGenerated && scanMode === 'gerar' && (
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
