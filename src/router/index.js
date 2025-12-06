import LoginPage from '@/components/auth/LoginPage.vue'
import RegistPage from '@/components/auth/RegistPage.vue'
import ResetPassword from '@/components/auth/ResetPassword.vue'
import Review from '@/components/pages/Review.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
