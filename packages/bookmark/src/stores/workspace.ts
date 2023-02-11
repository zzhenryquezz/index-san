import { defineStore } from 'pinia'

import BrowserWorkspace from '../entities/browser-workspace'

import { useCase } from '@is/app/composables/use-case'

import Workspace from '@is/core/entities/workspace'

export const useStore = defineStore('workspace', () => {
    const workspaces = ref<BrowserWorkspace[]>([])

    const currentId = ref<string | null>(null)

    async function setWorkspaces() {
        await useCase('list-workspaces')
            .then((response) => (workspaces.value = response.data))
            .catch(() => (workspaces.value = []))
    }

    async function setActive(workspace: BrowserWorkspace) {
        if (!workspace.config.directoryHandle) return

        let permission = await workspace.config.directoryHandle.queryPermission()

        if (permission !== 'granted') {
            await workspace.config.directoryHandle.requestPermission()
        }

        permission = await workspace.config.directoryHandle.queryPermission()

        if (permission !== 'granted') return

        currentId.value = workspace.id
    }

    async function create(payload: Omit<BrowserWorkspace, 'id'>) {
        await useCase('create-workspace', payload as Workspace, {
            serialize: false,
        })

        await setWorkspaces()
    }

    async function destroy(workspaceId: string) {
        await useCase('delete-workspace', {
            workspaceId,
        })

        await setWorkspaces()
    }

    return {
        workspaces,
        currentId,

        setWorkspaces,
        setActive,

        create,
        destroy,
    }
})
