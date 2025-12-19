import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/pages/Home.vue";
import MyPage from "@/components/user/MyPage.vue";
import PasswordConfirm from "@/components/user/PasswordConfirm.vue";
import TravelDetailPage from "@/components/travel/TravelDetailPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/mypage",
      name: "MyPage",
      component: MyPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/reset-password-confirm",
      name: "PasswordConfirm",
      component: PasswordConfirm,
    },
    {
      path: "/travel/:id",
      name: "TravelDetail",
      component: TravelDetailPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return next("/login");
    }
  }
  next();
});

export default router;
