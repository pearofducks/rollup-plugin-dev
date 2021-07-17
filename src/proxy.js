import fp from 'fastify-plugin'
import proxyPlugin from 'fastify-http-proxy'

const createProxy = (server) => ({ from, to, opts }) => {
  if (from.endsWith('/')) throw Error(`'from' field cannot end in '/' - caused by: ` + from)
  const url = new URL(to)
  const upstream = url.origin
  const rewritePrefix = url.pathname
  server.register(proxyPlugin, {
    prefix: from,
    upstream,
    rewritePrefix,
    undici: false,
    ...opts
  })
}

export default fp(async (server, { proxy = [] }) => proxy.forEach(createProxy(server)))
