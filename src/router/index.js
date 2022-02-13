import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import WebPlayer from '@/views/WebPlayer.vue'
import Callback  from '@/components/Callback.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/webplayer',
      name: 'Web Player',
      component: WebPlayer
      //component: () => import('../views/AboutView.vue')
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
  ]
})

export default router
