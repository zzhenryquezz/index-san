import '@desktop/assets/tailwind.scss'
import '@desktop/assets/main.scss'

import { createApp } from 'vue'
import pinia from '@desktop/plugins/pinia'
import icon from '@desktop/plugins/icons'
import i18n from '@/plugins/i18n'

import Options from './pages/Options.vue'
const app = createApp(Options)

const plugins = [icon, i18n, pinia]

plugins.map((plugin) => plugin(app))

app.mount('#app')
