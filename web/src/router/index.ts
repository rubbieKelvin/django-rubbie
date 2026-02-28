import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { title: 'Dashboard' },
    },
    // Add more routes as features are built (data browser, API explorer, etc.)
  ],
})

export default router
