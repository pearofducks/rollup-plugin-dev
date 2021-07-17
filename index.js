import { normalize } from './config.js'
import { boot } from './server.js'

export default (opts = {}) => {
  let booted = false
  return {
    name: 'dev-server',
    async writeBundle() {
      if (booted) return
      try {
        const config = normalize(opts)
        if (!this.meta.watchMode) {
          if (!config.force) return
          else this.warn(`Starting dev-server even though we're not in watch mode`)
        }
        await boot(config)
        booted = true
      } catch (err) {
        this.error(err)
      }
    }
  }
}
