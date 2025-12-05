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

  }
],
})

export default router
