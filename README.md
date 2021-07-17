# rollup-plugin-dev

a development server for rollup

![a screenshot of this plugin running](/.github/assets/screenshot.png?raw=true)

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

will silence all log messages, as well as the warning printed when rollup is started outside of watch mode

example: `dev({ silent: true })`<br>
default: `false`

#### proxy

proxy a path to an upstream service

example: `dev({ proxy: [{ from: '/api', to: 'http://localhost:9000/resources' }] })`<br>
example: `dev({ proxy: [{ from: '/api', to: 'http://localhost:9000/resources', opts: { preHandler: myPreHandler } }] })`<br>
default: `undefined`<br>

_`opts` can contain any valid options for [fastify-http-proxy](https://github.com/fastify/fastify-http-proxy)_

#### spa

serve a fallback page (for single-page apps)

example: `dev({ spa: true }) // will serve index.html`<br>
example: `dev({ spa: 'path/to/fallback.html' })`<br>
default: `false`

_if a path is provided, it must be inside of one of the directories being served_

#### port

the port the server should listen on

example: `dev({ port: 3000 })`<br>
default: `8080`

_the server will automatically listen on the first available port after 8080 if the specified/default port is taken_

#### host

the host the server should listen on

example: `dev({ host: '0.0.0.0' })`<br>
default: `localhost`

#### force

force the server to start, even if rollup isn't in watch mode

example: `dev({ force: true })`<br>
default: `false`

#### extend

enables full customization of the dev server, expects a [Fastify plugin](https://www.fastify.io/docs/latest/Plugins/)

example: `dev({ extend: fp(async (server) => server.register(myPlugin)) })`<br>
default: `undefined`
