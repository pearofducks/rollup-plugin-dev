import { app, initApp } from './server'

export default (opts = {}) => ({
  name: 'dev-server',
  writeBundle() {
    if (!app) initApp.bind(this)(opts)
  }
})
