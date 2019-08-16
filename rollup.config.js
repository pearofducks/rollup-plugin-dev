import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  external: [
    'path',
    'fs',
    'url',
    'koa',
    'koa-static',
    'koa-mount',
    'koa-send',
    'koa-route',
    'koa-better-http-proxy',
    'colorette',
    'ms',
    'date-time'
  ]
}
