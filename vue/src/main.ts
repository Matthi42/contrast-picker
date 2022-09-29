import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

try{
    Neutralino.init()
} catch(e) {
    console.error(e)
}

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
