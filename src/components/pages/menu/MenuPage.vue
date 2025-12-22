<template>
  <div class="menu-page-container">
    <ToggleButton v-if="!selectedItem" :is-open="isMenuPageVisible" @click="$emit('toggle-menu-page')" />

    <div class="menu-page-header">
      <h2>페이지 상세 정보</h2>
    </div>

    <div class="list-area">
      <ul v-if="places.length > 0" class="place-list">
        <li
          v-for="item in places"
          :key="item.id"
          @click="openDetail(item)"
          class="list-item"
          :class="{ active: selectedItem?.id === item.id }"
        >
          {{ item.name }}
        </li>
      </ul>

      <EmptyMessage v-else />
    </div>
    <div class="menu-page-footer"></div>
  </div>

  <Transition name="slide-fade">
    <DetailPage v-if="selectedItem" :item="selectedItem" @close="closeDetail" @toggle-all="$emit('toggle-menu-page')" @request-recommand="handleAiRecommand"/>
  </Transition>

  <Teleport to="body" v-if="isRecommending">
    <div class="recommand-loading-overlay">
      <div class="loading-box">
        <div class="spinner"></div>
        <p>AI가 맞춤 장소를 추천 중입니다...</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import DetailPage from "./DetailPage.vue";
import ToggleButton from "./ToggleButton.vue";
import EmptyMessage from "@/components/pages/menu/EmptyMessage.vue";
import api from "@/filter/filter";
const props = defineProps({
  isMenuPageVisible: Boolean,
  places: Array,
  centerInfo: Object,
  selectedItem: Object,
});
const emit = defineEmits(["toggle-menu-page", "close", "select-place", "update-places"]);

const isRecommending = ref(false);

const openDetail = (item) => {
  emit("select-place", item);
};

const closeDetail = () => {
  emit("select-place", null);
};

const handleAiRecommand = async (tagType) => {
  try {
    isRecommending.value = true;

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const baseUrl = import.meta.env.VITE_SERVER_URL;

    const params = {
      id: userInfo.id,
      x: props.centerInfo.lng,
      y: props.centerInfo.lat,
      dist: props.centerInfo.dist || 3,
    };

    const response = await api.get(`${baseUrl}/api/v1/recommendation/places`, { params });
    
    emit("update-places", response.data);
    alert("AI가 새로운 장소를 추천해드렸습니다!");
    
    emit("select-place", null);
  } catch (error) {
    console.error("추천 실패:", error);
  } finally {
    isRecommending.value = false; // 로딩 종료
  }
};
</script>

<style scoped>
@import "/src/styles/MenuPage.css";
</style>
