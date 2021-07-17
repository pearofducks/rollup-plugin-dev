import fp from 'fastify-plugin'

export default fp(async (server, opts) => {
  if (!opts.spa) return
  const fallbackFile = opts.spa === 'boolean' ? 'index.html' : opts.spa
  const spaHandler = async (req, reply) => {
    // if accepts html, send the fallback file
  }

  server.setNotFoundHandler(spaHandler)
})
