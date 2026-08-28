import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const publicRoutes = ['/', '/sobre', '/servicos', '/contato', '/login', '/cadastro', '/recuperar-senha', '/vagas', '/empresas']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('🔍 Middleware:', pathname)

  // Rotas públicas - sempre permitir
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    console.log('✅ Rota pública:', pathname)
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Se não tiver usuário, redireciona para login
  if (!user) {
    console.log('❌ Sem usuário, redirecionando para /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('✅ Usuário logado:', user.email)

  // Buscar role do usuário
  let role = 'candidato'
  try {
    const { data: userData } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single()
    role = userData?.role || 'candidato'
    console.log('📋 Role:', role)
  } catch (error) {
    console.error('❌ Erro ao buscar role:', error)
  }

  // Proteção de rotas
  if (pathname.startsWith('/admin') && role !== 'admin') {
    console.log('🚫 Acesso negado ao admin')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/empresa') && role !== 'admin' && role !== 'empresa') {
    console.log('🚫 Acesso negado à empresa')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/candidato') && role !== 'admin' && role !== 'candidato') {
    console.log('🚫 Acesso negado ao candidato')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('✅ Acesso permitido:', pathname)
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp|logo.*|recrutamento.*).*)',
  ],
}
