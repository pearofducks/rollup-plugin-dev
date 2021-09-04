import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const Dirs = suite('Dirs')

Dirs.before(async t => {
  t.server = await init({
    dirs: ['support'],
    dirname: __dirname,
    server: { ...serverDefaults }
  })
})

Dirs.after(async t => {
  await t.server.close()
})

Dirs('serves', async t => {
  const res = await t.server.inject().get('/200.html')
  assert.is(res.statusCode, 200)
  assert.is(res.body.trim(), 'success')
})

Dirs('404s', async t => {
  const res = await t.server.inject().get('/404.html')
  assert.is(res.statusCode, 404)
})

// must be run from package.json or project root
Dirs('works without dirname', async () => {
  const server = await init({ dirs: ['test/support'], server: { ...serverDefaults } })
  const res = await server.inject().get('/200.html')
  assert.is(res.statusCode, 200)
})

Dirs.run()
