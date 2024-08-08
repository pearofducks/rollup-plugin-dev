import { normalize } from './config.js'
import { boot } from './server.js'

export default (opts = {}) => {
  let booted = false
  let server
  return {
    name: 'dev-server',
    async closeWatcher() {
      booted = false
      await server.server.close()
    },
    async writeBundle() {
      if (booted) return
      booted = true
      try {
        const config = normalize(opts)
        if (!this.meta.watchMode) {
          if (!config.force) return
          else this.warn(`Starting dev-server even though we're not in watch mode`)
        }
        server = await boot(config)
      } catch (err) {
        this.error(err)
      }
    }
  }
}
