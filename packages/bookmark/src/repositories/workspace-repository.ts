import Workspace from '@is/core/entities/workspace'
import IWorkspaceRepository from '@is/core/repositories/workspace/workspace-repository'
import WorkspaceNotFound from '@is/core/exceptions/workspace-not-found'

import { get, set } from 'idb-keyval'

export default class WorkspaceRepository implements IWorkspaceRepository {
    public async list(): Promise<Workspace[]> {
        const workspaces = await get('workspaces')

        return workspaces || []
    }

    public async show(id: string): Promise<Workspace> {
        const workspaces = await this.list()

        const index = workspaces.findIndex((workspace) => workspace.id === id)

        if (index === -1) {
            throw new WorkspaceNotFound(id)
        }

        return workspaces[index]
    }

    public async save(workspaces: Workspace[]) {
        await set('workspaces', workspaces)
    }

    public async create(workspace: Workspace): Promise<Workspace> {
        const workspaces = await this.list()

        workspaces.push(workspace)

        await this.save(workspaces)

        return workspace
    }

    public update(id: string, data: Partial<Omit<Workspace, 'id'>>): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public async destroy(id: string): Promise<void> {
        const workspaces = await this.list()

        const index = workspaces.findIndex((workspace) => workspace.id === id)

        if (index !== -1) {
            workspaces.splice(index, 1)
        }

        await this.save(workspaces)
    }
}
