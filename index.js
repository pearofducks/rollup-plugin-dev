import { format as urlFormat } from 'url'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import send from 'koa-send'
import router from 'koa-route'
import proxy from 'koa-better-http-proxy'
import { default as color, bold, dim, green, blue, red } from 'colorette'
import ms from 'ms'
import dateTime from 'date-time'

let app = null
const { info, error } = console
const colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green'
}

const stamp = () => `[${dateTime()}]`
const header = blue('⚡︎dev-server')
const notice = (...args) => info(header, ...args)
const setupStatic = ({ basePath }, path) => mount(basePath || '/', serve(path))
const logger = async (ctx, next) => {
  const start = Date.now()
  try { await next() }
  catch (e) { error(header, red(e)) }
  const status = ctx.status / 100 | 0
  const c = color[colorCodes[status] || 'reset']
  info(stamp(), c(bold(ctx.method)), ctx.originalUrl, c('•'), dim(ctx.status), dim(ms(Date.now() - start)))
}
const fallback = (opts) => async (ctx) => {
  if (ctx.accepts('html')) {
    if (!opts.silent) info(stamp(), dim('Serving fallback for'), ctx.originalUrl)
    await send(ctx, typeof opts.spa === 'boolean' ? 'index.html' : opts.spa)
  }
}
const printListenInfo = (server) => {
  const address = server.address()
  address.hostname = address.address
  const a = urlFormat(address)
  notice("listening on", bold(green(`http://${a}`)))
}

export default (opts = {}) => ({
  name: 'dev-server',
  buildEnd() {
    if (!app) {
      if (!process.env.ROLLUP_WATCH && !opts.force) return this.warn(header + " cowardly refusing to start without 'watch' mode in rollup or 'force' option set")
      app = new Koa()
      if (!opts.silent) app.use(logger)
      if (opts.extend) opts.extend(app, { router, proxy, send, serve, mount, color })
      const dirs = typeof opts === 'string' ? [opts] : (opts.dirs || ['.'])
      dirs.forEach(path => app.use(setupStatic(opts, path)))
      if (opts.proxy) Object.entries(opts.proxy).forEach(([src, dest]) => app.use(router.all(src, proxy(dest))))
      if (opts.spa) app.use(router.get('*', fallback(opts)))
      const server = app.listen({ port: (opts.port || 8080), host: opts.host })
      notice("serving [", dirs.join(','), "]")
      printListenInfo(server)
    }
  }
})
