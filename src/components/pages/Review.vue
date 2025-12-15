<template>
  <div class="review-page-container">
    <div class="review-header">
      <h2>리뷰 작성</h2>
      <button v-if="false" class="close-btn" @click="$emit('close')">닫기</button>
    </div>

    <div class="review-content-area">
      <div class="review-list-container">
        <h3>리뷰 목록</h3>

        <div v-if="isLoading" class="review-loading">
          리뷰 불러오는 중...
        </div>

        <div v-else-if="reviews.length === 0" class="review-empty">
          아직 작성된 리뷰가 없습니다.
        </div>

        <div v-else class="review-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <!-- 작성자 -->
            <div class="review-user">
              {{ review.nickname || "익명" }}
            </div>

            <!-- 별점 -->
            <div class="review-rating">
              <span v-for="n in 5" :key="n" :class="{ active: n <= review.rating }">
                ★
              </span>
              <span class="rating-score">{{ review.rating }}</span>
            </div>

            <!-- 내용 -->
            <div class="review-content">
              {{ review.content }}
            </div>

            <!-- 이미지 -->
            <div v-if="review.pictures && review.pictures.length" class="review-images">
              <img v-for="img in review.pictures" :key="img.id" :src="`${baseUrl}/upload/${img.picturePath}`"
                class="review-image" />
            </div>

            <!-- 날짜 -->
            <div class="review-date">
              {{ formatDate(review.createdAt) }}
            </div>
          </div>
        </div>
      </div>



      <form class="review-form" @submit.prevent="onSubmitReview">

        <div class="item-info">
          <strong>{{ item?.name }} 리뷰 작성</strong>
        </div>
        <div class="user-info">작성자 : {{ userInfo?.nickname || '알 수 없음' }}</div>
        <div class="rating-container">
          <label class="rating-label">별점</label>
          <div class="stars">
            <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= rating }" @click="rating = star">
              ★
            </span>
          </div>
          <span class="rating-score">{{ rating }}점</span>
        </div>

        <div class="image-upload-container">
          <label class="upload-btn-label">
            📷 사진 추가하기
            <input type="file" multiple accept="image/*" @change="handleFileChange" class="hidden-input" />
          </label>

          <div v-if="previewImages.length > 0" class="preview-list">
            <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
              <img :src="image.url" alt="review-img" />
              <button type="button" class="remove-img-btn" @click="removeImage(index)">×</button>
            </div>
          </div>
        </div>

        <textarea v-model="content" placeholder="솔직한 리뷰 내용을 입력해주세요." class="review-textarea" required></textarea>

        <button type="submit" class="submit-button">리뷰 등록 완료</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onUnmounted, watch, onMounted } from "vue";
const baseUrl = import.meta.env.VITE_SERVER_URL;
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
watch(() => props.item?.id, (newId) => {
  if (newId) {
    fetchReviews();
  }
});
const emit = defineEmits(['close', 'review-success']);
const userInfo = JSON.parse(localStorage.getItem("userInfo"));


const rating = ref(5);
const content = ref("");
const selectedFiles = ref([]);
const previewImages = ref([]);
const reviews = ref([]);
const isLoading = ref(false);

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
    console.error("리뷰 불러오기 실패", e);
  } finally {
    isLoading.value = false;
  }
};


const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  selectedFiles.value = [...selectedFiles.value, ...files];
  const newPreviews = files.map(file => ({
    url: URL.createObjectURL(file),
    file: file
  }));
  previewImages.value = [...previewImages.value, ...newPreviews];
  event.target.value = '';
};

const removeImage = (index) => {
  URL.revokeObjectURL(previewImages.value[index].url);
  previewImages.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
};

onUnmounted(() => {
  previewImages.value.forEach(img => URL.revokeObjectURL(img.url));
});
const token = localStorage.getItem("accessToken");

const onSubmitReview = async () => {
  if (!props.item || !props.item.id) {
    alert("리뷰 대상 정보가 없습니다.");
    return;
  }

  try {
    const url = `${baseUrl}/api/v1/review`;
    const formData = new FormData();
    formData.append("rating", rating.value);
    formData.append("content", content.value);
    formData.append("targetType", props.item.tagType || "PLACE");
    formData.append("targetId", props.item.id);

    selectedFiles.value.forEach((file) => {
      formData.append("images", file);
    });

    console.log(`[전송] TargetId: ${props.item.id}, Type: ${props.item.tagType}`);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log("성공:", response.data);
    alert("리뷰가 등록되었습니다!");

    content.value = "";
    rating.value = 5;
    selectedFiles.value = [];
    previewImages.value = [];

    emit("review-success");
    emit("close");

  } catch (error) {
    console.error("에러:", error);
    alert("리뷰 등록 실패");
  }
};
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};


onMounted(fetchReviews);
</script>

<style scoped>
@import '/src/styles/Review.css';
</style>