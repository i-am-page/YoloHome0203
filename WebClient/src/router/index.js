import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import Details from '../views/Details.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import StatisticsView from '../views/StatisticsView.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: UnauthorizedView
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: StatisticsView
        },
        {
            path: '/details',
            name: 'details',
            component: Details
        }
    ]
})

export default router