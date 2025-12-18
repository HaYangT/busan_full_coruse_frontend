<template>
  <div class="review-page-container">
    <!-- 헤더 -->
    <div class="review-header">
      <h2>리뷰</h2>
      <button class="write-review-btn" @click="isReviewWriteVisible = true">
        리뷰 등록하기
      </button>
    </div>

    <!-- 리뷰 목록 -->
    <ReviewList
      ref="reviewListRef"
      :item="item"
      @edit="startEdit"
    />

    <!-- 리뷰 등록 -->
    <CreateReview
      v-show="isReviewWriteVisible"
      :item="item"
      @created="handleReviewCreated"
      @close="isReviewWriteVisible = false"
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
const isReviewWriteVisible = ref(false);
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

/* 리뷰 등록 완료 처리 */
const handleReviewCreated = () => {
  isReviewWriteVisible.value = false; // 폼 닫기
  refreshReviews();
};
</script>

<style scoped>
@import "/src/styles/Review.css";
</style>
