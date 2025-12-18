<template>
  <div class="menu-page-container">
    <ToggleButton v-if="!selectedItem" :is-open="isMenuPageVisible" @click="$emit('toggle-menu-page')" />

    <div class="menu-page-header">
      <h2>페이지 상세 정보</h2>
    </div>

    <div class="image-container">
      <img :src="imgUrl" class="custom-image" />
    </div>

    <div class="list-area">
      <ul v-if="places.length > 0" class="place-list">
        <li v-for="item in places" :key="item.id" @click="openDetail(item);" class="list-item"
          :class="{ active: selectedItem?.id === item.id }">
          {{ item.name }}
        </li>
      </ul>

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
const imgUrl = ref("https://img.freepik.com/premium-vector/tick-mark-icon-symbol-vector-illustration_875240-2906.jpg");
const selectedItem = ref(null);
const emit = defineEmits(['toggle-menu-page', 'close', 'select-place']);


const openDetail = (item) => {
  selectedItem.value = item;
  emit('select-place', item);
  if (item.imageUrl) {
    imgUrl.value = item.imageUrl
  }
  else {
    imgUrl.value = "https://img.freepik.com/premium-vector/tick-mark-icon-symbol-vector-illustration_875240-2906.jpg"
  }
};

const closeDetail = () => {
  selectedItem.value = null;
  imgUrl.value = "https://img.freepik.com/premium-vector/tick-mark-icon-symbol-vector-illustration_875240-2906.jpg";
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

const selectPlace = (item) => {
  emit('select-place', item)
}

</script>

<style scoped>
@import '/src/styles/MenuPage.css';
</style>