import dev from '#plugin'

export default {
  input: './app.js',
  output: { file: './dist/main.js', format: 'esm' },
  plugins: [
    dev('.')
  ],
  watch: {
    clearScreen: false
  }
}
