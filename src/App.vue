<template>
  <div class="main-layout">
    <!-- 로그인 / 로그아웃 -->
    <button
      class="main-login-button"
      v-show="!isLoginPageVisible && !isRegistPageVisible && !isResetPasswordVisible && !isLoggedIn"
      @click="openLoginPage"
    >
      로그인
    </button>

    <button
      class="main-login-button"
      v-show="isLoggedIn"
      @click="handleLogout"
    >
      로그아웃
    </button>

    <button
      class="my-page-button"
      v-show="isLoggedIn"
      @click="isMyPageVisible = true"
    >
      내정보
    </button>

    <!-- 사이드바 -->
    <MenuBar class="sidebar" />

    <!-- 메인 콘텐츠 -->
    <div class="content-area">
      <div class="app-container">
        <h1>카카오맵 연동 테스트</h1>
        <KakaoMap
          @update-center="handleCenterUpdate"
          @update-places="handlePlacesUpdate"
        />
      </div>
    </div>

    <!-- 메뉴 토글 -->
    <ToggleButton
      v-if="!isMenuPageVisible"
      :is-open="false"
      class="app-toggle-button"
      @click="isMenuPageVisible = true"
    />

    <!-- 메뉴 페이지 -->
    <MenuPage
      v-if="isMenuPageVisible"
      :is-menu-page-visible="isMenuPageVisible"
      :places="currentPlaces"
      :center-info="centerInfo"
      @toggle-menu-page="handleToggleMenu"
    />
  </div>

  <!-- ===================== -->
  <!-- 모달 영역 -->
  <!-- ===================== -->

  <Teleport to="body">
    <LoginPage
      v-if="isLoginPageVisible"
      @close="closeLoginPage"
      @open-register="openRegisterPage"
      @open-resetpassword="openResetPasswordPage"
      @login-success="handleLoginSuccess"
    />

    <RegistPage
      v-if="isRegistPageVisible"
      @close="isRegistPageVisible = false"
      @open-login="openLoginFromRegister"
    />

    <ResetPassword
      v-if="isResetPasswordVisible"
      @close="isResetPasswordVisible = false"
      @open-login="openLoginFromReset"
    />

    <MyPage
      v-if="isMyPageVisible"
      @close="isMyPageVisible = false"
    />
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

import KakaoMap from '@/components/kakaomap/Map.vue';
import MenuBar from '@/components/pages/MenuBar.vue';
import MenuPage from '@/components/pages/MenuPage.vue';
import ToggleButton from '@/components/pages/ToggleButton.vue';

import LoginPage from '@/components/auth/LoginPage.vue';
import RegistPage from '@/components/auth/RegistPage.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';
import MyPage from '@/components/pages/MyPage.vue';

/* ================= 상태 ================= */

const isMenuPageVisible = ref(false);
const isLoginPageVisible = ref(false);
const isRegistPageVisible = ref(false);
const isResetPasswordVisible = ref(false);
const isMyPageVisible = ref(false);
const isLoggedIn = ref(false);

const currentPlaces = ref([]);
const centerInfo = ref({});

/* ================= 인증 ================= */

const openLoginPage = () => {
  isLoginPageVisible.value = true;
};

const closeLoginPage = () => {
  isLoginPageVisible.value = false;
};

const openRegisterPage = () => {
  isLoginPageVisible.value = false;
  isRegistPageVisible.value = true;
};

const openResetPasswordPage = () => {
  isLoginPageVisible.value = false;
  isResetPasswordVisible.value = true;
};

const openLoginFromRegister = () => {
  isRegistPageVisible.value = false;
  isLoginPageVisible.value = true;
};

const openLoginFromReset = () => {
  isResetPasswordVisible.value = false;
  isLoginPageVisible.value = true;
};

const handleLoginSuccess = () => {
  isLoginPageVisible.value = false;
  isLoggedIn.value = true;
};

if (localStorage.getItem('accessToken')) {
  isLoggedIn.value = true;
}

const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  isLoggedIn.value = false;
  location.reload();
};

/* ================= 지도 / 메뉴 ================= */

const handleToggleMenu = () => {
  isMenuPageVisible.value = !isMenuPageVisible.value;
};

const handlePlacesUpdate = (newPlaces) => {
  currentPlaces.value = newPlaces;
};

const handleCenterUpdate = (info) => {
  centerInfo.value = info;
};
</script>

<style>
@import '/src/styles/App.css';
</style>
