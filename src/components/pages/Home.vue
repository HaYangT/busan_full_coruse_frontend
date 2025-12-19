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

    <button class="main-login-button" v-show="isLoggedIn" @click="handleLogout">로그아웃</button>

    <button class="my-page-button" v-show="isLoggedIn" @click="goMyPage">내정보</button>

    <!-- 사이드바 -->
    <MenuBar class="sidebar" />

    <!-- 메인 콘텐츠 -->
    <div class="content-area">
      <div class="app-container">
        <SearchBar class="search-overlay" />
        <KakaoMap ref="mapRef" @update-center="handleCenterUpdate" @update-places="handlePlacesUpdate" />
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
      @select-place="handleSelectPlace"
    />
  </div>

  <TravelButton
    v-show="isLoggedIn && !isLoginPageVisible && !isRegistPageVisible && !isResetPasswordVisible"
    @click="toggleMyTravel"
  />

  <MyTravelPanel v-if="isMyTravelVisible" @close="isMyTravelVisible = false" />

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

    <RegistPage v-if="isRegistPageVisible" @close="isRegistPageVisible = false" @open-login="openLoginFromRegister" />

    <ResetPassword
      v-if="isResetPasswordVisible"
      @close="isResetPasswordVisible = false"
      @open-login="openLoginFromReset"
    />
  </Teleport>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import KakaoMap from "@/components/kakaomap/Map.vue";
import MenuBar from "@/components/pages/menu/MenuBar.vue";
import MenuPage from "@/components/pages/menu/MenuPage.vue";
import ToggleButton from "@/components/pages/menu/ToggleButton.vue";
import SearchBar from "./menu/SearchBar.vue";

import LoginPage from "@/components/user/LoginPage.vue";
import RegistPage from "@/components/user/RegistPage.vue";
import ResetPassword from "@/components/user/ResetPassword.vue";

import { useTravelPlanStore } from "@/stores/useTravelPlanStore";
import TravelButton from "../travel/TravelButton.vue";
import MyTravelPanel from "../travel/MyTravelPanel.vue";

/* ================= 상태 ================= */

const isMenuPageVisible = ref(false);
const isLoginPageVisible = ref(false);
const isRegistPageVisible = ref(false);
const isResetPasswordVisible = ref(false);
const isLoggedIn = ref(false);
const isMyTravelVisible = ref(false);

const currentPlaces = ref([]);
const centerInfo = ref({});
const mapRef = ref(null);

const travelPlanStore = useTravelPlanStore();
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
  location.reload();
};

if (localStorage.getItem("accessToken")) {
  isLoggedIn.value = true;
}

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
  isLoggedIn.value = false;
  location.reload();
};

const handleSelectPlace = (place) => {
  mapRef.value?.panTo(place.y, place.x);
};

const toggleMyTravel = () => {
  isMyTravelVisible.value = !isMyTravelVisible.value;
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

/* ========== 라우터 ========= */
const router = useRouter();
const goMyPage = () => {
  router.push("/mypage");
};

onMounted(() => {
  travelPlanStore.load();
});
</script>

<style>
@import "/src/styles/Home.css";
</style>
