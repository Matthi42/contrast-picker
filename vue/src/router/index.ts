import { createRouter, createWebHistory } from 'vue-router'

import View1 from '../views/view1.vue'
import View2 from '../views/view2.vue'

const router = createRouter({
    history: createWebHistory(),
    //base: '/',
    routes: [
        {
            path: '/',
            component: View1
        },
        {
            path: '/view2',
            component: View2
        },
    ]
})
export default router