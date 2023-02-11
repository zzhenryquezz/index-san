<script setup lang="ts">
import NNotify from '@is/app/modules/notify/components/NNotify.vue'
import { useStore } from './stores/workspace'

const store = useStore()

store.setWorkspaces()
</script>
<template>
    <v-layout class="text-t-primary bg-b-primary">
        <v-layout-content>
            <router-view />

            <n-notify />
        </v-layout-content>
    </v-layout>
</template>
