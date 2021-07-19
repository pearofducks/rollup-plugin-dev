import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { normalize, serverDefaults } from '#config'

const Config = suite('Config')
const containsAllServerDefaults = (config) => Object.entries(serverDefaults).forEach(([k, v]) => {
  assert.is(config.server[k], v)
})

Config('has sane defaults', () => {
  const config = normalize()
  assert.is(config.dirs[0], '.')
  assert.is(config.port, 8080)
  containsAllServerDefaults(config)
})

Config('normalizes a directory string', () => {
  const config = normalize('dist')
  assert.is(typeof config, 'object')
  assert.is(config.dirs[0], 'dist')
})

Config('processes a config object', () => {
  const config = normalize({
    dirs: ['foo', 'bar'],
    port: 9090
  })
  assert.is(config.dirs.length, 2)
  assert.is(config.port, 9090)
})

Config('config object can have server options', () => {
  const config = normalize({
    port: 9090,
    server: {
      https: true
    }
  })
  assert.is(config.server.https, true)
  containsAllServerDefaults(config)
  assert.is(config.port, 9090)
})

Config('throws on invalid attributes', () => {
  const tryNormalize = () => normalize({
    dirs: 'whoops'
  })
  assert.throws(tryNormalize)
})

Config.run()
