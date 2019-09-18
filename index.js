import { app, initApp } from './server'

export default (opts = {}) => ({
  name: 'dev-server',
  buildEnd() {
    if (!app) initApp.bind(this)(opts)
  }
})
