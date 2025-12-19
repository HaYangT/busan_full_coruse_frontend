<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>로그인</h2>
      <button class="close-btn" @click="$emit('close')">
        <svg class="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <form class="login-form" @submit.prevent="onLogin">
        <input type="text" v-model="userId" placeholder="아이디" required />
        <input type="password" v-model="password" placeholder="비밀번호" required />
        <button type="submit" class="login-button">로그인</button>
      </form>

      <div class="links">
        <button type="button" class="link" @click="$emit('open-register')">회원가입</button>
        <button type="button" class="link" @click="$emit('open-resetpassword')">비밀번호 찾기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
const baseUrl = import.meta.env.VITE_SERVER_URL;
const userId = ref("");
const password = ref("");
const emit = defineEmits(["login-success", "close", "open-register", "open-resetpassword"]);

const onLogin = async () => {
  try {
    const url = `${baseUrl}/api/v1/auth/login`;
    const response = await axios.post(url, {
      userId: userId.value,
      password: password.value,
    });
    const { accessToken, refreshToken, user } = response.data;
    console.log(response.data);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(user));
    alert("로그인됬어잉");
    emit("login-success");
    emit("close");
  } catch (error) {
    console.log(error);
    alert("아이디, 비밀번호를 확인해줘잉");
  }
};
</script>

<style scoped>
@import "/src/styles/LoginPage.css";
</style>
