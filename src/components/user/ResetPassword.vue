<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>비밀번호 찾기</h2>

      <form class="reset-form" @submit.prevent="onReset">
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
        <button type="submit" class= "submit-button">확인</button>
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
const email = ref("");

const onReset = async () => {
  
  let  resultMessage = '';

  try{
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/password/reset-request`
    const response = await axios.post(url,{
      email: email.value
    })

    resultMessage = response.data.message;
    alert(resultMessage);
  }
  catch(error){
    console.log(error)
    resultMessage = error.response.data.message;
    alert(resultMessage);
  }

  
};
</script>

<style scoped>
@import '/src/styles/ResetPassword.css';
</style>