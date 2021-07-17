import fp from 'fastify-plugin'
import staticPlugin from 'fastify-static'
import { resolve } from 'path'

export default fp(async (server, { basePath, dirs, dirname = '' }) => {
  const prefix = basePath
  const root = dirs.map(dir => resolve(dirname, dir))

  server.register(staticPlugin, { prefix, root })
})
