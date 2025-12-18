<template>
  <div class="my-review-list">
    <h3>내가 쓴 리뷰</h3>

    <div v-if="loading">불러오는 중...</div>

    <div v-else-if="reviews.length === 0">
      작성한 리뷰가 없습니다.
    </div>

    <div v-else>
      <div
        v-for="review in reviews"
        :key="review.id"
        class="my-review-item"
      >
        <div class="rating">⭐ {{ review.rating }}</div>
        <div class="content">{{ review.content }}</div>
        <div class="date">{{ formatDate(review.createdAt) }}</div>

        <div class="btn-row">
          <button
            class="edit-btn"
            @click="editingReview = review"
          >
            수정
          </button>

          <button
            class="delete-btn"
            @click="deleteReview(review.id)"
          >
            삭제
          </button>
        </div>
      </div>
    </div>

    <div v-if="editingReview" class="modal-overlay">
      <div class="modal-box">
        <UpdateReview
          :review="editingReview"
          @updated="handleUpdated"
          @cancel="editingReview = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import UpdateReview from "@/components/pages/review/UpdateReview.vue"

const baseUrl = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("accessToken");

const reviews = ref([]);
const loading = ref(false);
const editingReview = ref(null);

const fetchMyReviews = async () => {
  try {
    loading.value = true;
    const res = await axios.get(
      `${baseUrl}/api/v1/review/getReviewByUserId`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    reviews.value = res.data;
  } catch (e) {
    console.error(e);
    alert("내 리뷰 조회 실패");
  } finally {
    loading.value = false;
  }
};

const deleteReview = async (id) => {
  if (!confirm("정말 삭제하시겠습니까?")) return;

  try {
    await axios.delete(
      `${baseUrl}/api/v1/review/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    reviews.value = reviews.value.filter(r => r.id !== id);
  } catch (e) {
    console.error(e);
    alert("리뷰 삭제 실패");
  }
};

const handleUpdated = async () => {
  editingReview.value = null;
  await fetchMyReviews();
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("ko-KR");
};

onMounted(fetchMyReviews);
</script>

<style scoped>
@import "/src/styles/GetMyReviewPage.css";

/* 모달용 스타일 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.btn-row {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.edit-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn {
  background: #e53935;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
