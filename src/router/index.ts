import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../Pages/MainContent.vue')
  },
  {
    path: '/:savedTitle',
    name: 'element',
    component: () => import('@/components/SItemsDetails.vue')
  },
  {
    path: '/:savedTitle/:item',
    name: 'elementic',
    component: () => import('@/components/SitemDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
