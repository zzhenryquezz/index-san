import ChronoObject from '../entities/ChronoObject'
import IDrive from '../gateways/IDrive'
import IHash from '../gateways/IHash'
import IObjectRepository from './IObjectRepository'

export default class ObjectRepositoryImpl implements IObjectRepository {
    constructor(
        private readonly drive: IDrive,
        private readonly hash: IHash
    ) {}

    public async save(chronoObject: ChronoObject) {
        const objectHash = await this.hash.hash(chronoObject.toBytes())

        const startHash = objectHash.slice(0, 2)
        const endHash = objectHash.slice(2)

        const folderPath = this.drive.resolve('.chrono', 'objects', startHash)
        const filePath = this.drive.resolve(folderPath, endHash)

        if (!(await this.drive.exists(folderPath))) {
            await this.drive.mkdir(folderPath)
        }

        await this.drive.write(filePath, chronoObject.toBytes())

        return {
            objectHash,
        }
    }

    public async find(objectHash: string) {
        const startHash = objectHash.slice(0, 2)
        const endHash = objectHash.slice(2)

        const folderPath = this.drive.resolve('.chrono', 'objects', startHash)
        const filePath = this.drive.resolve(folderPath, endHash)

        if (!(await this.drive.exists(filePath))) {
            return null
        }

        const bytes = await this.drive.read(filePath)

        if (!bytes) {
            return null
        }

        return ChronoObject.fromBytes(bytes)
    }
}