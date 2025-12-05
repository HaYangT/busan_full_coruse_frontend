<template>
  <div class="detail-page-container">
    <div class="detail-page-header">
      
        <h2>페이지 상세 정보</h2>
        <button @click="$emit('close')" class="close-button">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>
    <div class = "image-container">
    <img :src = "imgUrl" class="custom-image"></img>
    </div>
    <div class="detail-page-content">
      <p>여기는 `Detail.vue` 컴포넌트입니다.</p>
      <p>현재는 **임시 소형 페이지** 용도로 사용되며, 지도 정보나 추가적인 설정을 표시할 수 있습니다.</p>
      <p>이 컴포넌트는 `App.vue`에서 **조건부 렌더링**되고 있습니다.</p>
      <div class="p-4 bg-gray-100 rounded-lg mt-4">
        <p class="font-semibold">페이지 정보</p>
        <p class="text-sm">이 패널은 MenuBar(250px) 바로 오른쪽에 위치하며, 버튼은 이 패널의 오른쪽 끝에 고정됩니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imgUrl = ref("https://www.geoje.go.kr/upload_data/photodb/thumb/2025010621142591973.jpg");
defineEmits(['close']);
</script>

<style scoped>
.detail-page-container {
  position: fixed; 
  top: 0;
  left: 250px; /* MenuBar 너비 */
  width: 400px; /* 소형 페이지 너비 */
  height: 100vh; /* 전체 뷰포트 높이 */
  background: white;
  border-left: 1px solid #ccc; /* MenuBar와의 경계 */
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 999; /* ⭐️ z-index를 높여서 버튼 아래에 위치하도록 조정 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    background-color: #f7f7f7;
    flex-shrink: 0;
}

.detail-page-content {
  padding: 20px;
  overflow-y: auto; 
  flex-grow: 1;
}

.close-button {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-button:hover {
    background-color: #eee;
}
.image-container {
  width: 100%;
}

.custom-image {
  width: 100%;    
  height: 200px;  
  object-fit: cover; 
}

</style>