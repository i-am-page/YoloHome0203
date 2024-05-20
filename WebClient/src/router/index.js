import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
//import Dashboard from '../views/Dashboard.vue'
import UnauthorizedView from '../views/UnauthorizedView.vue'
//import NotFoundPage from '../views/NotFoundPage.vue'
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
        }
    ]
})

export default router