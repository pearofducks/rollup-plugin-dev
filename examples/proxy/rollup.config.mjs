import dev from '#plugin'
import Fastify from 'fastify'

export default {
  input: './app.js',
  output: { file: './dist/main.js', format: 'esm' },
  plugins: [
    dev({
      proxy: [
        { from: '/api/start', to: 'http://localhost:9000/beginning' },
        { from: '/api/finish', to: 'http://localhost:9000/ending' },
        { from: '/api', to: 'http://localhost:9000/' },
      ]
    })
  ],
  watch: {
    clearScreen: false
  }
}

const apiServer = Fastify()
apiServer.get('/beginning', (_, reply) => reply.send({ some: 'a', api: 'b', data: 'c' }))
apiServer.get('/ending', (_, reply) => reply.send({ other: 1, info: 2, here: 3 }))
apiServer.get('/', (_, reply) => reply.send({ foo: 'bar', baz: 'biz' }))
await apiServer.listen(9000)
