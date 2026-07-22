/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react'],
  experimental: {
    // Configurações experimentais
  },
  // Forçar limpeza de cache no build
  distDir: '.next',
}

module.exports = nextConfig
