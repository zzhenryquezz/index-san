import { defineStore } from 'pinia'

import { useCase } from '@is/app/composables/use-case'
import Collection from '@is/core/entities/collection'

import { useStore as useWorkspace } from './workspace'

export const useStore = defineStore('collection', () => {
    const collections = ref<Collection[]>([])
    const workspace = useWorkspace()

    async function setCollections() {
        if (!workspace.currentId) {
            collections.value = []
            return
        }

        await useCase('list-collections', { workspaceId: workspace.currentId })
            .then((response) => (collections.value = response.data))
            .catch(() => (collections.value = []))
    }

    watch(() => workspace.currentId, setCollections)

    return {
        collections,

        setCollections,
    }
})
