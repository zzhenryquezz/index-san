import ChronoStageItem from '../entities/ChronoStageItem'

export default interface IStageItemRepository {
    save(item: ChronoStageItem): Promise<void>
    findAll(): Promise<ChronoStageItem[]>
}