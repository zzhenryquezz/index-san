import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import get from 'lodash/get'

import Collection from '@core/entities/collection'

import { useStore as useWorkspace } from '@/modules/workspace/store'
import { useStore as useItem } from '@/modules/item/store'
import { useStore as useView } from '@/modules/view/store'
import { useStore as useColumn } from '@/modules/collection-column/store'
import { useCase } from '@/composables/use-case'

import UpdateCollectionsDTO from '@core/use-cases/update-collection/update-collection.dto'
import CreateCollectionDTO from '@core/use-cases/create-collection/create-collection.dto'
import DeleteCollectionsDTO from '@core/use-cases/delete-collection/delete-collection.dto'
import ShowCollectionsDTO from '@core/use-cases/show-collection/show-collection.dto'

export const useStore = defineStore('collections', () => {
    const collections = ref<Collection[]>([])

    const workspace = useWorkspace()
    const item = useItem()
    const view = useView()
    const column = useColumn()

    async function setCollections(workspaceId = workspace.currentId as string) {
        return await useCase('list-collections', {
            workspaceId,
        })
            .then((r) => (collections.value = r.data))
            .catch(() => (collections.value = [] as Collection[]))
    }

    function get(collectionId: string) {
        const collection = collections.value.find((c) => c.id === collectionId)

        if (collection) return collection

        return null
    }

    async function show(payload: Partial<ShowCollectionsDTO.Input>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('show-collection', payload as any)
    }

    async function create(payload: Partial<CreateCollectionDTO.Input>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        await useCase('create-collection', payload as any)

        await setCollections()
    }

    async function update(payload: Partial<UpdateCollectionsDTO.Input>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        await useCase('update-collection', payload as any)
    }

    async function destroy(payload: Partial<DeleteCollectionsDTO.Input>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        await useCase('delete-collection', payload as any)

        await setCollections()
    }

    watch(() => workspace.currentId, setCollections)

    return {
        workspace,
        item,
        view,
        column,

        collections,

        setCollections,
        get,
        show,
        create,
        update,
        destroy,
    }
})
