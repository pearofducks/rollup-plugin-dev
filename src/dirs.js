import fp from 'fastify-plugin'
import staticPlugin from 'fastify-static'
import { resolve } from 'path'
import { logDir } from './logger.js'

export default fp(async (server, { basePath, dirs, dirname = '' }) => {
  const prefix = basePath
  const root = dirs.map(dir => resolve(dirname, dir))
  root.forEach(logDir(server))

  server.register(staticPlugin, { prefix, root })
})
