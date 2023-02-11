import { Plugin } from 'vue'

import enUS from '@is/app/i18n/en-US'

const current = 'en-US'

const messages: Record<string, any> = {
    'en-US': enUS,
}

function translate(key: string, args?: number | string[]) {
    const locale = messages[current]

    if (!locale[key]) return key

    const pattern = locale[key].split('|')
    let message = pattern[0]

    if (typeof args === 'number' && args > 1) {
        message = pattern[1]
    }

    if (args && Array.isArray(args)) {
        args.forEach((arg, i) => {
            message = message.replace(`{${i}}`, arg)
        })
    }

    return message
}

export function useI18n() {
    return { t: translate }
}

const plugin: Plugin = {
    install(app) {
        app.config.globalProperties.$t = translate
    },
}

export default plugin
