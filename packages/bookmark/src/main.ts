import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@is/app/assets/tailwind.scss'
import '@is/app/assets/main.scss'

import './css/main.css'

import coreApp from './config/app'

import router from './router'
import i18n from './plugins/i18n'
import icons from './plugins/icons'

import App from './App.vue'

const app = createApp(App)

app.provide('coreApp', coreApp)

app.use(router)
app.use(i18n)
app.use(icons)
app.use(createPinia())

app.mount('#app')
