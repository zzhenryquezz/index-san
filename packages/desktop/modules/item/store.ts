import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useStore as useWorkspace } from '@/modules/workspace/store'
import { useStore as useCollection } from '@/modules/collection/store'
import { useStore as useColumn } from '@/modules/collection-column/store'
import { useStore as useEntry } from '@/modules/entry/store'

import ListItemsDTO from '@core/use-cases/list-items/list-items.dto'
import Item from '@core/entities/item'

import { useCase } from '@/composables/use-case'
interface StoreItems {
    collectionId: string
    loading: boolean
    items: Item[]
}

export const useStore = defineStore('item', () => {
    const stores = {
        workspace: useWorkspace(),
        column: useColumn(),
        entry: useEntry(),
        collection: useCollection(),
    }

    const items = ref<StoreItems[]>([])

    async function setItems(collectionId: string, forceUpdate = false) {
        let storeItem = items.value.find((i) => i.collectionId === collectionId)

        if (!storeItem) {
            storeItem = {
                loading: false,
                collectionId,
                items: [],
            }

            items.value.push(storeItem)
        }

        if (!forceUpdate && storeItem.items.length) return

        storeItem.loading = true

        const raw: Item[] = await useCase('list-items', {
            collectionId,
            workspaceId: stores.workspace.currentId!,
        })
            .then((r) => r.data)
            .catch(() => [])

        storeItem.items = raw

        items.value = items.value.slice()

        setTimeout(() => {
            storeItem!.loading = false
            items.value = items.value.slice()
        }, 800)
    }

    /** @deprecated */
    function getItems(collectionId: string): Item[] {
        const storeItem = items.value.find((i) => i.collectionId === collectionId)

        return storeItem?.items || []
    }

    function all(collectionId: string): Item[] {
        const storeItem = items.value.find((i) => i.collectionId === collectionId)

        return storeItem?.items || []
    }

    function get(collectionId: string, itemId: string) {
        const storeItem = items.value.find((i) => i.collectionId === collectionId)

        if (!storeItem) return null

        const item = storeItem.items.find((i) => i.id === itemId)

        if (item) return item

        return null
    }

    function getStoreItem(collectionId: string) {
        return items.value.find((i) => i.collectionId === collectionId)
    }

    async function list(payload: Partial<ListItemsDTO.Input>) {
        payload.workspaceId = stores.workspace.currentId!

        return useCase('list-items', payload as any)
    }

    async function create(collectionId: string, payload: Item) {
        const storeItem = items.value.find((i) => i.collectionId === collectionId)

        if (storeItem) {
            storeItem.items.push(payload)
        }

        await useCase('create-item', {
            collectionId,
            workspaceId: stores.workspace.currentId!,
            data: payload,
        }).catch(() => {
            if (storeItem) {
                storeItem.items.pop()
            }
        })
    }

    async function update(collectionId: string, id: string, payload: Partial<Item>) {
        await useCase('update-item', {
            collectionId,
            workspaceId: stores.workspace.currentId!,
            itemId: id,
            data: payload,
        })
    }

    async function destroy(collectionId: string, itemId: string) {
        const storeItem = items.value.find((i) => i.collectionId === collectionId)

        if (!storeItem) return

        const index = storeItem.items.findIndex((i) => i.id === itemId)
        const item = storeItem.items.find((i) => i.id === itemId)

        if (index === -1 || !item) return

        storeItem.items.splice(index, 1)

        await useCase('delete-item', {
            collectionId,
            workspaceId: stores.workspace.currentId!,
            itemId,
        }).catch(() => storeItem.items.push(item))
    }

    return {
        get,
        all,
        getItems,
        getStoreItem,
        setItems,

        list,

        create,
        update,
        destroy,
    }
})
