<template>
  <form class="review-form edit-form" @submit.prevent="submitUpdate">
    <h3>리뷰 수정</h3>

    <!-- 별점 -->
    <div class="rating-container">
      <label>별점</label>
      <div class="stars">
        <span v-for="star in 5" :key="star" class="star" :class="{ active: star <= rating }"
          @click="rating = star">★</span>
      </div>
      <span class="rating-score">{{ rating }}점</span>
    </div>

    <!-- 이미지 업로드 -->
    <div class="image-upload-container">
      <label class="upload-btn-label">
        📷 사진 수정
        <input type="file" multiple accept="image/*" class="hidden-input" @change="handleFileChange" />
      </label>

      <div v-if="previewImages.length" class="preview-list">
        <div v-for="(img, idx) in previewImages" :key="idx" class="preview-item">
          <img :src="img.url" class="preview-thumb" />
          <button type="button" class="remove-img-btn" @click="removeImage(idx)">×</button>
        </div>
      </div>
    </div>

    <!-- 내용 -->
    <textarea v-model="content" class="review-textarea" required></textarea>

    <!-- 버튼 -->
    <div class="btn-row">
      <button type="submit" class="submit-button">수정 완료</button>
      <button type="button" class="cancel-button" @click="$emit('cancel')">취소</button>
    </div>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref, watch, onUnmounted } from "vue";

const baseUrl = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("accessToken");

const props = defineProps({
  review: { type: Object, required: true }
});
const emit = defineEmits(["updated", "cancel"]);

const rating = ref(5);
const content = ref("");
const previewImages = ref([]);
const newFiles = ref([]);
const removedImageIds = ref([]);

watch(
  () => props.review,
  (review) => {
    if (!review) return;
    rating.value = review.rating;
    content.value = review.content;

    previewImages.value = (review.pictures || []).map(pic => ({
      id: pic.id,
      url: `${baseUrl}/upload/${pic.picturePath}`,
      isServer: true
    }));

    newFiles.value = [];
  },
  { immediate: true }
);

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  newFiles.value.push(...files);

  files.forEach(file => {
    previewImages.value.push({
      url: URL.createObjectURL(file),
      file,
      isServer: false
    });
  });

  e.target.value = "";
};

const removeImage = (index) => {
  const img = previewImages.value[index];

  if (img.isServer) {
    removedImageIds.value.push(img.id);
  } else {
    URL.revokeObjectURL(img.url);
    const fileIdx = newFiles.value.findIndex(f => f === img.file);
    if (fileIdx > -1) newFiles.value.splice(fileIdx, 1);
  }
  previewImages.value.splice(index, 1);
};

onUnmounted(() => {
  previewImages.value.forEach(img => {
    if (!img.isServer) URL.revokeObjectURL(img.url);
  });
});


const submitUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("rating", rating.value);
    formData.append("content", content.value);
    removedImageIds.value.forEach(id => formData.append("removeImageIds", id));

    newFiles.value.forEach(file => formData.append("images", file));

    await axios.put(`${baseUrl}/api/v1/review/${props.review.id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("수정 완료!");
    emit("updated");
  } catch (e) {
    console.error(e);
  }
};

</script>

<style scoped>
.btn-row {
  display: flex;
  gap: 8px;
}

.cancel-button {
  background: #aaa;
  color: #fff;
}

.preview-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.preview-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.rating-container {
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 6px;
  cursor: pointer;
}

.star {
  font-size: 28px;
  color: #ddd;
  transition: color 0.2s, transform 0.1s;
}

.star.active {
  color: #ffb400;
}

.star:hover {
  transform: scale(1.15);
}

.rating-score {
  margin-left: 8px;
  font-weight: bold;
  color: #555;
}
</style>
