'use server'

import { supabase } from '@/lib/supabase/server'
import QRCode from 'qrcode'

export async function gerarQRCode(data: any) {
  try {
    const supabaseClient = supabase()
    
    // Gerar QR Code em PNG
    const qrCodeDataURL = await QRCode.toDataURL(data.conteudo, {
      width: data.tamanho || 300,
      margin: 2,
      color: {
        dark: data.cor || '#2D343A',
        light: '#FFFFFF'
      }
    })

    // Salvar no banco
    const { data: qrCode, error } = await supabaseClient
      .from('qrcodes')
      .insert([{
        tipo: data.tipo || 'link',
        conteudo: data.conteudo,
        nome: data.nome || 'QR Code',
        cor: data.cor || '#2D343A',
        tamanho: data.tamanho || 300,
        imagem: qrCodeDataURL
      }])
      .select()
      .single()

    if (error) throw error

    return { success: true, data: qrCode, qrCodeDataURL }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function listarQRCodes() {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('qrcodes')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function buscarQRCodePorId(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('qrcodes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function excluirQRCode(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { error } = await supabaseClient
      .from('qrcodes')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function baixarQRCode(id: number) {
  try {
    const supabaseClient = supabase()
    
    const { data, error } = await supabaseClient
      .from('qrcodes')
      .select('imagem, nome')
      .eq('id', id)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
