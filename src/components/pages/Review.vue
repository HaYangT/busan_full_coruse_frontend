<template>
  <div class="review-page-container">
    <div class="review-header">
    </div>
    <div class="review-content">
      <p>여기서 리뷰를 작성하거나 확인하세요.</p>
      <p>선택된 장소 ID: {{ item.id }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object
});
defineEmits(['close']);
</script>

<style scoped>
@import '/src/styles//Review.css';
</style>