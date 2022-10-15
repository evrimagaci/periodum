import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

createApp(App).use(router).mount('#app')