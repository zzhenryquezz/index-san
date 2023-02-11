<script setup lang="ts">
import { useI18n } from '../plugins/i18n'
import { useStore } from '../stores/global'

import AppForm from '../components/AppForm.vue'

const store = useStore()
const tm = useI18n()

const columns = [
    {
        label: tm.t('name'),
        name: 'name',
        field: 'name',
    },
    { name: 'actions', width: 50 },
]

// create

const dialog = ref(false)
</script>
<template>
    <div class="h-full w-full flex items-center justify-center">
        <v-dialog v-model="dialog">
            <app-form @submit="dialog = false" />
        </v-dialog>

        <v-card width="800" class="border-x border-t border-lines">
            <div class="w-full px-4 py-2 border-b border-lines flex items-center">
                <v-card-title> {{ $t('listEntity', [$t('form')]) }} </v-card-title>

                <v-btn class="ml-auto" size="sm" @click="dialog = true">
                    {{ $t('addEntity', [$t('form')]) }}
                </v-btn>
            </div>

            <v-table :columns="columns" :items="store.form.forms">
                <template #item-actions="{ item }">
                    <v-td class="flex px-4 justify-end">
                        <!-- <v-btn size="sm" color="danger" mode="text" @click="editItem(item)">
                            <v-icon name="pen" />
                        </v-btn> -->

                        <v-btn
                            size="sm"
                            color="danger"
                            mode="text"
                            @click="store.form.destroy(item.id)"
                        >
                            <v-icon name="trash" />
                        </v-btn>
                    </v-td>
                </template>
            </v-table>
        </v-card>
    </div>
</template>
