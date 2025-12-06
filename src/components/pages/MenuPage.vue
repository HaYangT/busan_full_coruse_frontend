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
@import '/src/styles/MenuPage.css';
</style>