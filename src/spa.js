import fp from 'fastify-plugin'
import { logSpa } from './logger.js'

export default fp(async (server, { spa }) => {
  if (!spa) return
  const fallbackFile = (typeof spa === 'boolean') ? 'index.html' : spa
  logSpa(server, fallbackFile)
  const spaHandler = async (_, reply) => reply.sendFile(fallbackFile)
  server.setNotFoundHandler(spaHandler)
})
