import { faker } from '@faker-js/faker'
import { test, expect, describe, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

import type { VueWrapper, MountingOptions } from '@vue/test-utils'

import ViewTable from '@core/entities/view-table'
import Collection from '@core/entities/collection'
import ItemFactory from '@core/__tests__/factories/item'
import CollectionFactory from '@core/__tests__/factories/collections'
import ColumnFactory from '@core/__tests__/factories/column'
import { ViewTableFactory } from '@core/__tests__/factories/view'

import VResizeLine from '@components/v-resize-line.vue'
import VMenu from '@components/v-menu.vue'
import CTable from './CTable.vue'
import CActions from './CActions.vue'
import CcColumn from '@modules/collection-column/components/CcColumn.vue'

import { createComponentObject } from '@plugins/gc'
import { useStore } from '@store/global'
import { useItemStore } from '@modules/item/store'
import { useViewStore } from '@modules/view/store'
import IValue from '@modules/item/components/IValue.vue'

describe('CTable.vue', () => {
    let wrapper: VueWrapper<InstanceType<typeof CTable>>
    let globalStore: ReturnType<typeof useStore>

    function createComponent(options?: MountingOptions<InstanceType<typeof CTable>['$props']>) {
        wrapper = mount(CTable, {
            ...options,
            global: {
                components: createComponentObject(),
                stubs: {
                    IValue: true,
                    CcColumn: true,
                    CActions: true,
                },
            },
        })
    }

    function createCollection(data?: Partial<Collection>) {
        const collection = CollectionFactory.create(data)

        globalStore.collection.collections = [collection]

        return collection
    }

    function createView(collectionId: string, data?: Partial<ViewTable>) {
        const view = ViewTableFactory.create(data)

        const store = useViewStore(collectionId)

        store.views.push(view)

        return view
    }

    function findActions() {
        return wrapper.findComponent(CActions)
    }

    function findColumns() {
        return wrapper.findAllComponents(CcColumn)
    }

    function findColumnResizeLines() {
        return wrapper.findAllComponents(VResizeLine)
    }

    function findColumnsEmpty() {
        return wrapper.find('[data-test-id=no-columns]')
    }

    function findTableWrapper() {
        return wrapper.find('[data-test-id=table-wrapper]')
    }

    function findActionsBtn() {
        return wrapper.findAll('[data-test-id=actions-btn]')
    }

    function findActionMenu() {
        return wrapper.findComponent(VMenu)
    }

    function findValues() {
        return wrapper.findAllComponents(IValue)
    }

    beforeEach(() => {
        setActivePinia(createPinia())

        globalStore = useStore()

        wrapper?.unmount()
    })

    afterEach(() => {
        wrapper?.unmount()
    })

    test('should set component height and width', () => {
        createComponent({
            props: {
                collectionId: '1',
                height: 500,
                width: 1000,
            },
        })

        const style = wrapper.attributes('style')

        expect(style).toBe('width: 1000px; height: 500px;')
    })

    test('should show c-actions by default', () => {
        createComponent({
            props: {
                collectionId: '1',
            },
        })

        expect(findActions().exists()).toBe(true)
    })

    test('should hide c-actions when props hideActions is true', () => {
        createComponent({
            props: {
                collectionId: '1',
                hideActions: true,
            },
        })

        expect(findActions().exists()).toBe(false)
    })

    test('should table wrapper element have dynamic height if actions is showed', () => {
        createComponent({
            props: {
                collectionId: '1',
            },
        })

        const classes = findTableWrapper().attributes('class') || ''

        expect(classes.includes('h-[calc(100%_-_53px)]')).toBe(true)
    })

    test('should render a cc-column for each collection column', async () => {
        const collection = createCollection({
            columns: ColumnFactory.createMany(20),
        })

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        expect(findColumns().length).toBe(collection.columns.length)
    })

    test('should render empty message when collections columns are empty', async () => {
        const collection = createCollection({
            columns: [],
        })

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        expect(findColumnsEmpty().exists()).toBe(true)
    })

    test('should columns hidden in view not be visible', async () => {
        const collection = createCollection({
            columns: ColumnFactory.createMany(20),
        })

        const view = createView(collection.id, {
            columns: collection.columns.map((c, index) => ({
                id: c.id,
                hide: index > 10,
                width: 200,
            })),
        })

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
                viewId: view.id,
            },
        })

        const { length } = findColumns().filter((w) => w.isVisible())

        expect(length).toBe(view.columns.filter((c) => !c.hide).length)
    })

    test('should each column render a v-resize-line', async () => {
        const collection = createCollection({
            columns: ColumnFactory.createMany(20),
        })

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        expect(findColumnResizeLines().length).toBe(collection.columns.length)
    })

    test('should render a v-btn with "to" for each item', async () => {
        const collection = createCollection({
            columns: [ColumnFactory.create({ label: 'Name', field: 'name' })],
        })

        const items = ItemFactory.createMany(5, {
            name: faker.name.firstName(),
        })

        const store = useItemStore(collection.id)

        store.items = items

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        const buttons = findActionsBtn()

        expect(buttons.length).toBe(items.length)

        buttons.forEach((btn, index) => {
            const id = items[index].id

            expect(btn.attributes('to')).toBe(`/collections/${collection.id}/items/${id}`)
        })
    })

    test('should show menu when trigger right click in item v-btn action', async () => {
        const collection = createCollection({
            columns: [ColumnFactory.create({ label: 'Name', field: 'name' })],
        })

        const items = ItemFactory.createMany(5, {
            name: faker.name.firstName(),
        })

        const store = useItemStore(collection.id)

        store.items = items

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        const [btn] = findActionsBtn()

        await btn.trigger('contextmenu')

        const menu = findActionMenu()

        expect(menu.isVisible()).toBe(true)
    })

    test('should a i-value for each item and each column', async () => {
        const collection = createCollection({
            columns: ColumnFactory.createMany(),
        })

        const items = ItemFactory.createMany(5, {
            name: faker.name.firstName(),
        })

        const store = useItemStore(collection.id)

        store.items = items

        await globalStore.column.set(collection.id, true)

        createComponent({
            props: {
                collectionId: collection.id,
            },
        })

        expect(findValues().length).toBe(items.length * collection.columns.length)
    })
})