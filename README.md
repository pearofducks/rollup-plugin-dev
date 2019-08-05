# rollup-plugin-dev

a development server for rollup

##### goals & rationale

this plugin:
- uses Koa to provide the server and implement features
  - while this means there are dependencies, it should also be trivial to add/modify to suit individual needs (see `extend` option below!)
- has additional features other plugins lack
  - full proxy support
  - support for a basepath in the URL


## install

npm:

```console
npm install --save-dev rollup-plugin-dev
```

yarn:

```console
yarn add --dev rollup-plugin-dev
```

## use

```
import devServer from 'rollup-plugin-dev'

export default {
  plugins: [devServer()]
}
```

## options
