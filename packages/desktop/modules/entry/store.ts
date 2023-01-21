import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useCase } from '@composables/use-case'
import { useStore as useWorkspace } from '@modules/workspace/store'
import { useStore as useCollection } from '@modules/collection/store'

import ListDirectoryEntryDTO from '@core/use-cases/list-directory-entry/list-directory.dto'
import ShowDirectoryEntryDTO from '@core/use-cases/show-directory-entry/show-directory-entry.dto'
import CreateDirectoryEntryDTO from '@core/use-cases/create-directory-entry/create-directory-entry.dto'
import UpdateDirectionEntryDTO from '@core/use-cases/update-directory-entry/update-directory-entry.dto'
import DeleteDirectoryEntryDTO from '@core/use-cases/delete-directory-entry/delete-directory-entry.dto'

import ReadDirectoryEntryDTO from '@core/use-cases/read-directory-entry/read-directory-entry.dto'
import WriteDirectoryEntryDTO from '@core/use-cases/write-directory-entry/write-directory-entry.dto'

export const useStore = defineStore('entry', () => {
    const workspace = useWorkspace()

    const stores = {
        collection: useCollection(),
    }

    const layout = ref({
        toolbar: true,
    })

    function list(payload: Partial<ListDirectoryEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('list-directory-entry', payload as any)
    }

    function show(payload: Partial<ShowDirectoryEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('show-directory-entry', payload as any)
    }

    function create(payload: Partial<CreateDirectoryEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('create-directory-entry', payload as any)
    }

    function update(payload: Partial<UpdateDirectionEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('update-directory-entry', payload as any)
    }

    function destroy(payload: Partial<DeleteDirectoryEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('delete-directory-entry', payload as any)
    }

    function read(payload: Partial<ReadDirectoryEntryDTO>, silent?: boolean) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('read-directory-entry', payload as any, silent)
    }

    function write(payload: Partial<WriteDirectoryEntryDTO>) {
        if (!payload.workspaceId && workspace.currentId) {
            payload.workspaceId = workspace.currentId
        }

        return useCase('write-directory-entry', payload as any)
    }

    return {
        collection: stores.collection,

        layout,

        list,
        show,
        create,
        update,
        destroy,
        read,
        write,
    }
})
