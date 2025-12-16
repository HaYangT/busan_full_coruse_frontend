<template>
  <div class="review-page-container">
    <!-- 헤더 -->
    <div class="review-header">
      <h2>리뷰</h2>
      <button class="close-btn" @click="$emit('close')">닫기</button>
    </div>

    <!-- 리뷰 목록 -->
    <ReviewList
      ref="reviewListRef"
      :item="item"
      @edit="startEdit"
    />

    <!-- 리뷰 등록 -->
    <CreateReview
      :item="item"
      @created="refreshReviews"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import ReviewList from "@/components/pages/review/ReviewList.vue";
import CreateReview from "@/components/pages/review/CreateReview.vue";

const props = defineProps({
  item: { type: Object, required: true }
});

defineEmits(["close"]);

const reviewListRef = ref(null);
const editingReview = ref(null);

/* 수정 시작 */
const startEdit = (review) => {
  editingReview.value = review;
};

/* 리뷰 새로고침 */
const refreshReviews = () => {
  reviewListRef.value?.fetchReviews();
};

/* 수정 완료 */
const onUpdateSuccess = () => {
  editingReview.value = null;
  refreshReviews();
};
</script>

<style scoped>
@import "/src/styles/Review.css";
</style>
