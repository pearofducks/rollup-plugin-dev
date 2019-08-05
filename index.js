import { format as urlFormat } from 'url'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import send from 'koa-send'
import router from 'koa-route'
import proxy from 'koa-better-http-proxy'
import { default as color, bold, green, blue, red } from 'colorette'
import ms from 'ms'
import dateTime from 'date-time'

let app = null
const { info, error } = console

const stamp = () => `[${dateTime()}]`
const header = blue('⚡︎dev-server')
const notice = (...args) => info(header, ...args)
const setupStatic = ({ basePath }, path) => mount(basePath || '/', serve(path))
const logger = async (ctx, next) => {
  const start = Date.now()
  try { await next() }
  catch (e) { error(header, red(e)) }
  info(stamp(), bold(ctx.method), ctx.originalUrl, ms(Date.now() - start))
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

      // needs to also detect when HTML is desired and only respond to that
      if (opts.spa) app.use(router.get('*', async (ctx) => await send(ctx, typeof opts.spa === 'boolean' ? 'index.html' : opts.spa)))
      const server = app.listen({ port: (opts.port || 8080), host: opts.host })
      notice("serving [", dirs.join(','), "]")
      printListenInfo(server)
    }
  }
})
