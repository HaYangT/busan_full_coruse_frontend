<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <div class="mypage-container">
        <h2 class="mypage-title">마이페이지</h2>
        <button>회원 정보 수정</button>
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
        <div class = "my-page-menu-container">
          <MyPageMenu/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyPageMenu from './MyPageMenu.vue';

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

const userId = userInfo.userId || "";
const nickname = userInfo.nickname || "";
const email = userInfo.email || "";
</script>

<style scoped>
@import "/src/styles/MyPage.css";
</style>
