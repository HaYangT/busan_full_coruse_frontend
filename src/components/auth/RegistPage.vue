<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>회원 가입</h2>

      <form class="regist-form" @submit.prevent="onRegist">

        <input type="text" v-model="userId" placeholder="아이디" required /> <button>중복체크</button>

        <input type="email" v-model="email" placeholder="이메일" required />

        <input type="text" v-model="nickname" placeholder="닉네임" required />
        
        <input type="password" v-model="password" placeholder="비밀번호" required />
        <input type="password" v-model="confirmPassword" placeholder="비밀번호 확인" required />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="regist-button">회원가입</button>
      </form>

      <div class="links">
        <RouterLink to="/login" class="link" @click.prevent="$emit('open-login')">
          뒤로가기
        </RouterLink>
      </div>

      <button class="close-btn" @click="$emit('close')">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const emit = defineEmits(["open-login"]);

const userId = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const nickname = ref("");

const passwordError = ref("");

watch([password, confirmPassword], () => {
  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      passwordError.value = "비밀번호가 일치하지 않습니다.";
    } else {
      passwordError.value = "";
    }
  } else {
    passwordError.value = "";
  }
});

const onRegist = async () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/auth/regist`;

    await axios.post(url, {
      userId: userId.value,
      password: password.value,
      email: email.value,
      nickname: nickname.value,
    });

    alert("회원가입 성공! 로그인해주세요.");
    emit("open-login");

  } catch (error) {
    console.error(error);
    alert("회원가입에 실패했습니다.");
  }
};
</script>


<style scoped>
@import '/src/styles/RegistPage.css';
</style>
