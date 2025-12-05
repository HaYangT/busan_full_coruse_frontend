<template>
  <div class="main-layout">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KakaoMap from '@/components/kakaomap/Map.vue'; 
import MenuBar from '@/components/pages/MenuBar.vue';
import MenuPage from '@/components/pages/MenuPage.vue'; 
import ToggleButton from '@/components/pages/ToggleButton.vue'; 

const isMenuPageVisible = ref(false);

const handleToggleMenu = () => {
  isMenuPageVisible.value = !isMenuPageVisible.value;
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100vh;
}

.main-layout {
  display: flex;
  height: 100%;
  position: relative; 
  overflow: hidden;
}

.sidebar {
  width: 250px; 
  flex-shrink: 0;
  background-color: #333;
  color: white;
  overflow-y: auto; 
  z-index: 1001;
}

.content-area {
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.app-container {
  text-align: center;
}

.app-toggle-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 250px;
  z-index: 1000;

}
</style>