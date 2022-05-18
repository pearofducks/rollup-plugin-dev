import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { init } from '#init'
import { serverDefaults } from '#config'
import WebSocket from 'ws'
import { createServer } from 'http'
import { promisify } from 'util'
import { once } from 'events'

const ProxyWs = suite('Proxy-websocket')

ProxyWs.before(async t => {
  t.origin = createServer()
  t.wss = new WebSocket.Server({ server: t.origin })

  await promisify(t.origin.listen.bind(t.origin))({ port: 0 })
  try {
    t.server = await init({
      dirs: ['support'],
      proxy: [
        { from: '/my-wss', to: `ws://localhost:${t.origin.address().port}`, opts: { websocket: true } }
      ],
      server: { ...serverDefaults }
    })
    await t.server.listen({ port: 0 })
  } catch (err) {
    console.error(err)
  }
})

ProxyWs.after(async t => {
  t.wss.close()
  t.origin.close()
})

ProxyWs('basic websocket proxy', async t => {
  const cookieValue = 'foo=bar'
  t.wss.on('connection', ws => {
    ws.on('message', message => {
      assert.is(message.toString(), 'hello')
      ws.send(message)
    })
  })

  const options = { headers: { Cookie: cookieValue } }
  const ws = new WebSocket(`ws://localhost:${t.server.server.address().port}/my-wss`, options)
  await once(ws, 'open')
  const stream = WebSocket.createWebSocketStream(ws)
  stream.write('hello')
  const [buf] = await once(stream, 'data')
  assert.is(buf.toString(), 'hello')

  await Promise.all([
    once(ws, 'close'),
    t.server.close()
  ])
})

ProxyWs.run()
