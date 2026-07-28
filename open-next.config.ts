// open-next.config.ts
import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  platform: 'cloudflare',
  output: 'standalone',
  incremental: true,
  // Configuração adicional para evitar erros
  nextConfig: {
    images: {
      domains: ['i.ibb.co'],
    },
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['lucide-react'],
  },
}

export default config
