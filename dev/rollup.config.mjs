import dev from '../index.js'

export default {
  input: './foo.js',
  output: { file: './bar.js', format: 'esm' },
  plugins: [
    dev({
      // host: '0.0.0.0',
      spa: true,
      silent: true,
      proxy: [
        { from: '/llama', to: 'http://localhost:8000' }
      ]
    })
  ]
}
