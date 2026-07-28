/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['lucide-react'],
  output: 'standalone',
}

module.exports = nextConfig
