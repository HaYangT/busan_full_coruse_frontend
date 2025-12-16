<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>새 비밀번호 설정</h2>
      <form class="reset-form" @submit.prevent="onConfirm">
        <input type="password" v-model="newPassword" placeholder="새 비밀번호" required />
        <input type="password" v-model="confirmPassword" placeholder="비밀번호 확인" required />
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="submit-button">비밀번호 변경</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const token = ref("");

onMounted(() => {
  // 토큰 추출
  token.value = route.query.token;
  if (!token.value) {
    alert("유효하지 않은 접근입니다.");
    router.push("/login");
  }
});

const onConfirm = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    await axios.post(`${baseUrl}/api/v1/password/reset`, {
      token: token.value,
      newPassword: newPassword.value
    });
    alert("비밀번호가 성공적으로 변경되었습니다.");
    router.push("/login");
  } catch (err) {
    alert(err.response?.data?.message || "변경에 실패했습니다.");
  }
};
</script>

<style scoped>
@import '/src/styles/ResetPassword.css';
</style>