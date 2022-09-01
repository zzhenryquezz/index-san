import Workspace from '../../entities/workspace'
import DriveManager, { Drive } from '../../gateways/drive-manager'
import IWorkspaceRepository from '../../repositories/workspace-repository'
import CreateWorkspaceDTO from './create-workspace.dto'

export default class CreateWorkspace<T extends Record<string, Drive>> {
    constructor(
        private readonly repository: IWorkspaceRepository,
        private readonly drive: DriveManager<T>
    ){

    }
    
    public async execute(args: CreateWorkspaceDTO.Input){

        const validDrives = Object.keys(this.drive.listDrives())

        if (!validDrives.includes(args.drive)) {
            throw new Error('Invalid drive')
        }

        const workspace = new Workspace(args)

        await this.repository.create(workspace)

        return workspace
    }
}