import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/pages/Home.vue'
import Review from '@/components/pages/review/Review.vue'
import LoginPage from '@/components/user/LoginPage.vue'
import RegistPage from '@/components/user/RegistPage.vue'
import ResetPassword from '@/components/user/ResetPassword.vue'
import MyPage from '@/components/user/MyPage.vue'
import PasswordConfirm from '@/components/user/PasswordConfirm.vue'
import TravelDetailPage from '@/components/travel/TravelDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/pages/review/:id',
      name: 'Review',
      component: Review
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/regist',
      name: 'RegistPage',
      component: RegistPage
    },
    {
      path: '/resetpassword',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
      meta: { requiresAuth: true }
    },
    {
      path: '/reset-password-confirm',
      name: 'PasswordConfirm',
      component: PasswordConfirm
    },
    {
      path: '/travel/:id',
      name: 'TravelDetail',
      component: TravelDetailPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인이 필요합니다.')
      return next('/login')
    }
  }
  next()
})

export default router
