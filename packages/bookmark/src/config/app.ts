import CoreConfig from '@is/core/config/app'
import CoreApp from '@is/core/app'

import { ClientAppConfig } from '@is/app/config'

import BrowserDrive from '../gateways/drive'
import WorkspaceRepository from '../repositories/workspace-repository'
import DisabledEvaluation from '@is/core/gateways/evaluation/implementations/disabled-evaluation'
import FetchProvider from '../gateways/fetch'

const config = new CoreConfig({
    drives: {
        browser: new BrowserDrive(),
    },
    repositories: {
        workspace: new WorkspaceRepository(),
    },
    services: {
        evaluation: new DisabledEvaluation(),
        fetch: new FetchProvider(),
    },
})

const app = new CoreApp(config)

declare global {
    interface Window {
        clientConfig: ClientAppConfig
    }
}

window.clientConfig = {
    useCase: app.useCase.bind(app),
    open: {
        url: async (href: string) => {
            throw new Error('Not implemented')
        },
        directory: async () => {
            throw new Error('Not implemented')
        },
    },
}

export default app
