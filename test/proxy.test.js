import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import Fastify from 'fastify'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const Proxy = suite('Proxy')
const jsonPayload = { foo: 'bar', llama: 'wombat' }
const htmlPayload = `<div id="app"></div>`

Proxy.before(async t => {
  t.upstreamServer = Fastify()
  t.upstreamServer.get('/json', async (_, reply) => reply.send(jsonPayload))
  t.upstreamServer.get('/html', async (_, reply) => reply.type('text/html').send(htmlPayload))
  await t.upstreamServer.ready()
  await t.upstreamServer.listen(12345)

  t.server = await init({
    dirs: ['support'],
    dirname: __dirname,
    proxy: [
      { from: '/api', to: 'http://localhost:12345' },
      { from: '/just-json', to: 'http://localhost:12345/json' }
    ],
    server: serverDefaults
  })
})

Proxy.after(async t => {
  await t.server.close()
  await t.upstreamServer.close()
})

Proxy('can get json', async t => {
  const res = await t.server.inject().get('/api/json')
  assert.ok(res.headers['content-type'].includes('application/json'))
  assert.is(res.body, JSON.stringify(jsonPayload))
})

Proxy('can get html', async t => {
  const res = await t.server.inject().get('/api/html')
  assert.ok(res.headers['content-type'].includes('text/html'))
  assert.is(res.body, htmlPayload)
})

Proxy('can proxy to subpaths', async t => {
  const res = await t.server.inject().get('/just-json')
  assert.ok(res.headers['content-type'].includes('application/json'))
  assert.is(res.body, JSON.stringify(jsonPayload))
})

Proxy.run()
