import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const publicRoutes = ['/', '/sobre', '/servicos', '/contato', '/login', '/cadastro', '/recuperar-senha', '/vagas', '/empresas']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rotas públicas
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
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

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Buscar role do usuário
  let role = 'candidato'
  try {
    const { data: userData } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single()
    role = userData?.role || 'candidato'
  } catch (error) {
    console.error('Erro ao buscar role:', error)
  }

  // Proteção por rota - ADMIN
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Proteção por rota - EMPRESA
  if (pathname.startsWith('/empresa') && role !== 'admin' && role !== 'empresa') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Proteção por rota - CANDIDATO
  if (pathname.startsWith('/candidato') && role !== 'admin' && role !== 'candidato') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp).*)',
  ],
}
