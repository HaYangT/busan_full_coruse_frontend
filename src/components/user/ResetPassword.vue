<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>비밀번호 찾기</h2>

      <form class="reset-form" @submit.prevent="onReset">
        <!-- <input
          type="text"
          v-model="id"
          placeholder="아이디"
          required
        /> -->
        <input type="text" v-model="email" placeholder="이메일" required />
        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? "전송 중..." : "확인" }}
        </button>
      </form>
      <div class="links">
        <button type="button" class="link" @click.prevent="$emit('open-login')">뒤로가기</button>
      </div>
      <button class="close-btn" @click="$emit('close')">
        <svg class="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

// const id = ref("");
const email = ref("");
const isLoading = ref(false);
const emit = defineEmits(["close"]);
const onReset = async () => {
  let resultMessage = "";

  if (isLoading.value) return;

  isLoading.value = true;

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/password/reset-request`;
    const response = await axios.post(url, {
      email: email.value,
    });

    resultMessage = response.data.message;
    alert(resultMessage);
    emit("close");
  } catch (error) {
    console.log(error);
    resultMessage = error.response.data.message;
    alert(resultMessage);
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import "/src/styles/ResetPassword.css";
</style>
