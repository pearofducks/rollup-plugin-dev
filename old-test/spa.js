import test from 'ava'
import request from 'supertest'
import { app, initApp } from '../server'

test.before(_ => {
  initApp({ force: true, dirs: ['test/supporting'], spa: 'test/supporting/200.html' }, true)
})

test('serves', async t => {
  const res = await request(app.callback())
    .get('/200.html')
    .expect(200)
  t.is(res.text.trim(), 'success')
})

test('wont 404', async t => {
  const res = await request(app.callback())
    .get('/404.html')
    .expect(200)
  t.is(res.text.trim(), 'success')
})
