<template>
  <form class="review-form" @submit.prevent="submitReview">
    <h3>리뷰 등록</h3>

    <div class="review-item-info">
      <strong>{{ item?.name }} 리뷰 작성</strong>
      <p class="review-user">작성자: {{ userInfo?.nickname || "알 수 없음" }}</p>
    </div>

    <div class="review-rating">
      <label>별점</label>
      <div class="stars">
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ active: star <= rating }"
          @click="rating = star"
        >
          ★
        </span>
      </div>
      <span class="rating-score">{{ rating }}점</span>
    </div>

    <div class="review-images">
      <label class="upload-btn">
        📷 사진 추가
        <input
          type="file"
          multiple
          accept="image/*"
          class="hidden-input"
          @change="handleFileChange"
        />
      </label>

      <div v-if="previewImages.length" class="preview-list">
        <div v-for="(img, idx) in previewImages" :key="idx" class="preview-item">
          <img :src="img.url" />
          <button type="button" class="remove-btn" @click="removeImage(idx)">×</button>
        </div>
      </div>
    </div>

    <textarea
      v-model="content"
      class="review-textarea"
      placeholder="솔직한 리뷰 내용을 입력해주세요."
      required
    ></textarea>

    <button type="submit" class="submit-button">
      리뷰 등록 완료
    </button>
  </form>
</template>


<script setup>
import axios from "axios";
import { ref, onUnmounted } from "vue";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("accessToken");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const props = defineProps({
  item: { type: Object, required: true }
});
const emit = defineEmits(["created"]);

const rating = ref(5);
const content = ref("");
const selectedFiles = ref([]);
const previewImages = ref([]);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  selectedFiles.value.push(...files);
  files.forEach(file => {
    previewImages.value.push({ url: URL.createObjectURL(file), file });
  });

  e.target.value = "";
};

const removeImage = (index) => {
  URL.revokeObjectURL(previewImages.value[index].url);
  previewImages.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);
};

onUnmounted(() => {
  previewImages.value.forEach(img => URL.revokeObjectURL(img.url));
});

const submitReview = async () => {
  if (!props.item?.id) return alert("리뷰 대상 정보가 없습니다.");

  try {
    const formData = new FormData();
    formData.append("rating", rating.value);
    formData.append("content", content.value);
    formData.append("targetId", props.item.id);
    formData.append("targetType", props.item.tagType || "PLACE");
    selectedFiles.value.forEach(file => formData.append("images", file));

    await axios.post(`${baseUrl}/api/v1/review`, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
    });

    alert("리뷰가 등록되었습니다!");
    rating.value = 5;
    content.value = "";
    selectedFiles.value = [];
    previewImages.value = [];
    emit("created");
  } catch (e) {
    console.error(e);
    alert("리뷰 등록 실패");
  }
};
</script>


<style scoped>
@import '/src/styles/Review.css';
</style>
