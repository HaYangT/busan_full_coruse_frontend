<template>
  <div class="main-layout">
    <MenuBar class="sidebar"></MenuBar>

    <div class="content-area">
      <div class="app-container">
        <h1>카카오맵 연동 테스트</h1>
        <KakaoMap />
      </div>
    </div>
    <PageButton 
      :is-detail-visible="isDetailVisible"
      @toggle-detail="isDetailVisible = !isDetailVisible" 
      :class="{ 
        'fixed-button': true, 
        'button-closed': !isDetailVisible, 
        'button-open': isDetailVisible 
      }"
    />

    <Detail v-if="isDetailVisible" @close="isDetailVisible = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import KakaoMap from '@/components/kakaomap/Map.vue'; 
import MenuBar from '@/components/pages/MenuBar.vue';
import Detail from '@/components/pages/Detail.vue'; 
import PageButton from '@/components/pages/PageButton.vue'; // ⭐️ PageButton 임포트
const isDetailVisible = ref(false);
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
}

.sidebar {
  width: 250px; 
  flex-shrink: 0;
  background-color: #333;
  color: white;
  overflow-y: auto; 
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.app-container {
  text-align: center;
}

.fixed-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999; 
  transition: left 0.3s ease-in-out;
}

.button-closed {
  left: 250px; 
}

.button-open {
  left: calc(250px + 400px); 
}
</style>