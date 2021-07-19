import fp from 'fastify-plugin'
import dateTime from 'date-time'
import ms from 'ms'
import { bold, blue, dim, yellow, red, cyan, green } from 'femtocolor'

const EOL = '\n'
const colorCodes = { 5: red, 4: yellow, 3: cyan, 2: green }
const getColor = status => colorCodes[status / 100 | 0]

export const responseLogger = fp(async server => {
  const logResponse = async (req, reply) => {
    const status = reply.statusCode
    const c = getColor(status)
    const timing = ms(parseInt(reply.getResponseTime())) || ''
    server.log.info(bold(c(req.method)) + ' ' + req.url + c(' • ') + dim(status + ' • ' + timing))
  }
  server.addHook('onResponse', logResponse)
})


export const header = blue('⚡︎dev-server')

export const prettifier = () => entry => {
  if (entry.reqId) return
  if (entry.msg) {
    // console.log("ENTRY", entry)
    if (entry.msg.includes('Server listening')) {
      const startup = entry.msg.replace('Server listening', header).split('at')
      entry.msg = startup[0] + 'listening on' + bold(green(startup[1]))
    }
    const output = []
    output.push(`[${dateTime()}]`)
    output.push(entry.msg)
    return output.join(' ') + EOL
  }
}

export const logDir = (server) => (dir) => server.log.info(header + ' serving ' + bold(dir))
export const logSpa = (server, spaFile) => server.log.info(header + ' using fallback file ' + bold(spaFile))
export const logProxy = (server, from, to) => server.log.info(header + ' proxying from ' + bold(yellow(from)) + ' to ' + bold(yellow(to)))
