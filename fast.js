import Fastify from 'fastify'
import proxy from './src/proxy.js'
import files from './src/static.js'

async function start(opts) {
  const server = Fastify({ logger: true, ignoreTrailingSlash: true, disableRequestLogging: true })
  // need to normalize opts into an object with defaults (or use autoload)
  // const dirs = typeof opts === 'string' ? [opts] : (opts.dirs || ['.'])

  server.register(proxy, opts)
  server.register(files, opts)
  await server.ready()
  await server.listen(8080)
}

start({
  dirs: [
    'foo',
    'bar'
  ]
  // proxy: [
  //   { to: 'https://www.google.com/', from: '/the/googles' }
  // ]
})
