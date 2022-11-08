import { test } from '@japa/runner'

import DirectoryEntry from '../../entities/directory-entry'
import InMemoryApp from '../../__tests__/app'
import ShowDirectoryEntry from './show-directory-entry'


test.group('show-directory-entry (use-case', () => {
    const app =  new InMemoryApp()

    const useCase = new ShowDirectoryEntry(app)

    test('should show a directory-entry', async ({ expect }) => {
        const workspace = await app.workspaceRepository.createFake()

        await app.memoryDrive.write('test.txt', Buffer.from(''))

        const result = await useCase.execute({
            workspaceId: workspace.id,
            path: 'test.txt'
        })

        expect(result.data).toEqual(DirectoryEntry.file('test.txt'))
    })

    test('should throw an error if directory-entry not exist', async ({ expect }) => {
        const workspace = await app.workspaceRepository.createFake()

        expect.assertions(1)

        await useCase.execute({
            workspaceId: workspace.id,
            path: '22'
        }).catch(err => expect(err.message).toEqual('DirectoryEntry not found'))
    })
})