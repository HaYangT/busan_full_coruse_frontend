<template>
  <div class="review-list-container">
    <h3>리뷰 목록</h3>

    <!-- 로딩 -->
    <div v-if="isLoading" class="review-loading">
      리뷰 불러오는 중...
    </div>

    <!-- 빈 상태 -->
    <div v-else-if="reviews.length === 0" class="review-empty">
      아직 작성된 리뷰가 없습니다.
    </div>

    <!-- 리스트 -->
    <div v-else class="review-list">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review-block"
      >
        <!-- 리뷰 카드 -->
        <div class="review-item">
          <!-- 작성자 -->
          <div class="review-user">
            {{ review.nickname || "익명" }}
          </div>

          <!-- 별점 -->
          <div class="review-rating">
            <span
              v-for="n in 5"
              :key="n"
              :class="{ active: n <= review.rating }"
            >
              ★
            </span>
            <span class="rating-score">{{ review.rating }}</span>
          </div>

          <!-- 내용 -->
          <div class="review-content">
            {{ review.content }}
          </div>

          <!-- 이미지 (썸네일) -->
          <div
            v-if="review.pictures && review.pictures.length"
            class="review-images"
          >
            <img
              v-for="img in review.pictures"
              :key="img.id"
              :src="`${baseUrl}/upload/${img.picturePath}`"
              class="review-thumb"
              @click="openImage(img.picturePath)"
            />
          </div>

          <!-- 날짜 -->
          <div class="review-date">
            {{ formatDate(review.createdAt) }}
          </div>

          <!-- 내 리뷰만 -->
          <button
            v-if="isMyReview(review)"
            class="edit-btn"
            @click="toggleEdit(review.id)"
          >
            {{ editingReviewId === review.id ? "수정 취소" : "수정" }}
          </button>
        </div>

        <!-- 🔽 수정 폼 -->
        <UpdateReview
          v-if="editingReviewId === review.id"
          :review="review"
          @updated="onUpdated"
          @cancel="editingReviewId = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import UpdateReview from "@/components/pages/review/UpdateReview.vue";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const props = defineProps({
  item: { type: Object, required: true }
});

const reviews = ref([]);
const isLoading = ref(false);
const editingReviewId = ref(null);

/* 내 리뷰 판별 */
const isMyReview = (review) => {
  return userInfo && review.userId === userInfo.id;
};

/* 수정 토글 */
const toggleEdit = (id) => {
  editingReviewId.value = editingReviewId.value === id ? null : id;
};

/* 리뷰 조회 */
const fetchReviews = async () => {
  if (!props.item?.id) return;

  try {
    isLoading.value = true;
    const res = await axios.get(
      `${baseUrl}/api/v1/review/getReviewsByTarget`,
      {
        params: {
          targetId: props.item.id,
          targetType: props.item.tagType
        }
      }
    );
    reviews.value = res.data;
    console.log(reviews.value);
  } catch (e) {
    console.error("리뷰 조회 실패", e);
  } finally {
    isLoading.value = false;
  }
};

/* 수정 완료 */
const onUpdated = () => {
  editingReviewId.value = null;
  fetchReviews();
};

/* 날짜 포맷 */
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR");
};

/* 이미지 원본 보기 */
const openImage = (path) => {
  window.open(`${baseUrl}/upload/${path}`, "_blank");
};

/* 대상 변경 시 재조회 */
watch(
  () => props.item.id,
  fetchReviews,
  { immediate: true }
);

onMounted(fetchReviews);

defineExpose({ fetchReviews });
</script>

<style scoped>
.review-images {
  display: flex;
  gap: 8px;
  overflow-x: auto;
}

.review-thumb {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}
</style>
