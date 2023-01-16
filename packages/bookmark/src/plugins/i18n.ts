import { App } from 'vue'

import en from '@desktop/i18n/en-US.json'

export default (app: App) => {
    app.config.globalProperties.$t = (key: string, args?: string[] | number) => {
        const pattern = (en as any)[key].split('|')
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
}
