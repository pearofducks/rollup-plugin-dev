import fp from 'fastify-plugin'

export default fp(async (server, { spa }) => {
  if (!spa) return
  const fallbackFile = (typeof spa === 'boolean') ? 'index.html' : spa
  const spaHandler = async (_, reply) => reply.sendFile(fallbackFile)
  server.setNotFoundHandler(spaHandler)
})
