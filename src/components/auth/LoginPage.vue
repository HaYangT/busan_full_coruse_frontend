<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>로그인</h2>

      <form class="login-form" @submit.prevent="onLogin">
        <input
          type="text"
          v-model="userId"
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
import axios from "axios";
import { ref } from "vue";

const userId = ref("");
const password = ref("");


const onLogin = async () => {
  try{
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/auth/login`
    const response = await axios.post(url,{
      userId : userId.value,
      password: password.value,
    })
    const {accessToken, refreshToken} = response.data.data;

    localStorage.setItem("accessToken",accessToken);
    localStorage.setItem("refreshToken",refreshToken);

    alert("로그인됬어잉")
    emit("login-success");
    emit("close");
  }catch(error){
    console.log(error);
    alert("아이디, 비밀번호를 확인해줘잉")
  }
};

</script>

<style scoped>
@import '/src/styles/LoginPage.css';
</style>