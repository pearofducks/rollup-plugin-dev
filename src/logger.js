import fp from 'fastify-plugin'
import dateTime from 'date-time'
import ms from 'ms'
import { bold, blue, dim, yellow, red, bgRed, cyan, green } from 'femtocolor'

const colorCodes = { 5: red, 4: yellow, 3: cyan, 2: green }
const getColor = status => colorCodes[status / 100 | 0]
export const responseLogger = fp(async server => {
  const logResponse = async (req, reply) => {
    const status = reply.statusCode
    // const c = getColor(status)
    const timing = ms(parseInt(reply.getResponseTime())) || ''
    server.log.info({ method: req.method, url: req.url, status, timing })
    // server.log.info(bold(c(req.method)) + ' ' + req.url + c(' • ') + dim(status + ' • ' + timing))
  }
  server.addHook('onResponse', logResponse)
})


const header = blue('⚡︎dev-server')

const levelColor = {
  10: dim, // trace
  20: dim, // debug
  30: dim, // info
  40: yellow, // warn
  50: red, // error
  60: bgRed, // fatal
}
const getLevelColor = ({ level }) => levelColor[level || 10]
const EOL = '\n'
export const prettifier = () => entry => {
  console.log("ENTRY", entry)
  const output = []
  const color = getLevelColor(entry)
  output.push(`[${dateTime()}]`)

  return output.join(' ') + EOL
}
