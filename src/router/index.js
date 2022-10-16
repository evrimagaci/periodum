import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../App.vue'

const routes = [
   {
      path: '/',
      name: 'home',
      // component: HomePage,
      component: () => import('../App.vue')
   },
   {
     path: '/kunye',
     name: 'kunye',
     component: () => import('../pages/credits-page.vue')
   },
   {
     path: '/hakkinda',
     name: 'hakkında',
     component: () => import('../pages/about-page.vue')
   }
]

const router = createRouter({
   history: createWebHistory(), //createWebHashHistory(),
   routes
})
export default router