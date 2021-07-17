import { init } from './fast.js'

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

const server = init({ logger: true, ignoreTrailingSlash: true, disableRequestLogging: true }, opts)
await server.listen(opts.port, opts.host)
