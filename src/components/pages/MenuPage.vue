<template>
  <div class="menu-page-container">
    
    <ToggleButton 
      v-if="!selectedItem" 
      :is-open="isMenuPageVisible" 
      @click="$emit('toggle-menu-page')" 
    />

    <div class="menu-page-header">
      <h2>페이지 상세 정보</h2>
      </div>
    
    <div class="image-container">
      <img :src="imgUrl" class="custom-image" />
    </div>

    <div>
      <SubMenuBar></SubMenuBar>
      <ul class="mock-list">
        <li 
          v-for="item in mockList" 
          :key="item.id" 
          @click="openDetail(item)"
          class="list-item"
          :class="{ active: selectedItem?.id === item.id }" 
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="menu-page-content">
      <p>현재는 **임시 소형 페이지** 용도로 사용됩니다.</p>
    </div>
  </div>

  <Transition name="slide-fade">
    <DetailPage 
      v-if="selectedItem" 
      :item="selectedItem" 
      @close="closeDetail"
      @toggle-all="$emit('toggle-menu-page')"
    />
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import SubMenuBar from './SubMenuBar.vue';
import DetailPage from './DetailPage.vue';
import ToggleButton from './ToggleButton.vue';
const imgUrl = ref("https://www.geoje.go.kr/upload_data/photodb/thumb/2025010621142591973.jpg");
const mockList = ref([
  { id: 1, name: "삼성해수욕장" },
  { id: 2, name: "바람의 언덕" },
  { id: 3, name: "거제 포로수용소 유적공원" },
  { id: 4, name: "해금강" },
]);


const selectedItem = ref(null);
const openDetail = (item) => {
  selectedItem.value = item; 
};

const closeDetail = () => {
  selectedItem.value = null; 
};

defineProps({
    isMenuPageVisible: { type: Boolean, default: false },
});
defineEmits(['toggle-menu-page', 'close']);
</script>

<style scoped>
/* MenuPage.vue 의 style 영역 */
.menu-page-container {
  position: fixed;
  top: 0;
  left: 250px;
  width: 400px;
  height: 100vh;
  background: white;
  border-left: 1px solid #ccc;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  
  /* [중요] 버튼이 밖으로 튀어나와 보여야 하므로 visible */
  overflow: visible; 
}
.menu-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  background-color: #f7f7f7;
  flex-shrink: 0;
}

.menu-page-content {
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

.mock-list {
  list-style: none;
  padding: 0 20px;
  margin-top: 10px;
}

.mock-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.list-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f0f0f0;
}

.list-item.active {
  background-color: #e6f7ff;
  font-weight: bold;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

</style>