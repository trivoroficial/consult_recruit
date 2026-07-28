// open-next.config.ts
import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  platform: 'cloudflare',
  output: 'standalone',
  incremental: true,
}

export default config
