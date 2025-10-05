import { createRouter, createWebHistory } from 'vue-router'
import Chatapp from '@/views/chatapp.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/" ,
      name : "chatapp",
      component : Chatapp,
    }
  ],
})

export default router
