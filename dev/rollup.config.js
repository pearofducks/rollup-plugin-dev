import dev from '../index'

export default {
  input: './foo.js',
  output: { file: './bar.js', format: 'esm' },
  plugins: [
    dev({
      silent: true
    })
  ]
}
