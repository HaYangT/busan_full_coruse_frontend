<template>
  <div class="modal-overlay">
    <div class="modal-box">
      <h2>회원 가입</h2>

      <form class="regist-form" @submit.prevent="onRegist">
        <div class="row">
          <input type="text" v-model="userId" placeholder="아이디" required />
          <button type="button" class="check-button" @click="checkUserId">중복체크</button>
        </div>

        <div class="row">
          <input type="email" v-model="email" placeholder="이메일" required />
          <button type="button" class="check-button" @click="checkEmail">중복체크</button>
        </div>

        <input type="text" v-model="nickname" placeholder="닉네임" required />
        <input type="password" v-model="password" placeholder="비밀번호" required />
        <input type="password" v-model="confirmPassword" placeholder="비밀번호 확인" required />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

        <button type="submit" class="regist-button">회원가입</button>
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
import { ref, watch } from "vue";
import axios from "axios";

const emit = defineEmits(["open-login", "close"]);

const userId = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const nickname = ref("");

const passwordError = ref("");

const isUserIdChecked = ref(false);
const isEmailChecked = ref(false);

watch(userId, () => {
  isUserIdChecked.value = false;
});
watch(email, () => {
  isEmailChecked.value = false;
});

watch([password, confirmPassword], () => {
  if (password.value && confirmPassword.value) {
    passwordError.value = password.value !== confirmPassword.value ? "비밀번호가 일치하지 않습니다." : "";
  } else {
    passwordError.value = "";
  }
});

const checkUserId = async () => {
  if (!userId.value) return alert("아이디를 입력해주세요.");

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/auth/checkUserId?userId=${userId.value}`;
    const res = await axios.get(url);

    if (res.data === 1) {
      alert("이미 사용 중인 아이디입니다.");
      isUserIdChecked.value = false;
    } else {
      alert("사용 가능한 아이디입니다!");
      isUserIdChecked.value = true;
    }
  } catch (e) {
    alert("아이디 중복 확인 중 오류 발생");
  }
};

const checkEmail = async () => {
  if (!email.value) return alert("이메일을 입력해주세요.");

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/auth/checkEmail?email=${email.value}`;
    const res = await axios.get(url);

    if (res.data === 1) {
      alert("이미 사용 중인 이메일입니다.");
      isEmailChecked.value = false;
    } else {
      alert("사용 가능한 이메일입니다!");
      isEmailChecked.value = true;
    }
  } catch (e) {
    alert("이메일 중복 확인 중 오류 발생");
  }
};

const onRegist = async () => {
  if (password.value !== confirmPassword.value) {
    passwordError.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  if (!isUserIdChecked.value) {
    alert("아이디 중복체크를 완료해주세요.");
    return;
  }
  if (!isEmailChecked.value) {
    alert("이메일 중복체크를 완료해주세요.");
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
@import "/src/styles/RegistPage.css";
</style>
