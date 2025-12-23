<template>
  <div class="review-list-container">
    <h3>리뷰 목록</h3>

    <div v-if="isLoading" class="review-loading">리뷰 불러오는 중...</div>

    <div v-else-if="reviews.length === 0" class="review-empty">아직 작성된 리뷰가 없습니다.</div>

    <div v-else class="review-list">
      <div v-for="review in reviews" :key="review.id" class="review-block">
        <div class="review-item">
          <div class="review-user">
            {{ review.nickname || "익명" }}
          </div>

          <div class="review-rating">
            <span v-for="n in 5" :key="n" :class="{ active: n <= review.rating }"> ★ </span>
          </div>

          <div class="review-content">
            {{ review.content }}
          </div>

          <div v-if="review.pictures && review.pictures.length" class="review-images">
            <img
              v-for="img in review.pictures"
              :key="img.id"
              :src="`${baseUrl}/upload/${img.picturePath}`"
              class="review-thumb"
              @click="openImage(img.picturePath)"
            />
          </div>

          <div class="review-date">
            {{ formatDate(review.createdAt) }}
          </div>
          <div v-if="isMyReview(review)" class="review-actions">
            <button class="edit-btn" @click="toggleEdit(review.id)">
              {{ editingReviewId === review.id ? "수정 취소" : "수정" }}
            </button>

            <button class="delete-btn" @click="deleteReview(review.id)">삭제</button>
          </div>
        </div>

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
import api from "@/filter/filter";
import { ref, watch, onMounted } from "vue";
import UpdateReview from "@/components/pages/review/UpdateReview.vue";
const token = localStorage.getItem("accessToken");
const baseUrl = import.meta.env.VITE_SERVER_URL;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const props = defineProps({
  item: { type: Object, required: true },
});

const reviews = ref([]);
const isLoading = ref(false);
const editingReviewId = ref(null);

const isMyReview = (review) => {
  return userInfo && review.userId === userInfo.id;
};

const toggleEdit = (id) => {
  editingReviewId.value = editingReviewId.value === id ? null : id;
};

const fetchReviews = async () => {
  if (!props.item?.id) return;

  try {
    isLoading.value = true;
    const res = await axios.get(`${baseUrl}/api/v1/review/getReviewsByTarget`, {
      params: {
        targetId: props.item.id,
        targetType: props.item.tagType,
      },
    });
    reviews.value = res.data;
    console.log(reviews.value);
  } catch (e) {
    console.error("리뷰 조회 실패", e);
  } finally {
    isLoading.value = false;
  }
};

const onUpdated = () => {
  editingReviewId.value = null;
  fetchReviews();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR");
};

const openImage = (path) => {
  window.open(`${baseUrl}/upload/${path}`, "_blank");
};

watch(() => props.item.id, fetchReviews, { immediate: true });

const deleteReview = async (reviewId) => {
  if (!confirm("리뷰를 삭제하시겠습니까?")) return;

  try {
    await api.delete(`${baseUrl}/api/v1/review/${reviewId}`, {});
    await fetchReviews();
    reviews.value = reviews.value.filter((r) => r.id !== reviewId);

    if (editingReviewId.value === reviewId) {
      editingReviewId.value = null;
    }

    alert("리뷰가 삭제되었습니다.");
  } catch (e) {
    console.error("리뷰 삭제 실패", e);
    alert("리뷰 삭제 실패");
  }
};

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

.review-actions {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.delete-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.delete-btn:hover {
  background: #d9363e;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
}

.review-rating span {
  font-size: 18px;
  color: #ddd;
}

.review-rating span.active {
  color: #ffb400;
}

.rating-score {
  margin-left: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}
</style>
