<script setup lang="ts">
import { useStore } from '../stores/workspace'

import BrowserWorkspace from '../entities/browser-workspace'
import { useI18n } from '../plugins/i18n'

const store = useStore()
const tm = useI18n()

const columns = [
    {
        name: 'active',
        width: 80,
        padding: {
            left: 40,
        },
    },
    {
        label: tm.t('name'),
        name: 'name',
        field: 'name',
    },
    {
        label: tm.t('drive'),
        name: 'driveName',
        field: 'driveName',
    },
    {
        name: 'actions',
        field: 'actions',
        width: 50,
    },
]

// create

const dialog = ref(false)

const payload = ref<Omit<BrowserWorkspace, 'id'>>({
    name: '',
    driveName: 'browser',
    config: {
        directoryHandle: undefined,
    },
})

async function pickFolder() {
    const handle = await window.showDirectoryPicker()

    payload.value.config.directoryHandle = handle
}

async function submit() {
    if (!payload.value.config.directoryHandle) return

    const data = {
        name: payload.value.name,
        driveName: payload.value.driveName,
        config: {
            directoryHandle: payload.value.config.directoryHandle,
        },
    }

    await store
        .create(data)
        .catch((e) => {
            console.error(e)
        })
        .then(() => {
            dialog.value = false

            payload.value.name = ''
            payload.value.config.directoryHandle = undefined
        })
}
</script>

<template>
    <div class="h-full w-full flex justify-center items-center">
        <v-dialog v-model="dialog">
            <v-card color="b-secondary">
                <v-card-content>
                    <v-form class="flex flex-wrap gap-y-4 w-full" @submit="submit">
                        <v-input v-model="payload.name" :label="$t('name')" />

                        <v-input
                            v-model="payload.driveName"
                            :label="$t('drive')"
                            card:color="b-primary"
                            menu:offset-y
                            disabled
                        />

                        <v-input
                            :model-value="payload.config.directoryHandle?.name"
                            :label="$t('folder')"
                            disabled
                        >
                            <template #append>
                                <v-btn size="sm" color="b-primary" @click="pickFolder">
                                    {{ $t('browse') }}
                                </v-btn>
                            </template>
                        </v-input>

                        <v-btn
                            :disabled="!payload.name || !payload.config.directoryHandle"
                            class="w-full"
                            type="submit"
                        >
                            {{ $t('create') }}
                        </v-btn>
                    </v-form>
                </v-card-content>
            </v-card>
        </v-dialog>

        <v-card width="800" class="border-x border-t border-lines">
            <div class="w-full px-4 py-2 border-b border-lines flex items-center">
                <v-card-title> Workspace List </v-card-title>

                <v-btn class="ml-auto" size="sm" @click="dialog = true">
                    {{ $t('addEntity', [$t('workspace')]) }}
                </v-btn>
            </div>

            <v-table :columns="columns" :items="store.workspaces" :fixed="false">
                <template #item-active="{ item }">
                    <v-td class="pl-10" no-padding>
                        <v-checkbox
                            :model-value="item.id === store.currentId"
                            @click="store.setActive(item)"
                        />
                    </v-td>
                </template>

                <template #item-path="{ item }">
                    <v-td>
                        {{ item.config.path }}
                    </v-td>
                </template>

                <template #item-actions="{ item }">
                    <v-td class="flex pr-7 justify-end">
                        <!-- <v-btn size="sm" color="danger" mode="text" @click="editItem(item)">
                            <v-icon name="pen" />
                        </v-btn> -->

                        <v-btn size="sm" color="danger" mode="text" @click="store.destroy(item.id)">
                            <v-icon name="trash" />
                        </v-btn>
                    </v-td>
                </template>
            </v-table>
        </v-card>
    </div>
</template>
