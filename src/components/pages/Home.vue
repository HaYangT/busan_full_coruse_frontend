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
        <KakaoMap
          ref="mapRef"
          @update-center="handleCenterUpdate"
          @update-places="handlePlacesUpdate"
          @select-place="handleSelectPlaceFromMap"
          @refresh-map-query="refreshMap"
          :search-query="searchQuery"
          :search-dist="searchRadius"
          :search-tag-id="searchTagId"
        />
      </div>
    </div>

    <!-- 검색 영역 -->
    <div class="search-area" v-show="!isLoginPageVisible && !isRegistPageVisible && !isResetPasswordVisible">
      <!-- 검색 창 -->
      <input class="search-overlay" v-model="searchInput" @keydown.enter="handleSearch" placeholder="장소 검색" />

      <!-- 태그 버튼 영역 -->
      <div class="tag-scroll" ref="tagScrollRef">
        <button
          v-for="tag in tagList"
          :key="tag.id"
          class="tag-button"
          @click="handleTagClick(tag)"
          :class="{ active: selectedTagId === tag.id }"
        >
          {{ tag.label }}
        </button>
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
      :selected-item="selectedPlace"
      @toggle-menu-page="handleToggleMenu"
      @select-place="handleSelectPlace"
      @update-places="handlePlacesUpdate"
      @refresh-map-query="refreshMap"
    />
  </div>

  <TravelButton
    v-show="isLoggedIn && !isLoginPageVisible && !isRegistPageVisible && !isResetPasswordVisible"
    @click="toggleMyTravel"
  />

  <MyTravelPanel v-if="isMyTravelVisible" @close="isMyTravelVisible = false" />

  <!--거리 조절 바-->
  <div class="distance-control" v-show="!isLoginPageVisible && !isRegistPageVisible && !isResetPasswordVisible">
    <label for="radius">검색 반경: {{ sendRadius }}Km</label>
    <input type="range" id="radius" v-model.number="sendRadius" min="1" max="10" step="0.1" @change="handleRadius" />
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

    <RegistPage v-if="isRegistPageVisible" @close="isRegistPageVisible = false" @open-login="openLoginFromRegister" />

    <ResetPassword
      v-if="isResetPasswordVisible"
      @close="isResetPasswordVisible = false"
      @open-login="openLoginFromReset"
    />
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import KakaoMap from "@/components/kakaomap/Map.vue";
import MenuBar from "@/components/pages/menu/MenuBar.vue";
import MenuPage from "@/components/pages/menu/MenuPage.vue";
import ToggleButton from "@/components/pages/menu/ToggleButton.vue";

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
const selectedPlace = ref(null);

const searchInput = ref("");
const searchQuery = ref("");
const searchRadius = ref(1);
const sendRadius = ref(1);
const tagScrollRef = ref(null);
const selectedTagId = ref(0);
const searchTagId = ref(0);
const tagList = [
  { id: 1, label: "한식" },
  { id: 2, label: "일식" },
  { id: 3, label: "아시아음식" },
  { id: 4, label: "양식" },
  { id: 5, label: "중식" },
  { id: 6, label: "분식" },
  { id: 7, label: "카페" },
  { id: 8, label: "뷔페" },
  { id: 9, label: "기타" },
  { id: 12, label: "관광지" },
  { id: 14, label: "문화시설" },
  { id: 25, label: "여행코스" },
  { id: 28, label: "레포츠" },
  { id: 32, label: "숙박" },
  { id: 38, label: "쇼핑" },
];

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
  selectedPlace.value = place;
  if (!place) return;
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
  selectedTagId.value = null;
};

const handleSelectPlaceFromMap = (place) => {
  selectedPlace.value = place;
  isMenuPageVisible.value = true;
};

const handleSearch = () => {
  searchQuery.value = searchInput.value;
  isMenuPageVisible.value = true;
};

const handleRadius = () => {
  searchRadius.value = sendRadius.value;
};

const refreshMap = () => {
  mapRef.value?.reload();
};

const handleTagClick = (tag) => {
  selectedTagId.value = tag.id;
  searchTagId.value = null;
  nextTick(() => {
    searchTagId.value = tag.id;
  });
  isMenuPageVisible.value = true;
};

const onWheel = (e) => {
  e.preventDefault();
  tagScrollRef.value.scrollLeft += e.deltaY;
};

/* ========== 라우터 ========= */
const router = useRouter();
const goMyPage = () => {
  router.push("/mypage");
};

onMounted(() => {
  travelPlanStore.load();
});
onMounted(() => {
  const el = tagScrollRef.value;
  if (!el) return;
  el.addEventListener("wheel", onWheel, { passive: false });
});

onBeforeMount(() => {
  const el = tagScrollRef.value;
  if (!el) return;
  el.removeEventListener("wheel", onWheel);
});
</script>

<style>
@import "/src/styles/Home.css";
</style>
