<template>
  <nav class="sidebar-nav"> 
    <div class="brand-header">
      <RouterLink to="/" class="brand-link">
        🧭 Navigation
      </RouterLink>
    </div>

    <ul class="menu-list">
      <li v-for="item in menuItems" :key="item.name" class="menu-item">
        <RouterLink :to="item.path" class="menu-link">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>

    <!-- ⭐️ PageButton 컴포넌트 제거됨. 이제 App.vue에서 직접 관리합니다. -->
    
    <div class="action-footer">
      <button @click="handleLogin" class="action-button primary">로그인</button>
    </div>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router'; 
// ⭐️ PageButton 임포트 제거
// import PageButton from './PageButton.vue'; 

const router = useRouter();

const menuItems = reactive([
  { name: '홈', path: '/' },
  { name: '대시보드', path: '/dashboard' },
  { name: '지도 설정', path: '/settings' },
  { name: 'About', path: '/about' },
]);

const handleLogin = () => {
  // 실제 로그인 라우트로 이동
  router.push('/login');
};

// ⭐️ emit 정의 제거
// defineEmits(['toggle-detail']);
</script>

<style scoped>
/* 새롭게 추가된 내비게이션 스타일 */
.sidebar-nav {
  display: flex;
  flex-direction: column; 
  height: 100%; 
  padding: 0;
  /* MenuBar의 배경색은 App.vue에서 처리됨 (#333) */
}

.brand-header {
  padding: 20px;
  border-bottom: 1px solid #444;
}

.brand-link {
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; /* 남은 공간을 차지하여 하단 요소들을 밀어냅니다. */
  overflow-y: auto; /* 메뉴가 길어지면 스크롤 가능 */
}

.menu-item {
  margin: 0; 
}

.menu-link {
  display: block;
  text-decoration: none;
  color: #ccc;
  padding: 15px 20px; 
  transition: background-color 0.3s, color 0.3s;
  font-weight: 500;
  text-align: left;
}

.menu-link:hover {
  background-color: #444;
  color: white;
}

.menu-link.router-link-active,
.menu-link.router-link-exact-active {
  color: #42b883; 
  background-color: #2b2b2b; 
  border-left: 4px solid #42b883;
  padding-left: 16px; 
}

.action-footer {
  padding: 20px;
  border-top: 1px solid #444;
  /* position: sticky나 flex-shrink: 0 을 사용하여 Footer가 고정되도록 합니다. */
  flex-shrink: 0;
}
.action-button.primary {
  width: 100%;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* ⭐️ PageButton 관련 스타일 제거됨 */
</style>