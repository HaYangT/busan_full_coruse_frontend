<template>
  <div class="detail-page-container">
    
   <ToggleButton 
      :is-open="true" 
      @click="$emit('toggle-all')" 
    />

    <div class="detail-header">
      <h3>{{ item.name }} 상세 정보</h3>
      <button @click="$emit('close')" class="close-btn">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    
    <div class="detail-content">
       </div>
  </div>
</template>
<script setup>
import ToggleButton from './ToggleButton.vue'; 

defineProps({
  item: { type: Object, required: true }
});

defineEmits(['close', 'toggle-all']);
</script>

<style scoped>
@import '/src/styles/DetailPage.css';
</style>