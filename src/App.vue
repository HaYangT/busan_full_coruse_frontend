<template>
  <div class="app-container">
    <h1>카카오맵 연동 테스트</h1>
    <KakaoMap />
  </div>
</template>

<script setup>
import KakaoMap from '@/components/kakaomap/Map.vue'; 
</script>

<style>
.app-container {
  text-align: center;
  padding: 20px;
}
</style>