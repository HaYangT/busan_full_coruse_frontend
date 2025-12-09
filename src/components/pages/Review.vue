<template>
  <div class="review-page-container">
    <div class="review-header">
    </div>
    <div class="review-content">
      리뷰 페이지
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