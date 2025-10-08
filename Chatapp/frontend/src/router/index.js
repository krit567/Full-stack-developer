import { createRouter, createWebHistory } from 'vue-router'
import Chatapp from '@/views/chatapp.vue'
import test from '@/views/test.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/chatapp" ,
      name : "chatapp",
      component : Chatapp,
    },
    {
      path : "/" ,
      name : "test",
      component : test,
    }
  ],
})

export default router
