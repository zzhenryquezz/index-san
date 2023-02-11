import { Plugin } from 'vue'

import icon from '@is/app/plugins/icons'

const plugin: Plugin = {
    install(app) {
        icon(app)
    },
}

export default plugin
