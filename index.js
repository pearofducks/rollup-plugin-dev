import { normalize } from './config.js'

export default (opts = {}) => {
  let booted = false
  return {
    name: 'dev-server',
    writeBundle() {
      if (booted) return
      try {
        const config = normalize(opts)
        if (!this.meta.watchMode) {
          if (!config.force) return
          else this.warn(`Starting dev-server even though we're not in watch mode`)
        }
        booted = true
      } catch (err) {
        this.error(err)
      }
    }
  }
}
