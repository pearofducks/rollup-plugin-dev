import dev from '../index'

export default {
  input: './foo.js',
  output: { file: './bar.js', format: 'esm' },
  plugins: [
    dev({
      host: '0.0.0.0',
      spa: true,
      proxy: [
        { from: '/llama', to: 'https://www.google.com' }
      ]
    })
  ]
}
