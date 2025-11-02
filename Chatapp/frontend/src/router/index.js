import { createRouter, createWebHistory } from 'vue-router'
import Chatapp from '@/views/chatapp-with-socket-store.vue'
import test from '@/views/test.vue'
import login from '@/views/login.vue'
import regiser from '@/views/register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/chatapp" ,
      name : "chatapp",
      component : Chatapp,
    },
    {
      path: '/register',
      name: 'register',
      component: regiser
    },
    {
      path : "/" ,
      name : "login",
      component : login,
    },
        {
      path : "/test" ,
      name : "test",
      component : test,
    }
  ],
})

export default router
