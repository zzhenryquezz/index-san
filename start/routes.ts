import { ipcMain } from 'electron'
import { EventContext } from '../contracts/event-context'

class Router {
  public controllers = new Map()

  public findController(name: string) {
    if (this.controllers.has(name)) {
      return this.controllers.get(name)
    }

    const Module = require(`../app/controllers/${name}`).default

    this.controllers.set(name, new Module())

    return this.controllers.get(name)
  }

  public register(path: string, handler: string) {
    const [controllerName, method] = handler.split('.')

    const controller = this.findController(controllerName)

    ipcMain.removeHandler(path)

    ipcMain.handle(path, (_, args) => {
      if (!controller[method]) {
        console.error(`Handler ${handler} not found`)
        return
      }

      const context: EventContext = {
        data: args,
      }

      return controller[method](context)
    })
  }
}

export default async () => {
  const router = new Router()

  router.register('app:info', 'AppController.index')

  router.register('workspace:index', 'WorkspaceController.index')
  router.register('workspace:store', 'WorkspaceController.store')
  router.register('workspace:destroy', 'WorkspaceController.destroy')

  router.register('item:show', 'ItemsController.show')

  router.register('file:metadata', 'FilesController.metadata')
  router.register('file:list-folder', 'FilesController.listFolder')
  router.register('file:read', 'FilesController.read')
  router.register('file:write', 'FilesController.write')
}