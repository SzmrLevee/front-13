import "@assets/style.css"
import { createApp }from 'vue'
import { createPinia } from 'pinia'
import App from "./App.vue"
import { router } from './router'
import { plugin as formkitPlugin, defaultConfig as formkitDefaultConfig } from '@formkit/vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(formkitPlugin, formkitDefaultConfig)
app.mount('#app-root')
