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
import ToggleButton from './ToggleButton.vue'; // 임포트

defineProps({
  item: { type: Object, required: true }
});

defineEmits(['close', 'toggle-all']);
</script>

<style scoped>
.detail-page-container {
  position: fixed;
  top: 15px; 
  left: 665px;
  width: 350px;
  height: calc(100vh - 30px); 
  
  background: #ffffff;
 
  border-radius: 12px; 
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid #f0f0f0; 
  
  z-index: 1000;
  display: flex;
  flex-direction: column;

  overflow: visible; 
}

.detail-header {
  border-top-left-radius: 12px;

  border-top-right-radius: 12px; 

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  flex-shrink: 0;
}

.detail-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
  background-color: #fff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.close-btn {
  background: #f5f5f5; 
  border: none;
  color: #666;
  cursor: pointer;
  padding: 6px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: #e0e0e0;
  color: #000;
  transform: rotate(90deg); 
}

.info-box {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #42b983;
    font-size: 0.9em;
    color: #555;
    line-height: 1.6;
}
</style>