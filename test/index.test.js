import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '../fast.js'

test('smoke', async () => {
  const server = await init()
  const response = await server.inject().get('/')
  console.log(response)
})

test.run()
