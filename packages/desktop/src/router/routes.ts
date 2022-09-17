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
        component: () => import('../pages/entry/folder.vue')
    },

    // directory-entries
    {
        path: '/workspaces/:workspaceId/entry-folder/:entryId(.*)',
        props: true,
        component: () => import('../pages/entry/folder.vue')
    },
    {
        path: '/workspaces/:workspaceId/entry/:entryId(.*)',
        props: true,
        component: () => import('../pages/entry/default.vue')
    },
    // 404 - keep this section in the end
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/404.vue')
    },
]

export default routes