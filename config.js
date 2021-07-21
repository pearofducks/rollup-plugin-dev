import Joi from 'joi'
import { prettifier } from './src/logger.js'

const proxyItem = Joi.object({
  from: Joi.string().uri({ relativeOnly: true }),
  to: Joi.string().uri(),
  opts: Joi.object()
})

const schema = Joi.alternatives().try(
  Joi.string(),
  Joi.object({
    silent: Joi.boolean(),
    force: Joi.boolean(),
    proxy: Joi.array().items(proxyItem),
    dirs: Joi.array().items(Joi.string()),
    dirname: Joi.string(),
    spa: [Joi.boolean(), Joi.string()],
    port: Joi.number().port(),
    host: [Joi.string().ip(), Joi.string().hostname()],
    basePath: Joi.string().uri({ relativeOnly: true }),
    extend: Joi.function(),
    server: Joi.object()
  })
)

export const serverDefaults = Object.freeze({
  ignoreTrailingSlash: true,
  disableRequestLogging: true
})

const pluginServer = Object.freeze({
  logger: { prettyPrint: { suppressFlushSyncWarning: true }, prettifier }
})

export const defaults = {
  proxy: [],
  dirs: ['.'],
  port: 8080,
  host: 'localhost',
  spa: false,
  silent: false,
  force: false,
  server: {
    ...pluginServer,
    ...serverDefaults
  },
  basePath: undefined,
  extend: undefined,
  dirname: undefined
}

export const normalize = (rollupOptions = {}) => {
  const parsed = Joi.attempt(rollupOptions, schema)
  const normalized = (typeof parsed === 'string') ? { dirs: [parsed] } : parsed
  const serverConfig = Object.assign({}, defaults.server, normalized.server)
  const config = Object.assign({}, defaults, normalized)
  config.server = serverConfig
  if (config.silent) config.server.logger = false
  return config
}
