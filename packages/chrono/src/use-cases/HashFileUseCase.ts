import ChronoObject from '../entities/ChronoObject'
import BaseException from '../exceptions/BaseException'
import IDrive from '../gateways/IDrive'
import IBlobRepository from '../repositories/IBlobRepository'
import IObjectRepository from '../repositories/IObjectRepository'

interface Params {
    path: string
}

export default class HashFileUseCase {
    constructor(
        private readonly drive: IDrive,
        private readonly objectRepository: IObjectRepository,
        private readonly blobRepository: IBlobRepository
    ) {}

    public async execute({ path }: Params) {
        if (!(await this.drive.exists(path))) {
            throw new BaseException('File not found')
        }

        const content = await this.drive.read(path)

        if (!content) {
            throw new BaseException('File can not be read')
        }

        const { blobHash } = await this.blobRepository.save(content)

        const blobObject = new ChronoObject({
            type: 'blob',
            blobHash,
        })

        const { objectHash } = await this.objectRepository.save(blobObject)

        return {
            objectHash,
            blobHash,
        }
    }
}