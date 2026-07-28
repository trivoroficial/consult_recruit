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
}

module.exports = nextConfig
