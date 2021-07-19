import fp from 'fastify-plugin'
import proxyPlugin from 'fastify-http-proxy'
import { logProxy } from './logger.js'

const createProxy = (server) => ({ from, to, opts }) => {
  logProxy(server, from, to)
  const prefix = from.endsWith('/') ? from.slice(0, -1) : from
  const url = new URL(to)
  const upstream = url.origin
  const rewritePrefix = url.pathname
  server.register(proxyPlugin, {
    prefix,
    upstream,
    rewritePrefix,
    undici: false,
    ...opts
  })
}

export default fp(async (server, { proxy = [] }) => proxy.forEach(createProxy(server)))
