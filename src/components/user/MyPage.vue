<template>
  <div class="mypage-page">
    <h2 class="mypage-title">마이페이지</h2>

    <!-- 기본 정보 -->
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

    <hr />

    <!-- 메뉴 -->
    <MyPageMenu @select="currentMenu = $event" />

    
    <MyReviewList v-if="currentMenu === 'reviews'" />
    <!-- 나중에 -->
    <!-- <MyTravelPlan v-if="currentMenu === 'plans'" /> -->
  </div>
</template>

<script setup>
import MyPageMenu from '@/components/user/MyPageMenu.vue';
import MyReviewList from './MyReviewList.vue';
import { ref } from 'vue';

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

const userId = userInfo.userId || "";
const nickname = userInfo.nickname || "";
const email = userInfo.email || "";
const currentMenu = ref(null);

</script>

<style scoped>
@import "/src/styles/MyPage.css";
</style>
