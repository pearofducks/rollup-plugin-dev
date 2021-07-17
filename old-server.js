import { resolve as fullPath } from 'path'
import { existsSync as exists } from 'fs'
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


export let app = null
let quiet = false
let veryQuiet = false
let _info, _error
const colorCodes = { 5: 'red', 4: 'yellow', 3: 'cyan', 2: 'green' }
const stamp = () => `[${dateTime()}]`
const header = blue('⚡︎dev-server')
const info = (...args) => !quiet && _info(...args)
const notice = (...args) => !veryQuiet && _info(header, ...args)
const setupStatic = (app, { basePath }) => (path) => app.use(mount(basePath || '/', serve(path)))
const setupProxy = (app) => ([src, dest]) => app.use(router.all(src, proxy(...(Array.isArray(dest) ? dest : [dest]))))
const logger = async (ctx, next) => {
  const start = Date.now()
  try {
    await next()
  } catch (err) { _error(err) }
  const status = ctx.status / 100 | 0
  const c = color[colorCodes[status] || 'reset']
  info(stamp(), c(bold(ctx.method)), ctx.originalUrl, c('•'), dim(ctx.status), dim(ms(Date.now() - start)))
}
function setupFallback (app, opts) {
  const fallbackFile = typeof opts.spa === 'boolean' ? 'index.html' : opts.spa
  if (!exists(fallbackFile)) return _error(header, red('Fallback file'), red(bold(fullPath(fallbackFile))), red('from the SPA option not found - not setting up fallback'))
  else notice("using fallback file", bold(fullPath(fallbackFile)))
  const fallback = async (ctx) => {
    if (ctx.accepts('html')) {
      info(stamp(), dim(`Serving ${fallbackFile} for`), ctx.originalUrl)
      await send(ctx, fallbackFile)
    }
  }
  app.use(router.get('*', fallback))
}
const printListenInfo = (server) => {
  const address = server.address()
  address.hostname = address.address
  const a = urlFormat(address)
  notice("listening on", bold(green(`http://${a}`)))
}

export async function initApp(opts = {}, testing) {
  quiet = !!opts.silent
  veryQuiet = opts.silent === 'very';
  ({ info: _info, error: _error } = console)
  const warn = (!quiet && this && this.warn) || (() => {})
  if (!process.env.ROLLUP_WATCH && !opts.force) return warn(header + " cowardly refusing to start without 'watch' mode in rollup or 'force' option set")
  app = new Koa()
  if (!quiet) app.use(logger)
  if (opts.extend) opts.extend(app, { router, proxy, send, serve, mount, color })
  const dirs = typeof opts === 'string' ? [opts] : (opts.dirs || ['.'])
  dirs.forEach(setupStatic(app, opts))
  if (opts.proxy) Object.entries(opts.proxy).forEach(setupProxy(app))
  dirs.forEach(d => notice("serving", bold(fullPath(d))))
  if (opts.spa) setupFallback(app, opts)
  if (!testing) {
    const server = app.listen({ port: (opts.port || 8080), host: opts.host }, () => printListenInfo(server))
  }
}
