import test from 'ava'
import request from 'supertest'
import { app, initApp } from '../server'

test.before(_ => {
  initApp({ force: true, dirs: ['test/supporting'] }, true)
})

test('serves', async t => {
  const res = await request(app.callback())
    .get('/200.html')
    .expect(200)
  t.is(res.text.trim(), 'success')
})

test('404s', async t => {
  const res = await request(app.callback())
    .get('/404.html')
    .expect(404)
  t.pass()
})
