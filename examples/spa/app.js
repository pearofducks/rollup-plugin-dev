import { createApp, h } from 'https://unpkg.com/vue@3.1.5/dist/vue.runtime.esm-browser.prod.js'

const route = window.location.pathname

const App = {
  setup: () => () => h('h1', `Hello world. This path is ${route}`)
}

class VueApp extends HTMLElement {
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = `
      <div id="app"></div>
    `
    createApp(App).mount(this.shadow.getElementById('app'))
  }
}

if (!customElements.get('vue-app')) {
  customElements.define('vue-app', VueApp)
}
