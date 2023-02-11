import { defineStore } from 'pinia'

import DirectoryEntry from '@is/core/entities/directory-entry'
import { useCase } from '@is/app/composables/use-case'

import { useStore as useWorkspace } from './workspace'
import Form from '../entities/form'

const filename = '.is/bookmark.forms.json'

export const useStore = defineStore('form', () => {
    const workspace = useWorkspace()
    const forms = ref<Form[]>([])

    async function setForms() {
        if (!workspace.currentId) {
            forms.value = []
            return
        }

        const content = await useCase('read-directory-entry', {
            path: filename,
            workspaceId: workspace.currentId,
        })

        if (!content) return

        forms.value = JSON.parse(DirectoryEntry.decode(content))
    }

    async function save() {
        if (!workspace.currentId) return

        const content = JSON.stringify(forms.value, null, 4)

        await useCase('write-directory-entry', {
            path: filename,
            data: DirectoryEntry.encode(content),
            workspaceId: workspace.currentId,
        })
    }

    async function create(payload: Omit<Form, 'id'>) {
        const form = new Form(payload)

        forms.value.push(form)

        await save()

        return form
    }

    async function destroy(id: string) {
        const index = forms.value.findIndex((form) => form.id === id)

        if (index === -1) return

        forms.value.splice(index, 1)

        await save()
    }

    watch(() => workspace.currentId, setForms)

    return {
        forms,
        setForms,
        save,
        create,
        destroy,
    }
})
