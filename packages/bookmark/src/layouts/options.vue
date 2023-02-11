<script setup lang="ts">
import NNotify from '@is/app/modules/notify/components/NNotify.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../stores/global'

const store = useStore()
const route = useRoute()
const router = useRouter()

store.workspace.setWorkspaces()

const drawer = ref(true)

function checkWorkspace() {
    if (!store.workspace.currentId) {
        router.push('/workspaces')
    }
}

watch(() => route.path, checkWorkspace, { immediate: true })

watch(() => store.workspace.currentId, checkWorkspace, { immediate: true })
</script>
<template>
    <v-layout class="text-t-primary bg-b-primary">
        <v-layout-drawer v-model="drawer" class="border-r border-lines">
            <v-list-item to="/workspaces">
                {{ $t('workspace', 2) }}
            </v-list-item>

            <template v-if="store.workspace.currentId">
                <v-list-item to="/forms">
                    {{ $t('form', 2) }}
                </v-list-item>
            </template>
        </v-layout-drawer>

        <v-layout-content>
            <router-view />

            <n-notify />
        </v-layout-content>
    </v-layout>
</template>
