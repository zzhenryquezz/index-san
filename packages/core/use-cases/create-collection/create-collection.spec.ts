import { test } from '@japa/runner'

import InMemoryApp from '../../__tests__/app'
import CollectionFactory from '../../__tests__/factories/collections'
import WorkspaceFactory from '../../__tests__/factories/workspace-factory'
import CreateCollection from './create-collection'

test.group('create-collection (use-case)', (group) => {

    const app = new InMemoryApp()

    const useCase = new CreateCollection(app)

    group.tap(t => t.teardown(() => app.memoryDrive.clear()))

    test('should create a collection in workspace', async ({ expect }) => {
        const collection = CollectionFactory.create()

        const workspace = await app.workspaceRepository.create(WorkspaceFactory.create({
            drive: 'memory'
        }))

        await useCase.execute({
            workspaceId: workspace.id,
            data: collection
        })

        const content = app.memoryDrive.content.get('.is/collections.json')

        const json = content ? JSON.parse(content.toString()) : []

        expect(json.length).toEqual(1)
        
        expect(json[0].path).toEqual(collection.path)

    })

})