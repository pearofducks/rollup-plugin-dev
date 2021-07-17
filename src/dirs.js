import fp from 'fastify-plugin'
import staticPlugin from 'fastify-static'
import { resolve } from 'path'

export default fp(async (server, opts) => {
  const prefix = opts.basePath
  const root = opts.dirs.map(dir => resolve(dir))
  console.log("RESOLVED", root)

  server.register(staticPlugin, { prefix, root })
})
