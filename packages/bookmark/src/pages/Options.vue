<script lang="ts" setup>
import { useStore } from '@/store'
import { ref } from 'vue'

const store = useStore()

if (!store.workspaces.length) {
    store.setWorkspaces()
}

// table columns
const columns = [
    {
        name: 'active',
        width: 80,
        padding: {
            left: 40,
        },
    },
    {
        label: 'name',
        name: 'name',
        field: 'name',
    },
    {
        label: 'path',
        name: 'path',
        field: 'path',
    },
    {
        name: 'actions',
        field: 'actions',
        width: 100,
    },
]

// create new workspace
const dialog = ref(false)

const payload = ref<any>({
    name: '',
    path: '',
})

async function submit() {
    await store.create({
        id: payload.value.id,
        name: payload.value.name,
        driveName: 'fs',
        config: {
            path: payload.value.path,
        },
    })

    Object.keys(payload.value).forEach((key) => {
        payload.value[key] = ''
    })

    dialog.value = false
}
</script>
<template>
    <div class="h-screen w-screen flex items-center justify-center">
        <v-dialog v-model="dialog">
            <v-card color="b-secondary" width="500">
                <v-card-head class="px-4">
                    <v-card-title>
                        {{ $t('addEntity', [$t('workspace').toLocaleLowerCase()]) }}
                    </v-card-title>
                </v-card-head>
                <v-card-content>
                    <v-form class="mb-4 w-full" @submit="submit">
                        <div class="mb-4">
                            <v-input v-model="payload.name" label="Name" />
                        </div>

                        <div class="mb-4">
                            <v-input v-model="payload.path" label="Path" />
                        </div>

                        <v-btn
                            :disabled="!payload.name || !payload.path"
                            class="w-full"
                            type="submit"
                        >
                            {{ $t('create') }}
                        </v-btn>
                    </v-form>
                </v-card-content>
            </v-card>
        </v-dialog>

        <v-card width="500" height="500" class="border border-lines">
            <v-card-head padding>
                <v-card-title class="mr-auto">
                    {{ $t('listEntity', [$t('workspace', 2)]) }}
                </v-card-title>
                <v-btn size="sm" @click="dialog = true">
                    {{ $t('addEntity', [$t('workspace')]) }}
                </v-btn>
            </v-card-head>

            <v-table :columns="columns" :items="store.workspaces" item-key="id" :fixed="false">
                <template #item-active="{ item }">
                    <v-td class="pl-10">
                        <v-checkbox
                            :model-value="item.id === store.activeId"
                            @click="store.activeId = item.id"
                        />
                    </v-td>
                </template>

                <template #item-path="{ item }">
                    <v-td>
                        {{ item.config.path }}
                    </v-td>
                </template>

                <template #item-actions="{ item }">
                    <v-td class="flex gap-x-2 pr-10 justify-end">
                        <v-btn size="sm" color="b-secondary" @click="store.destroy(item.id)">
                            <fa-icon icon="trash" />
                        </v-btn>
                    </v-td>
                </template>
            </v-table>
        </v-card>
    </div>
</template>
