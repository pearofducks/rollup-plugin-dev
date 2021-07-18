import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import Fastify from 'fastify'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const Spa = suite('Spa')

Spa.before(async t => {
  t.upstreamServer = Fastify()
  t.upstreamErrorText = 'Upstream 404'
  t.upstreamServer.get('/404', async (_, reply) => reply.status(404).send(t.upstreamErrorText))
  await t.upstreamServer.ready()
  await t.upstreamServer.listen(12345)

  t.server = await init({
    dirs: ['support'],
    spa: '200.html',
    proxy: [
      { from: '/404-proxy', to: 'http://localhost:12345/404' }
    ],
    dirname: __dirname,
    server: { log: true, ...serverDefaults }
  })
})

Spa.after(async t => {
  await t.server.close()
  await t.upstreamServer.close()
})

Spa('serves', async t => {
  const res = await t.server.inject().get('/200.html')
  assert.is(res.statusCode, 200)
  assert.is(res.body.trim(), 'success')
})

Spa(`won't 404`, async t => {
  const res = await t.server.inject().get('/404.html')
  assert.is(res.statusCode, 200)
  assert.is(res.body.trim(), 'success')
})

Spa(`allows 404s from upstream API`, async t => {
  const res = await t.server.inject().get('/404-proxy')
  assert.is(res.statusCode, 404)
  assert.is(res.body, t.upstreamErrorText)
})

// must be run from package.json or project root
Spa('works without dirname', async () => {
  const server = await init({ dirs: ['test/support'], spa: '200.html', server: serverDefaults })
  const fileRes = await server.inject().get('/200.html')
  assert.is(fileRes.statusCode, 200)
  const spaRes = await server.inject().get('/404.html')
  assert.is(spaRes.statusCode, 200)
})

Spa.run()
