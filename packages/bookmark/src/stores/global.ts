import { defineStore } from 'pinia'
import { useStore as useWorkspace } from './workspace'
import { useStore as useCollection } from './collection'
import { useStore as useForm } from './form'

export const useStore = defineStore('global', () => {
    const workspace = useWorkspace()
    const collection = useCollection()
    const form = useForm()

    return {
        workspace,
        collection,
        form,
    }
})
