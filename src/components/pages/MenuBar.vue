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

const handleLogin = () => {
  router.push('/login');
};

</script>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column; 
  height: 100%; 
  padding: 0;
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
  flex-grow: 1; 
  overflow-y: auto; 
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

</style>