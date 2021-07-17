import Fastify from 'fastify'
import proxy from './proxy.js'
import dirs from './dirs.js'
import spa from './spa.js'

export async function init(serverOpts, config) {
  const server = Fastify(serverOpts)
  await server.register(proxy, config)
  await server.register(dirs, config)
  await server.register(spa, { ...config, prefix: config.basePath })
  if (config.extend) await server.register(config.extend, config)
  // TODO
  // notFoundHandler + content type for SPA functionality?
  // TODO split at least Listen off
  await server.ready()

  return server
}
