import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const Dirs = suite('Dirs')

Dirs.before(async t => {
  t.server = await init({ dirs: ['support'], dirname: __dirname, server: serverDefaults })
})

Dirs.after(async t => {
  await t.server.close()
})

Dirs('serves', async () => {
  const res = await server.inject().get('/200.html')
  assert.is(res.statusCode, 200)
  assert.is(res.body.trim(), 'success')
})

Dirs.run()
