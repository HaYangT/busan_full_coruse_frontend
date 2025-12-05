<template>
  <button @click="$emit('toggle-menu-page')" class="toggle-button">
    <svg v-if="!isMenuPageVisible" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    isMenuPageVisible: {
        type: Boolean,
        default: false
    }
});

defineEmits(['toggle-menu-page']);
</script>

<style scoped>
.toggle-button {

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px; 
  height: 80px; 
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-radius 0.3s, box-shadow 0.3s;
  

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.toggle-button:hover {
  background-color: #38a171;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.toggle-button svg {
    width: 20px;
    height: 20px;
}
</style>