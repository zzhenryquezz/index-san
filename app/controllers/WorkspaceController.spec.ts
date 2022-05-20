import { test } from '@japa/runner'
import { createWorkspaceFactory } from 'Tests/factories/workspace'
import { createTestApp } from 'Tests/fixtures/app'
import { createContext } from 'Tests/fixtures/context'
import WorkspaceController from './WorkspaceController'

test.group('WorkspaceController (unit)', (group) => {
  let controller: WorkspaceController
  let app: Awaited<ReturnType<typeof createTestApp>>

  const factory = createWorkspaceFactory()

  group.setup(async () => {
    app = await createTestApp()
    controller = new WorkspaceController(app)
  })

  group.each.setup(() => {
    return async () => await factory.cleanup()
  })

  test('should return a all workspaces', async ({ expect }) => {
    const workspaces = await factory.createMany(5)

    const data = await controller.index()

    expect(workspaces).toEqual(data)
  })

  test('should create a new workspace', async ({ expect }) => {
    const paths = ['path1', 'path2']

    app.electronStub.dialog.showOpenDialog.resolves({
      filePaths: paths,
    })

    await controller.store()

    const workspaces = await controller.index()

    expect(workspaces).toEqual([
      { name: 'path1', path: 'path1' },
      { name: 'path2', path: 'path2' },
    ])
  })

  test('should destroy a workspace', async ({ expect }) => {
    const workspace = await factory.create()

    await controller.destroy(createContext({ data: { path: workspace.name } }))

    const workspaces = await controller.index()

    expect(workspaces).toEqual([])
  })
})
