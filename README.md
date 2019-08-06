# rollup-plugin-dev

a development server for rollup

### rationale

this plugin:
- uses Koa to provide the server and implement features
  - while this means there are dependencies, it should also be trivial to add/modify to suit individual needs (see `extend` option below!)
- has additional features other plugins lack
  - full proxy support
  - support for a basepath in the URL

## install

```console
npm install --save-dev rollup-plugin-dev
```

```console
yarn add --dev rollup-plugin-dev
```

## use

```
import dev from 'rollup-plugin-dev'

export default {
  plugins: [dev()]
}
```

## options

#### dirs

directories to serve static files from

example: `dev('dist')`
example: `dev({ dirs: ['dist', 'lib'] })`
default: `__dirname`
notes: when no other options are needed for this plugin, a shortcut is available to specify one folder

#### basePath

prefix all served files with a base path - e.g. serve from `/static` instead of `/`

example: `dev({ basePath: '/static' })`
default: `/`

#### silent

will silence all access log messages, as well as the warning printed when rollup is started outside of watch mode

example: `dev({ silent: true })`
default: `false`

#### proxy

proxy a path to an upstream service

example: `dev({ proxy: { '/v3/*': 'https://polyfill.io/' } })`
example: `dev({ proxy: { '/v3/*': ['https://polyfill.io/', { https: true }] } })`
default: `undefined`
notes: the value for a proxy can be either a string, or an array specifying the two arguments for [koa-better-http-proxy](https://github.com/nsimmons/koa-better-http-proxy#usage)

#### spa

serve a fallback page (for single-page apps)

example: `dev({ spa: true })`
example: `dev({ spa: 'path/to/fallback.html' })`
default: `false`

#### port

the port the server should listen on

example: `dev({ port: 3000 })`
default: `8080`

#### host

the host the server should listen on

example: `dev({ host: '0.0.0.0' })`
default: `localhost`

#### force

force the server to start, even if rollup isn't in watch mode

example: `dev({ force: true })`
default: `false`

#### extend

enables full customization of the dev server

example: `dev({ extend(app, modules) { app.use(modules.router.get('/foo', myHandler)) } })`
default: `undefined`

modules available:
- `router`: koa-route
- `proxy`: koa-better-http-proxy
- `send`: koa-send
- `serve`: koa-static
- `mount`: koa-mount
- `color`: colorette
