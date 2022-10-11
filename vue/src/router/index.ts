import { createRouter, createWebHistory } from 'vue-router'

import ColorConfiguration from '../views/colorConfiguration.vue'
import ColorOverview from '../views/colorOverview.vue'
import CTest from '../views/cTest.vue'
import Start from '../views/start.vue'
import UserLogin from '../views/userLogin.vue'

const router = createRouter({
    history: createWebHistory(),
    //base: '/',
    routes: [
        {
            path: '/',
            component: Start,
            name: 'start'
        },
        {
            path: '/login',
            component: UserLogin,
            name: 'login'
        },
        {
            path: '/color-overviw/:userID',
            component: ColorOverview,
            name: 'colorOverview'
        },
        {
            path: '/color-Configuration/:userID/:colorVariantID',
            component: ColorConfiguration,
            name: 'colorConfiguration'
        },
        {
            path: '/test/:userID/:colorVariantID',
            component: CTest,
            name: 'test'
        },
    ]
})
export default router