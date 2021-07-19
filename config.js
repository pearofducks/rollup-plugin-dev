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
    proxy: Joi.array().items(proxyItem),
    dirs: Joi.array().items(Joi.string()),
    dirname: Joi.string(),
    spa: [Joi.boolean(), Joi.string()],
    port: Joi.number().port(),
    host: [Joi.string().ip(), Joi.string().hostname()],
    basePath: Joi.string().uri({ relativeOnly: true }),
    extend: Joi.function()
  })
)

export const serverDefaults = {
  ignoreTrailingSlash: true,
  disableRequestLogging: true
}

const pluginServer = {
  logger: { prettyPrint: { suppressFlushSyncWarning: true }, prettifier }
}

export const defaults = {
  proxy: [],
  dirs: ['.'],
  spa: false,
  port: 8080,
  host: 'localhost',
  server: {
    ...pluginServer,
    ...serverDefaults
  },
  basePath: undefined,
  extend: undefined,
  dirname: undefined
}

export const normalize = (rollupOptions) => {
  const parsed = Joi.attempt(rollupOptions, schema)
  const config = (typeof parsed === 'string') ? { dirs: [parsed] } : parsed
  return Object.assign({}, defaults, config)
}
