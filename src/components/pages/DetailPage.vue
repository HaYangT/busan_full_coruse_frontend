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
    
    <div class="submenu-bar">
      <SubMenuBar/>
    </div>    
    
    <div class="detail-content">
      <Review
        :item="item" 
        @close="handleReviewClose"
        @review-success="handleReviewSuccess"
      />
    </div>
  </div>
</template>

<script setup>
import ToggleButton from './ToggleButton.vue'; 
import SubMenuBar from './SubMenuBar.vue';
import Review from './Review.vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const emit = defineEmits(['close', 'toggle-all']);

const handleReviewClose = () => {
  console.log('리뷰 창 닫기 요청됨');
};

const handleReviewSuccess = () => {
  console.log('리뷰 등록 성공, 목록 갱신 등이 필요하면 여기서 처리');
};
</script>

<style scoped>
@import '/src/styles/DetailPage.css';
</style>