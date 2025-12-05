<template>
  <div class="review-page-container">
    <div class="review-header">
      <h3>{{ item.name }} 리뷰</h3>
      <button @click="$emit('close')" class="close-btn">X</button>
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
.review-page-container {
  position: fixed;
  top: 0;
  left: 650px; 
  width: 350px; 
  height: 100vh;
  background: white;
  border-left: 1px solid #ccc;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 998; 
  display: flex;
  flex-direction: column;
}

.review-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
}

.review-content {
  padding: 20px;
  overflow-y: auto;
}

.close-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
}
</style>