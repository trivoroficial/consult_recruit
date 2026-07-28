// open-next.config.js
/** @type {import('@opennextjs/cloudflare').OpenNextConfig} */
const config = {
  platform: 'cloudflare',
  output: 'standalone',
  incremental: true,
}

module.exports = config
