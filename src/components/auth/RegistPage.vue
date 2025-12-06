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

/*
const onRegist = async () => {

};
*/
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}

.modal-box {
  background: white;
  width: 360px;
  padding: 24px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.regist-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.regist-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  order: 0; 
}

.regist-form .regist-button {
  width: 100%;
  padding: 10px; 
  box-sizing: border-box;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  order: 1; 
  margin-top: 8px; 
}


.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.links {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.link {
  color: #4a90e2;
  font-size: 14px;
  text-decoration: none; 
}
</style>