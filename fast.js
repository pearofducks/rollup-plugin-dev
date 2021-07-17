import Fastify from 'fastify'
import proxy from './src/proxy.js'
import dirs from './src/dirs.js'
import spa from './src/spa.js'

const defaults = {
  proxy: [],
  dirs: ['.'],
  spa: false,
  port: 8080,
  host: 'localhost'
}

export async function init(serverOpts, args) {
  const server = Fastify()
  // TODO
  // need to normalize opts into an object with defaults (or use autoload)
  // const dirs = typeof opts === 'string' ? [opts] : (opts.dirs || ['.'])
  const opts = Object.assign({}, defaults, args)
  await server.register(proxy, opts)
  await server.register(dirs, opts)
  await server.register(spa, { prefix: opts.basePath })
  if (opts.extend) await server.register(opts.extend)
  // TODO
  // notFoundHandler + content type for SPA functionality?
  // TODO split at least Listen off
  await server.ready()

  return server
}

