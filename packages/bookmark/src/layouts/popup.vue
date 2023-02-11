<script setup lang="ts">
import { useStore } from '../stores/global'

const store = useStore()

if (!store.workspace.workspaces.length) {
    store.workspace.setWorkspaces()
}

async function setActive(name: string) {
    await window.showDirectoryPicker()
    // const workspace = store.workspace.workspaces.find((w) => w.name === name)

    // if (workspace) {
    //     await store.workspace.setActive(workspace)
    // }
}
</script>
<template>
    <v-card width="350" height="300">
        <v-card-head padding class="w">
            <v-select
                :model-value="store.workspace.current?.name"
                :placeholder="$t('selectEntity', [$t('workspace')])"
                :options="store.workspace.workspaces"
                value-key="name"
                label-key="name"
                menu:offset-y
                @update:model-value="setActive"
            />
        </v-card-head>
    </v-card>
</template>
