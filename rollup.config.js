import pkg from './package.json'

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs', exports: 'default' },
    { file: pkg.module, format: 'esm' }
  ],
  external : ['path', ...Object.keys(pkg.dependencies)]
}
