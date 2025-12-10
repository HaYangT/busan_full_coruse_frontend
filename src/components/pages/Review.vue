<template>
  <div class="review-page-container">
    <div class="review-header">
      <h2>리뷰 작성</h2>
      <button class="close-btn" @click="$emit('close')">닫기</button> 
    </div>

    <div class="review-content-area">
      <form class="review-form" @submit.prevent="onSubmitReview">
        
        <div class="item-info">
          리뷰 대상: <strong>{{ props.item?.name || '정보 없음' }}</strong> (ID: {{ props.item?.id || 0 }})
        </div>
        
        <div class="rating-container">
          <label class="rating-label">별점</label>
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

        <textarea
          v-model="content"
          placeholder="솔직한 리뷰 내용을 입력해주세요."
          class="review-textarea"
          required
        ></textarea>

        <button type="submit" class="submit-button">리뷰 등록 완료 (테스트)</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const props = defineProps({
  item: Object
});

const emit = defineEmits(['close', 'review-success']);

const rating = ref(5); 
const content = ref("");

const onSubmitReview = async () => {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/review`; 
    const payload = {
      user_id: "guest_user", 
      rating: rating.value,
      content: content.value,
      created_at: new Date().toISOString(),
      target_type: "PRODUCT", 
      target_id: props.item?.id || 0
    };

    console.log("리뷰 데이터 전송 시도:", payload);
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("서버 응답 성공:", response.data);
    alert("리뷰가 성공적으로 등록되었어요! (인증 테스트 제외)");
    
    emit("review-success");
    emit("close");

  } catch (error) {
    console.error("리뷰 등록 실패:", error.response || error);
    alert("리뷰 등록에 실패했어요. 서버 상태와 네트워크를 확인해 주세요.");
  }
};
</script>

<style scoped>
.review-page-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: 1px solid #ccc;
  color: #555;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #eee;
}

.item-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #eef;
  border-radius: 4px;
  font-size: 0.95rem;
}


.rating-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.rating-label {
  font-weight: bold;
  color: #555;
}

.stars {
  cursor: pointer;
  user-select: none;
  font-size: 1.5rem;
}

.star {
  color: #ccc;
  transition: color 0.2s;
}

.star.active {
  color: #ffc107; 
}

.rating-score {
  font-weight: bold;
  color: #333;
}


.review-textarea {
  width: 100%;
  height: 150px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical; 
  font-family: inherit;
  box-sizing: border-box; 
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>