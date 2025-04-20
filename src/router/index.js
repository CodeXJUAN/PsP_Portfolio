import { createRouter, createWebHistory } from 'vue-router'
import PSPview from '@/views/PSPview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PSPview,
    },
  ],
})

export default router
