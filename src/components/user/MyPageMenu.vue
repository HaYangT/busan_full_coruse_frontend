<template>
  <div class="menu-container">
    <button @click="$emit('select', 'reviews')">내가 쓴 리뷰</button>
    <button @click="$emit('select', 'plans')">나의 여행 계획</button>
  </div>
</template>

<script setup>
defineEmits(['select']);
</script>

<style scoped>
.menu-container {
  display: flex;
  gap: 12px;
}
</style>
