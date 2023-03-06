import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import vClickOutside from 'click-outside-vue3'

const app = createApp(App)
app.use(store).mount('#app')
app.use(vClickOutside)
