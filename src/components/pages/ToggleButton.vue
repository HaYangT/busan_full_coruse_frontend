<template>
  <button @click="$emit('click')" class="toggle-button">
    <svg v-if="!isOpen" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
    <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, default: false }
});
defineEmits(['click']);
</script>

<style scoped>
.toggle-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -24px; /* 컨테이너 바깥 오른쪽에 붙음 */
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 60px;
  background-color: #fff;
  color: #444;
  border: 1px solid #ddd;
  border-left: none;
  cursor: pointer;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  z-index: 10;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: #42b983;
  color: white;
  width: 32px;
  right: -32px;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>