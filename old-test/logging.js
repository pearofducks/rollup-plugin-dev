import test from 'ava'
import request from 'supertest'
import sinon from 'sinon'
import { app, initApp } from '../server'

test.beforeEach(t => {
  t.context.info = console.info
  console.info = sinon.spy()
})

test.afterEach(t => {
  console.info = t.context.info
})

test.serial('logs', async t => {
  initApp({ force: true, dirs: ['test/supporting'] }, true)
  t.true(console.info.called)
  console.info.resetHistory()
  const res = await request(app.callback())
    .get('/200.html')
    .expect(200)
  t.true(console.info.called)
})

test.serial('silent', async t => {
  initApp({ silent: true, force: true, dirs: ['test/supporting'] }, true)
  t.true(console.info.called)
  console.info.resetHistory()
  const res = await request(app.callback())
    .get('/200.html')
    .expect(200)
  t.false(console.info.called)
})

test.serial('very silent', async t => {
  initApp({ silent: 'very', force: true, dirs: ['test/supporting'] }, true)
  t.false(console.info.called)
  const res = await request(app.callback())
    .get('/200.html')
    .expect(200)
  t.false(console.info.called)
})

// test('404s', async t => {
//   await request(app.callback())
//     .get('/404.html')
//     .expect(404)
//   t.pass()
// })
