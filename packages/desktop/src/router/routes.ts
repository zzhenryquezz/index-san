import { RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/workspaces',
    },
    // workspaces
    {
        path: '/workspaces',
        component: () => import('../pages/workspaces/list.vue')
    },
    {
        path: '/workspaces/:workspaceId',
        props: true,
        component: () => import('../pages/workspaces/single.vue'),
    },

    // directory-entries
    {
        path: '/workspaces/:workspaceId/entries',
        props: true,
        component: () => import('../pages/entry/list.vue'),
    },
    {
        path: '/workspaces/:workspaceId/entries/:entryId(.*)',
        props: true,
        component: () => import('../pages/entry/single.vue')
    },
    // collections
    {
        path: '/workspaces/:workspaceId/collections',
        props: true,
        component: () => import('../pages/collections/list.vue')
    },
    // items
    {
        path: '/workspaces/:workspaceId/collections/:collectionId/items',
        props: true,
        component: () => import('../pages/items/items.vue')
    },
    // settings
    {
        path: '/settings/menu',
        component: () => import('../pages/settings/menu.vue')
    },
    // 404 - keep this section in the end
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/404.vue')
    },
]

export default routes