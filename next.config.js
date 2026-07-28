/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react'],
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
  // Ignorar erros de tipo no build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
