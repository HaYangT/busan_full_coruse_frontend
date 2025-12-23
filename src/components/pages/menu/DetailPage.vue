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
        <img :src="imgUrl" :alt="item.name" class="custom-image" />
        <span v-if="item.tagType" class="tag-badge">{{ item.tagType }}</span>
      </div>
    </header>

    <main class="detail-info-area">
      <div class="title-row">
        <h1 class="place-title">{{ item.name }}</h1>
        <div class="rating-box">
          <span class="star">⭐</span>
          <span class="rating-value">{{ item.averageRating || "0.0" }}</span>
        </div>
      </div>

      <div class="info-list">
        <div class="info-item">
          <div class="icon-wrapper">📍</div>
          <div class="info-content">
            <span class="label">주소</span>
            <p class="text">{{ item.address || "정보 없음" }}</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-wrapper">📞</div>
          <div class="info-content">
            <span class="label">문의/안내</span>
            <p class="text">{{ item.tel || "정보 없음" }}</p>
          </div>
        </div>

        <div class="info-item">
          <div class="icon-wrapper">⏰</div>
          <div class="info-content">
            <span class="label">이용 시간</span>
            <p class="text">{{ item.openingHours || "정보 없음" }}</p>
          </div>
        </div>
      </div>
    </main>

    <div class="sub-page">
      <SubMenuBar @add-to-list="addToMyTour" @write-review="openCreateReview" @use-ai-recommand="useAiRecommand" />
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
const token = localStorage.getItem("accessToken");

const props = defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["close", "toggle-all", "request-recommand", "refresh-all"]);
const travelPlanStore = useTravelPlanStore();

// 이미지 처리 (기본 이미지 포함)
const imgUrl = computed(
  () =>
    props.item.imageUrl ||
    props.item.thumbnailUrl ||
    "https://img.freepik.com/premium-vector/tick-mark-icon-symbol-vector-illustration_875240-2906.jpg"
);

// 리뷰 관련 상태
const isReviewListVisible = ref(true);
const isReviewFormVisible = ref(false);
const reviewListRef = ref(null);

const openCreateReview = () => {
  if (!token) {
    alert("로그인이 필요합니다. 로그인 후 리뷰를 등록해주세요.");
    return;
  }
  isReviewListVisible.value = false;
  isReviewFormVisible.value = true;
};

const onReviewCreated = () => {
  isReviewFormVisible.value = false;
  isReviewListVisible.value = true;
  reviewListRef.value?.fetchReviews();
  emit("refresh-all");
};

const addToMyTour = () => {
  travelPlanStore.addPlace(props.item);
};

const useAiRecommand = () => {
  emit("request-recommand");
};
</script>

<style scoped>
@import "/src/styles/DetailPage.css";

.detail-info-area {
  padding: 20px;
  background-color: white;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.place-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.rating-box {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 12px;
}

.rating-value {
  font-weight: 600;
  margin-left: 4px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon-wrapper {
  font-size: 1.2rem;
  min-width: 24px;
}

.info-content .label {
  font-size: 0.85rem;
  color: #888;
  display: block;
}

.info-content .text {
  font-size: 0.95rem;
  margin: 2px 0 0 0;
  line-height: 1.4;
  color: #444;
}

.tag-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}
</style>
