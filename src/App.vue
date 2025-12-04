<template>
  <div class="main-layout">
    
    <MenuBar class="sidebar"></MenuBar>

    <div class="content-area">
      <div class="app-container">
        <h1>카카오맵 연동 테스트</h1>
        <KakaoMap />
      </div>
      </div>
  </div>
</template>

<script setup>
import KakaoMap from '@/components/kakaomap/Map.vue'; 
import MenuBar from './components/MenuBar.vue'; // 경로 수정 없이 사용
</script>

<style>
/* 💡 전체 레이아웃 스타일링 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* body와 html 높이를 100%로 설정해야 레이아웃이 화면 전체를 덮습니다. */
}

#app {
  height: 100vh; /* Vue 앱 전체 높이를 뷰포트 높이로 설정 */
}

.main-layout {
  display: flex; /* Flexbox 활성화 */
  height: 100%; /* 부모(body, html, #app)의 높이를 상속 받아야 합니다. */
}

/* --- 1. 사이드바 스타일 --- */
.sidebar {
  /* 메뉴바의 너비 고정 (예: 250px) */
  width: 250px; 
  flex-shrink: 0; /* 내용이 많아져도 이 영역의 너비가 줄어들지 않도록 설정 */
  
  /* 세로 고정을 위한 스타일 (MenuBar.vue 내부에서 적용할 수도 있지만, 여기서는 Layout 관점에서 처리) */
  background-color: #333; /* 메뉴바 배경색 */
  color: white;
  padding: 20px 0;
  overflow-y: auto; /* 메뉴가 길어지면 스크롤 가능하게 함 */
}

/* --- 2. 콘텐츠 영역 스타일 --- */
.content-area {
  flex-grow: 1; /* 남은 공간 전체를 차지하도록 설정 */
  padding: 20px;
  overflow-y: auto; /* 콘텐츠가 길어지면 스크롤 가능하게 함 */
}

.app-container {

  text-align: center;
}

</style>