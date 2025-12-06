<template>
  <nav class="sidebar-nav"> 
    <div class="brand-header">
      <RouterLink to="/" class="brand-link">
        메뉴
      </RouterLink>
    </div>

    <ul class="menu-list">
      <li v-for="item in menuItems" :key="item.name" class="menu-item">
        <RouterLink :to="item.path" class="menu-link">
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router'; 

const router = useRouter();

const menuItems = reactive([
  { name: '홈', path: '/' },
]);


</script>

<style scoped>
@import '/src/styles/MenuBar.css'
</style>