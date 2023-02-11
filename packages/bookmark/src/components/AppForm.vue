<script setup lang="ts">
import Form from '../entities/form'
import { useI18n } from '../plugins/i18n'
import { useStore } from '../stores/global'

const emit = defineEmits<{
    (event: 'submit', payload: Omit<Form, 'id'>): void
}>()

const store = useStore()
const tm = useI18n()

const payload = ref<Omit<Form, 'id'>>({
    name: '',
    collectionId: '',
    fields: [],
})

const types = [
    {
        label: tm.t('text'),
        value: 'text',
    },
    {
        label: tm.t('pageUrl'),
        value: 'page-url',
    },
    {
        label: tm.t('pageTitle'),
        value: 'page-title',
    },
]

const currentCollection = computed(() => {
    return store.collection.collections.find((c) => c.id === payload.value.collectionId)
})

function addField() {
    payload.value.fields.push({
        columnId: '',
        type: 'text',
    })
}

function removeField(index: number) {
    payload.value.fields.splice(index, 1)
}

function submit() {
    store.form.create(payload.value)

    emit('submit', payload.value)

    payload.value = {
        name: '',
        collectionId: '',
        fields: [],
    }
}
</script>
<template>
    <v-card color="b-secondary" width="500">
        <v-card-content>
            <v-form class="flex flex-wrap gap-y-4 w-full" @submit="submit">
                <v-input v-model="payload.name" label="Name" />

                <v-select
                    v-model="payload.collectionId"
                    :options="store.collection.collections"
                    :label="$t('collection')"
                    value-key="id"
                    label-key="name"
                    card:color="b-primary"
                    menu:offset-y
                />

                <template v-if="currentCollection">
                    <div
                        v-for="field in payload.fields"
                        :key="field.columnId"
                        class="w-full flex gap-x-4"
                    >
                        <v-select
                            v-model="field.columnId"
                            :options="currentCollection.columns"
                            :label="$t('column')"
                            value-key="id"
                            label-key="label"
                            card:color="b-primary"
                            menu:offset-y
                        />

                        <v-select
                            v-model="field.type"
                            :options="types"
                            :label="$t('value')"
                            value-key="value"
                            label-key="label"
                            card:color="b-primary"
                            menu:offset-y
                        />

                        <div class="pt-[28px]">
                            <v-btn size="sm" color="danger" class="h-full" @click="removeField">
                                <v-icon name="trash" />
                            </v-btn>
                        </div>
                    </div>

                    <v-btn size="sm" color="info" @click="addField">
                        {{ $t('addEntity', [$t('field').toLowerCase()]) }}
                    </v-btn>
                </template>

                <v-btn type="submit" class="w-full"> {{ $t('create') }} </v-btn>
            </v-form>
        </v-card-content>
    </v-card>
</template>
