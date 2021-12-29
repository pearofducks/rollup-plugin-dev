import { normalize } from './config.js'
import { boot } from './server.js'
import { deprecate } from './src/deprecation.js'

export default (opts = {}) => {
  let booted = false
  return {
    name: 'dev-server',
    async writeBundle() {
      deprecate.bind(this)(opts)
      if (booted) return
      booted = true
      try {
        const config = normalize(opts)
        if (!this.meta.watchMode) {
          if (!config.force) return
          else this.warn(`Starting dev-server even though we're not in watch mode`)
        }
        await boot(config)
      } catch (err) {
        this.error(err)
      }
    }
  }
}
