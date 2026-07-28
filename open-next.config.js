// open-next.config.js
/** @type {import('@opennextjs/cloudflare').OpenNextConfig} */
const config = {
  platform: 'cloudflare',
  output: 'standalone',
  incremental: true,
  // Configuração para o Next.js 14
  nextConfig: {
    images: {
      domains: ['i.ibb.co'],
    },
  },
}

module.exports = config
