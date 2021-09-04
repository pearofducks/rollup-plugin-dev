import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const Basepath = suite('Basepath')
const basePath = '/my-app'

Basepath.before(async t => {
  t.server = await init({
    dirs: ['support'],
    dirname: __dirname,
    basePath,
    server: { ...serverDefaults }
  })
})

Basepath.after(async t => {
  await t.server.close()
})

Basepath('serves', async t => {
  const res = await t.server.inject().get('/my-app/200.html')
  assert.is(res.statusCode, 200)
  assert.is(res.body.trim(), 'success')
})

Basepath('404s', async t => {
  const res = await t.server.inject().get('/my-app/404.html')
  assert.is(res.statusCode, 404)
})

Basepath('can run spa under basepath', async () => {
  const server = await init({ dirs: ['support'], dirname: __dirname, basePath, spa: '200.html', server: { ...serverDefaults } })
  const fileRes = await server.inject().get('/my-app/200.html')
  assert.is(fileRes.statusCode, 200)
  const spaRes = await server.inject().get('/my-app/404.html')
  assert.is(spaRes.statusCode, 200)
})

// must be run from package.json or project root
Basepath('works without dirname', async () => {
  const server = await init({ dirs: ['test/support'], basePath, server: { ...serverDefaults } })
  const res = await server.inject().get('/my-app/200.html')
  assert.is(res.statusCode, 200)
})

Basepath.run()
