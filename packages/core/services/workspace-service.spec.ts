import { test } from '@japa/runner'
import DirectoryEntry from '../entities/directory-entry'
import CrudManager from '../gateways/crud-manager'
import DriveManager from '../gateways/drive-manager'
import WorkspaceFactory from '../__tests__/factories/workspace-factory'
import InMemoryCrud from '../__tests__/gateways/in-memory-crud'
import InMemoryDrive from '../__tests__/gateways/in-memory-drive'
import InMemoryWorkspaceRepository from '../__tests__/repositories/in-memory-workspace-repository'
import AppService from './app-service'
import WorkspaceService from './workspace-service'

test.group('workspace-service (service)', (group) => {
    const memoryDrive = new InMemoryDrive()
    const memoryCrud = new InMemoryCrud()
    const driveManager = new DriveManager({ memory: memoryDrive })    
    const crudManger = new CrudManager({ memory: memoryCrud  })
    const workspaceRepository = new InMemoryWorkspaceRepository()

    const workspace = workspaceRepository.createSync(WorkspaceFactory.create({
        drive: 'memory'
    }))

    group.teardown(() => workspaceRepository.clear())

    const appService = new AppService({
        workspaceRepository,
        driveManager,
        crudManger
    })

    test('should throw an error if a workspace not exists', async ({ expect }) => {
        expect.assertions(1)

        await WorkspaceService.from(appService, 'invalid')
            .catch(err => expect(err.message).toEqual('Workspace not found'))
    })
    
    test('should return a workspace', async ({ expect }) => {
        const service = await WorkspaceService.from(appService, workspace.id)

        expect(service).toBeDefined()

        expect(service.id).toBe(workspace.id)
        expect(service.config).toBe(workspace.config)
    })

    test('should list workspace entries in the path', async ({ expect }) => {
        const service = await WorkspaceService.from(appService, workspace.id)

        memoryDrive.createFile('/items/01.txt', '')
        memoryDrive.createFile('/items/02.txt', '')
        memoryDrive.createFile('/items/03.txt', '')

        const result = await service.list('/items')

        expect(result.length).toBe(3)
    })
    
    test('should get workspace entry', async ({ expect }) => {
        const service = await WorkspaceService.from(appService, workspace.id)

        memoryDrive.createFile('/items/01.txt', '')

        const result = await service.get('/items/01.txt')

        expect(result).toEqual(DirectoryEntry.file('/items/01.txt'))
    })

    test('should write file from workspace',async ({ expect }) => {
        const service = await WorkspaceService.from(appService, workspace.id)

        await service.write('item.txt', 'Hello word')

        const content = await memoryDrive.read('item.txt')

        expect(content?.toString()).toBe('Hello word')
    })
    
    test('should read file from workspace',async ({ expect }) => {
        const service = await WorkspaceService.from(appService, workspace.id)

        memoryDrive.createFile('item.txt', 'Test content')

        const content = await service.read('item.txt')

        expect(content?.toString()).toBe('Test content')
    })

  
})