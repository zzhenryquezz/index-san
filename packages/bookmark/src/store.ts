import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import debounce from 'lodash/debounce'

import Workspace from '@core/entities/workspace'

import app from './app'

export const useStore = defineStore('workspace', () => {
    const workspaces = ref<Workspace[]>([])

    const activeId = ref<string | null>('workspaces:currentId')

    const active = computed(() => workspaces.value.find((w) => w.id === activeId.value))

    async function saveActive() {
        await chrome.storage.local.set({ 'workspaces:currentId': activeId.value })
    }

    async function setActive() {
        const response = await chrome.storage.local.get('workspaces:currentId')

        activeId.value = response['workspaces:currentId'] ?? null
    }

    setActive()

    watch(activeId, debounce(saveActive, 1000))

    async function setWorkspaces() {
        await app
            .useCase('list-workspaces')
            .then(({ data }) => (workspaces.value = data))
            .catch(() => (workspaces.value = []))
    }

    async function create(data: Partial<Workspace>) {
        console.log('create')
        await app.useCase('create-workspace', data as any).then((r) => workspaces.value.push(r))
    }

    async function destroy(workspaceId: string) {
        await app.useCase('delete-workspace', { workspaceId })

        const index = workspaces.value.findIndex((w) => w.id === workspaceId)

        if (index !== -1) {
            workspaces.value.splice(index, 1)
        }
    }

    return {
        workspaces,
        activeId,
        active,

        setWorkspaces,
        create,
        destroy,
    }
})
