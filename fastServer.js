import { init } from './fast.js'
import getPort from 'get-port'

const opts = {
  basePath: '/llama',
  dirs: [
    'foo',
    'bar'
  ]
  // proxy: [
  //   { to: 'https://www.google.com/', from: '/the/googles' }
  // ]
}

const port = await getPort({ port: [opts.port, ...getPort.makeRange(8081, 9000)] })
const server = init({ logger: true, ignoreTrailingSlash: true, disableRequestLogging: true }, opts)
await server.listen(opts.port, opts.host)
