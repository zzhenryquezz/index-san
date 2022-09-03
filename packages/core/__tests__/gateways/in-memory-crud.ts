import path from 'path'
import Item from '../../entities/item'
import { Crud } from '../../gateways/crud-manager'
import { Drive } from '../../gateways/drive-manager'

interface Meta {
    id: string
    [key: string]: string
}

export default class InMemoryCrud implements Crud {
    public drive: Drive
    public metas: Meta[] = []

    public async list(collectionPath: string): Promise<Item[]> {
        const entries = await this.drive.list(collectionPath)

        const items = entries
            .filter(e => e.type === 'directory')
            .map(e => new Item({}, path.basename(e.path)))

        return items
    }

    public async findById(collectionPath: string, id: string): Promise<Item | null> {
        const all = await this.list(collectionPath)        

        const item = all.find(i => i.id === id)

        if (!item) return null

        const meta = this.metas.find(m => m.id === id)

        return {
            ...item,
            ...meta
        }
    }

    public async create(collectionPath: string, data: Item): Promise<Item> {
        await this.drive.create({
            name: [collectionPath, data.id].join('/'),
            path: [collectionPath, data.id].join('/'),
            type: 'directory'
        })

        this.metas.push(data)

        return data
    }
    
    public async updateById(collectionPath: string, itemId: string, data: any): Promise<void> {
        const item = await this.findById(collectionPath, itemId)   

        if (!item) return

        
        const metaIndex = this.metas.findIndex(m => m.id === itemId)
        
        if (metaIndex === -1) return

        this.metas[metaIndex] = Object.assign(item, data)
    }
}