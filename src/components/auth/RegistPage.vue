\<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <h2>회원 가입</h2>

      <form class="regist-form" @submit.prevent="onRegist">
        <input
          type="text"
          v-model="id"
          placeholder="아이디"
          required
        />
         <input
          type="text"
          v-model="email"
          placeholder="이메일"
          required
        />
        <input
          type="text"
          v-model="nickname"
          placeholder="닉네임"
          required
          />
        <input
          type="password"
          v-model="password"
          placeholder="비밀번호"
          required
        />
         <input
          type="password"
          v-model="password"
          placeholder="비밀번호 확인"
          required
        />
        
        <button type="submit" class="regist-button">회원가입</button>
      </form>

      <div class="links">
        <RouterLink to="/login" class="link" @click.prevent="$emit('open-login')">뒤로가기</RouterLink>
      </div>
      <button class="close-btn" @click="$emit('close')">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const id = ref("");
const password = ref("");
const email = ref("");
const nickname = ref("");


const onRegist = async () => {
  try{

  }catch(error){
    console.log(error);
  }
};

</script>

<style scoped>
@import '/src/styles/RegistPage.css';

</style>