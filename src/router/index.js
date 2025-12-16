import App from '@/App.vue'
import LoginPage from '@/components/user/LoginPage.vue'
import RegistPage from '@/components/user/RegistPage.vue'
import ResetPassword from '@/components/user/ResetPassword.vue'
import Review from '@/components/pages/review/Review.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: "/pages/review/:id",
    name: 'Review',
    component : Review
  },
  {
    path :"/login",
    name: 'LoginPage',
    component : LoginPage
  },
  {
    path:"/regist",
    name : 'RegistPage',
    component : RegistPage
  },
  {
    path : "/resetpassword",
    name: 'ResetPassword',
    component : ResetPassword
  }
],
})

export default router
