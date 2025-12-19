<template>
  <div class="detail-page-container">
    <ToggleButton :is-open="true" @click="$emit('toggle-all')" class="toggle-btn" />

    <button @click="$emit('close')" class="close-btn">
      <svg class="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <header class="detail-header">
      <div class="image-container">
        <img :src="imgUrl" class="custom-image" />
      </div>
    </header>
    <div class="sub-page">
      <SubMenuBar @add-to-list="addToMyTour" @write-review="openCreateReview" />
      <ReviewList v-show="isReviewListVisible" :item="item" ref="reviewListRef" />
      <CreateReview v-show="isReviewFormVisible" :item="item" @created="onReviewCreated" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import ToggleButton from "@/components/pages/menu/ToggleButton.vue";
import SubMenuBar from "@/components/pages/menu/SubMenuBar.vue";
import ReviewList from "../review/ReviewList.vue";
import CreateReview from "../review/CreateReview.vue";
import { useTravelPlanStore } from "@/stores/useTravelPlanStore";

const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["close", "toggle-all"]);

const travelPlanStore = useTravelPlanStore();

/* 이미지 */
const imgUrl = computed(() =>
  props.item.imageUrl
    ? props.item.imageUrl
    : "https://img.freepik.com/premium-vector/tick-mark-icon-symbol-vector-illustration_875240-2906.jpg"
);

const isReviewListVisible = ref(true);
const isReviewFormVisible = ref(false);

const reviewListRef = ref(null);

const openCreateReview = () => {
  isReviewListVisible.value = false;
  isReviewFormVisible.value = true;
};

const onReviewCreated = () => {
  isReviewFormVisible.value = false;
  isReviewListVisible.value = true;

  reviewListRef.value?.fetchReviews();
};

const addToMyTour = () => {
  travelPlanStore.addPlace(props.item);
};
</script>

<style scoped>
@import "/src/styles/DetailPage.css";
</style>
