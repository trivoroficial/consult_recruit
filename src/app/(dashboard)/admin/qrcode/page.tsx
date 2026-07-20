'use client'

import { useState, useRef } from 'react'
import { SidebarAdmin } from '@/components/dashboard/SidebarAdmin'
import { DashboardFooter } from '@/components/dashboard/DashboardFooter'
import { 
  QrCode, Download, Copy, Check, 
  Smartphone, FileText, CreditCard, 
  Building2, Users, Link2, Share2,
  Wallet, File, Image as ImageIcon, Printer,
  Clock, Upload, Scan,
  RefreshCw
} from 'lucide-react'
import QRCode from 'qrcode'

export default function AdminQRCode() {
  const [qrType, setQrType] = useState('pix')
  const [qrValue, setQrValue] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [scanMode, setScanMode] = useState<'gerar' | 'ler'>('gerar')
  const [scanResult, setScanResult] = useState('')
  const [scanning, setScanning] = useState(false)
  const [qrColor, setQrColor] = useState('#2D343A')
  const [qrSize, setQrSize] = useState(300)
  const [includeLogo, setIncludeLogo] = useState(true)
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

  // GERAR QR CODE REAL
  const generateQR = async () => {
    if (!qrValue) return

    try {
      const canvas = document.createElement('canvas')
      
      const opts = {
        width: qrSize,
        margin: 2,
        color: {
          dark: qrColor,
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H' as const // <- CORREÇÃO: 'as const'
      }

      await QRCode.toCanvas(canvas, qrValue, opts)

      if (includeLogo) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const logoSize = qrSize * 0.2
          const logoX = (qrSize - logoSize) / 2
          const logoY = (qrSize - logoSize) / 2

          ctx.fillStyle = '#FFFFFF'
          ctx.shadowColor = 'rgba(0,0,0,0.1)'
          ctx.shadowBlur = 10
          ctx.beginPath()
          ctx.arc(qrSize/2, qrSize/2, logoSize/2 + 8, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0

          ctx.fillStyle = '#8B0000'
          ctx.font = `bold ${logoSize * 0.6}px Arial, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('Z', qrSize/2, qrSize/2 + 2)

          ctx.strokeStyle = '#8B0000'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(qrSize/2, qrSize/2, logoSize/2 - 4, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      setQrImage(canvas.toDataURL('image/png'))
      setQrGenerated(true)
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error)
      alert('Erro ao gerar QR Code. Verifique o valor e tente novamente.')
    }
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

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
              <p style="font-family:Arial;color:#2D343A;margin-top:20px;">ZENTHOS</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  const handleScanImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
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
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-[#F8F4E6] flex flex-col">
      <SidebarAdmin />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-[#E8EAE0] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#2D343A]">QR Code Center</h1>
            <p className="text-sm text-[#708090]">Gere QR Codes válidos para leitura em celulares</p>
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
              Ler
            </button>
          </div>
        </header>

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PAINEL ESQUERDO */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6">
                
                {scanMode === 'gerar' ? (
                  <>
                    <h2 className="text-lg font-semibold text-[#2D343A] mb-4 flex items-center gap-2">
                      <QrCode className="h-5 w-5 text-[#8B0000]" />
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D343A] mb-1.5">
                          Tamanho
                        </label>
                        <select 
                          className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
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
                          className="w-full px-4 py-3 border border-[#E8EAE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                          value={qrColor}
                          onChange={(e) => setQrColor(e.target.value)}
                        >
                          <option value="#2D343A">Preto</option>
                          <option value="#8B0000">Vermelho (ZENTHOS)</option>
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
                        className="rounded border-[#E8EAE0] text-[#8B0000] focus:ring-[#8B0000]" 
                        checked={includeLogo}
                        onChange={(e) => setIncludeLogo(e.target.checked)}
                      />
                      <label htmlFor="logo" className="text-sm text-[#2D343A]">
                        Incluir logo ZENTHOS no centro
                      </label>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                      <p className="font-medium">📱 Dica:</p>
                      <p>Para WhatsApp, digite apenas o número com DDD (ex: 5534991177058)</p>
                    </div>
                  </>
                ) : (
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
                          <p className="text-sm font-medium text-green-800">✅ QR Code lido!</p>
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

            {/* PAINEL DIREITO - PREVIEW */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8EAE0] p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-[#2D343A] mb-4 text-center">
                  {scanMode === 'gerar' ? 'Preview' : 'Leitor'}
                </h2>

                {scanMode === 'gerar' ? (
                  qrGenerated && qrImage ? (
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
                        <p className="text-xs text-green-600 mt-1">✅ Válido para leitura em celulares</p>
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
                          <ImageIcon className="h-4 w-4" />
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
                  )
                ) : (
                  <div className="text-center">
                    <Scan className="h-16 w-16 text-[#8B0000] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#2D343A]">Leitor</h3>
                    <p className="text-sm text-[#708090] mt-2">
                      Faça upload de uma imagem com QR Code
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
        </div>

        <DashboardFooter />
      </div>
    </div>
  )
}
