# rollup-plugin-dev

a development server for rollup

### why this plugin?

if you just want to serve a folder of assets, or need only a couple other features; you probably want [rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve)

compared to rollup-plugin-serve, this plugin:
- uses Koa to provide the server and implement features
  - while this means there are dependencies, it should also be trivial to add/modify to suit individual needs (see `extend` option below!)
- has additional features that may be useful
  - detailed logging of requests (see screenshot)
  - full proxy support
  - support for a basepath in the URL
  - will automatically turn itself off (with a notification) for your production builds

## install

```console
npm install --save-dev rollup-plugin-dev
```

```console
yarn add --dev rollup-plugin-dev
```

## use

```js
import dev from 'rollup-plugin-dev'

export default {
  plugins: [ dev() ]
}
```

## options

#### dirs

directories to serve static files from

example: `dev('dist')`<br>
example: `dev({ dirs: ['dist', 'lib'] })`<br>
default: `__dirname`<br>

_when no other options are needed for this plugin, a shortcut is available to specify one folder_

#### basePath

prefix all served files with a base path - e.g. serve from `/static` instead of `/`

example: `dev({ basePath: '/static' })`<br>
default: `/`

#### silent

will silence all access log messages, as well as the warning printed when rollup is started outside of watch mode

example: `dev({ silent: true })`<br>
default: `false`

#### proxy

proxy a path to an upstream service

example: `dev({ proxy: { '/v3/*': 'https://polyfill.io/' } })`<br>
example: `dev({ proxy: { '/v3/*': ['https://polyfill.io/', { https: true }] } })`<br>
default: `undefined`<br>

_the value for a proxy can be either a string, or an array specifying the two arguments for [koa-better-http-proxy](https://github.com/nsimmons/koa-better-http-proxy#usage)_

#### spa

serve a fallback page (for single-page apps)

example: `dev({ spa: true }) // will serve index.html`<br>
example: `dev({ spa: 'path/to/fallback.html' })`<br>
default: `false`

#### port

the port the server should listen on

example: `dev({ port: 3000 })`<br>
default: `8080`

#### host

the host the server should listen on

example: `dev({ host: '0.0.0.0' })`<br>
default: `localhost`

#### force

force the server to start, even if rollup isn't in watch mode

example: `dev({ force: true })`<br>
default: `false`

#### extend

enables full customization of the dev server

example: `dev({ extend(app, modules) { app.use(modules.router.get('/foo', myHandler)) } })`<br>
default: `undefined`

_`app` is the [Koa instance](https://koajs.com/#application) used for the server_

modules available:
- `router`: [koa-route](https://github.com/koajs/route#example)
- `proxy`: [koa-better-http-proxy](https://github.com/nsimmons/koa-better-http-proxy#usage)
- `send`: [koa-send](https://github.com/koajs/send#example)
- `serve`: [koa-static](https://github.com/koajs/static#example)
- `mount`: [koa-mount](https://github.com/koajs/mount#examples)
- `color`: [colorette](https://github.com/jorgebucaran/colorette#quickstart)
