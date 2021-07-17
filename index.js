import { schema } from './config.js'

export default (opts = {}) => ({
  name: 'dev-server',
  writeBundle() {
    try {
      const { value: config } = schema(opts)
      if (!this.meta.watchMode) {
        if (!config.force) return
        else this.warn(`Starting dev-server even though we're not in watch mode`)
      }
      console.log("DOIN THE THING")
      // if (!app) initApp.bind(this)(opts)
    } catch (err) {
      this.error(err)
    }
  }
})
