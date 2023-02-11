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
]

export default routes
