import dev from '../index'

export default {
  input: './foo.js',
  output: { file: './bar.js', format: 'esm' },
  plugins: [
    dev({
      host: '0.0.0.0',
      spa: true,
      proxy: [
        { from: '/llama', to: 'http://localhost:8000' }
      ]
    })
  ]
}
