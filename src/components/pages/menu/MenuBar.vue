<template>
  <nav class="sidebar-nav">
    <!-- 모바일용 닫기 버튼 -->
    <button class="mobile-close-btn" @click="handleClose">
      <span>&times;</span>
    </button>

    <div class="brand-header">
      <RouterLink to="/" class="brand-link" @click="handleClose">
        메뉴
      </RouterLink>
    </div>

    <ul class="menu-list">
      <li v-for="item in menuItems" :key="item.name" class="menu-item">
        <RouterLink :to="item.path" class="menu-link" @click="handleClose">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const emit = defineEmits(['close-sidebar']);

const menuItems = reactive([
  { name: '홈', path: '/' },
]);

const handleClose = () => {
  emit('close-sidebar');
};
</script>

<style scoped>
@import '/src/styles/MenuBar.css'
</style>