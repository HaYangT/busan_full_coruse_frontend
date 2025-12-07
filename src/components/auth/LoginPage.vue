<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <h2>로그인</h2>

      <form class="login-form" @submit.prevent="onLogin">
        <input
          type="text"
          v-model="id"
          placeholder="아이디"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호"
          required
        />
        <button type="submit" class="login-button">로그인</button>
      </form>

      <div class="links">
        <RouterLink to="/regist" class="link" @click.prevent = "$emit('open-register')">회원가입</RouterLink>
        <RouterLink to="/resetpassword" class="link" @click.prevent="$emit('open-resetpassword')">비밀번호 찾기</RouterLink>
      </div>
      <button class="close-btn" @click="$emit('close')">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const id = ref("");
const password = ref("");

/*
const onLogin = async () => {

};
*/
</script>

<style scoped>
@import '/src/styles/LoginPage.css';
</style>