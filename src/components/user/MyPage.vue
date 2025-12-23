<template>
  <div class="mypage-page">
    <div class="mypage-box">
      <h2 class="mypage-title">마이페이지</h2>
      <div class="user-info-section">
        <div class="info-row">
          <span class="label">아이디</span>
          <span class="value">{{ userId }}</span>
        </div>
        <div class="info-row">
          <span class="label">닉네임</span>
          <span class="value">{{ nickname }}</span>
        </div>
        <div class="info-row">
          <span class="label">이메일</span>
          <span class="value">{{ email }}</span>
        </div>
      </div>

      <div class="tab-menu">
        <button
          v-for="menu in menus"
          :key="menu.key"
          class="tab-item"
          :class="{ active: currentMenu === menu.key }"
          @click="currentMenu = menu.key"
        >
          {{ menu.name }}
        </button>
      </div>

      <div class="tab-content">
        <MyReviewList v-if="currentMenu === 'reviews'" />
        <GetMyTravelPage v-if="currentMenu === 'plans'" />
        <UpdateMyInfoPage v-if="currentMenu === 'update'" />
      </div>
    </div>
  </div>
  <button class="back-btn" @click="goBack">뒤로가기</button>
</template>

<script setup>
import { ref } from "vue";
import MyReviewList from "./MyReviewList.vue";
import GetMyTravelPage from "./GetMyTravelPage.vue";
import UpdateMyInfoPage from "./UpdateMyInfoPage.vue";
import { useRouter } from "vue-router";

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
const currentMenu = ref("reviews");
const userId = userInfo.userId || "";
const nickname = userInfo.nickname || "";
const email = userInfo.email || "";
const router = useRouter();
const menus = [
  { key: "reviews", name: "나의 리뷰" },
  { key: "plans", name: "여행 계획" },
  { key: "update", name: "정보 수정" },
];
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.mypage-page {
  min-height: 100vh;
  background: #f4f6f8;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 16px;
  position: relative;
}

.mypage-box {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.mypage-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  background-color: #f8f9fa;
  margin-bottom: 12px;
}

.label {
  font-size: 14px;
  color: #888;
  font-weight: 500;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.tab-menu {
  display: flex;
  border-bottom: 2px solid #eee;
  margin-top: 30px;
  margin-bottom: 20px;
}

.tab-item {
  flex: 1;
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-item:hover {
  color: #555;
}

.tab-item.active {
  color: #222;
  font-weight: 700;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #222;
}

.tab-content {
  min-height: 200px;
  animation: fadeIn 0.3s ease;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px 0;
}
.back-btn {
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: none;
  color: #4f9cf9;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
}
.back-btn:hover {
  color: #555;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
