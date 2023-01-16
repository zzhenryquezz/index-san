import AppConfig from '@core/config/app'
import CoreApp from '@core/app'

import ChromeDrive from './drive'
import WorkspaceRepository from './workspace-repository'

import DefaultEvaluation from '@core/gateways/evaluation/implementations/default-evaluation'

const config = new AppConfig({
    drives: { fs: new ChromeDrive() },
    repositories: {
        workspace: new WorkspaceRepository(),
    },
    services: {
        evaluation: new DefaultEvaluation(),
    },
})

const coreApp = new CoreApp(config)

export default coreApp
