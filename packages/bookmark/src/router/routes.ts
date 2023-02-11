import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        // component: () => import('../pages/Home.vue'),
        redirect: '/workspaces',
    },
    {
        path: '/workspaces',
        component: () => import('../pages/WorkspaceList.vue'),
    },
    {
        path: '/forms',
        component: () => import('../pages/FormList.vue'),
    },
]

export default routes
