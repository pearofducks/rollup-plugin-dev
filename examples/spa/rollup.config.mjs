import dev from '#plugin'

export default {
  input: './app.js',
  output: { file: './dist/main.js', format: 'esm' },
  plugins: [
    dev({
      host: '0.0.0.0',
      spa: true,
    })
  ],
  watch: {
    clearScreen: false
  }
}
