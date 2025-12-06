<template>
  <div class="main-layout">
    <button
     class ="main-login-button"
      @click = "isLoginPageVisible = true"
      v-show="!isLoginPageVisible"
      >
      로그인
    </button> 

    <MenuBar class="sidebar"></MenuBar>

    <div class="content-area">
      <div class="app-container">
        <h1>카카오맵 연동 테스트</h1>
        <KakaoMap />
      </div>
    </div>

    <ToggleButton 
      v-if="!isMenuPageVisible"
      :is-open="false" 
      @click="isMenuPageVisible = true"
      class="app-toggle-button"
    />

    <MenuPage 
      v-if="isMenuPageVisible" 
      :is-menu-page-visible="isMenuPageVisible"
      @toggle-menu-page="handleToggleMenu"
    />
    <LoginPage
   v-if="isLoginPageVisible"
    @close="isLoginPageVisible = false"
    @open-register="
    isLoginPageVisible = false;
    isRegistPageVisible = true;
  "
/>

    <RegistPage
    v-if = "isRegistPageVisible"
    @close = "isRegistPageVisible = false"
    @open-login = "
      isRegistPageVisible = false;
      isLoginPageVisible = true;
    "
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KakaoMap from '@/components/kakaomap/Map.vue'; 
import MenuBar from '@/components/pages/MenuBar.vue';
import MenuPage from '@/components/pages/MenuPage.vue'; 
import ToggleButton from '@/components/pages/ToggleButton.vue'; 
import LoginPage from './components/auth/LoginPage.vue';
import RegistPage from './components/auth/RegistPage.vue';

const isMenuPageVisible = ref(false);
const isLoginPageVisible  = ref(false);
const isRegistPageVisible = ref(false);
const handleToggleMenu = () => {
  isMenuPageVisible.value = !isMenuPageVisible.value;
};
</script>

<style>
@import '/src/styles/App.css';
</style>