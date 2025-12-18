<template>
  <div class="menu-page-container">
    <ToggleButton v-if="!selectedItem" :is-open="isMenuPageVisible" @click="$emit('toggle-menu-page')" />

    <div class="menu-page-header">
      <h2>페이지 상세 정보</h2>
    </div>

    <div class="image-container">
      <img :src="imgUrl" class="custom-image" />
    </div>

    <div>
      <div class="list-scroll-wrapper" v-if="places.length > 0">
        <ul class="place-list">
          <li v-for="item in places" :key="item.id" @click="openDetail(item)" class="list-item"
            :class="{ active: selectedItem?.id === item.id }">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <EmptyMessage v-else />
    </div>

  </div>

  <Transition name="slide-fade">
    <DetailPage v-if="selectedItem" :item="selectedItem" @close="closeDetail" @toggle-all="$emit('toggle-menu-page')" />
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import DetailPage from './DetailPage.vue';
import ToggleButton from './ToggleButton.vue';
import EmptyMessage from '@/components/pages/menu/EmptyMessage.vue';
const imgUrl = ref("https://www.geoje.go.kr/upload_data/photodb/thumb/2025010621142591973.jpg");
const selectedItem = ref(null);



const openDetail = (item) => {
  selectedItem.value = item;
};

const closeDetail = () => {
  selectedItem.value = null;
};
const props = defineProps({
  isMenuPageVisible: { type: Boolean, default: false },
  places: {
    type: Array,
    default: () => [],
  },
  centerInfo: {
    type: Object,
    default: () => ({ lat: 0, lng: 0, dist: 1 }),
  }
});

defineEmits(['toggle-menu-page', 'close']);

</script>

<style scoped>
@import '/src/styles/MenuPage.css';
</style>