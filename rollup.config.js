import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'default' },
    { file: pkg.module, format: 'esm' }
  ],
  external: [
    'path',
    'fs',
    'url',
    'colorette',
    'ms',
    'date-time',
    'fastify',
    'fastify-autoload',
    'fastify-http-proxy',
    'fastify-plugin',
    'fastify-static',
    'get-port',
    'joi',
  ]
}
