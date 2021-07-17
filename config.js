import Joi from 'joi'

const proxyItem = Joi.object({
  from: Joi.string().uri({ relativeOnly: true }),
  to: Joi.string().uri(),
  opts: Joi.object()
})

export const schema = Joi.alternatives().try(
  Joi.string(),
  Joi.object({
    proxy: Joi.array().items(proxyItem),
    dirs: Joi.array().items(Joi.string()),
    spa: [Joi.boolean(), Joi.string()],
    port: Joi.number().port(),
    host: [Joi.string().ip(), Joi.string().hostname()]
  })
)

console.log(schema.validate({
  proxy: [{ from: '/foo', to: 'http://localhost:8081/api' }],
  spa: true,
  host: '0.0.0.0'
}))
