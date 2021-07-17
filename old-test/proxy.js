import test from 'ava'
import request from 'supertest'
import { app, initApp } from '../server'

test.before(_ => {
  initApp({ force: true, proxy: { '/v3/*': ['polyfill.io', { https: true }] } }, true)
})

test('proxies', async t => {
  const res = await request(app.callback())
    .get('/v3/polyfill.min.js')
    .expect(200)
  t.true(res.text.includes('Disable minification'))
})

test('404s', async t => {
  await request(app.callback())
    .get('/404.html')
    .expect(404)
  t.pass()
})
