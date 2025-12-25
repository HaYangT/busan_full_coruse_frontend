<template>
  <div class="update-page">
    <h3 class="section-title">내 정보 수정</h3>

    <form class="update-form" @submit.prevent="onUpdate">
      <!-- 아이디 (수정 불가) -->
      <div class="row">
        <input type="text" v-model="userId" disabled />
      </div>

      <!-- 이메일 -->
      <div class="row">
        <input type="email" v-model="email" placeholder="이메일" required />
        <button type="button" class="check-button" @click="checkEmail">중복체크</button>
      </div>

      <!-- 닉네임 -->
      <div class="row">
        <input type="text" v-model="nickname" placeholder="닉네임" required />
      </div>

      <button type="submit" class="update-button">정보 수정</button>
    </form>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

const userId = ref(userInfo.userId || "");
const email = ref(userInfo.email || "");
const nickname = ref(userInfo.nickname || "");

const isEmailChecked = ref(true);
const isNicknameChecked = ref(true);

/* 값 바뀌면 중복체크 다시 하도록 */
watch(email, () => {
  isEmailChecked.value = false;
});
watch(nickname, () => {
  isNicknameChecked.value = false;
});

/* 이메일 중복 체크 */
const checkEmail = async () => {
  if (!email.value) return alert("이메일을 입력해주세요.");

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/user/checkEmail?email=${email.value}`;
    const res = await axios.get(url);

    if (res.data === 1 && email.value !== userInfo.email) {
      alert("이미 사용 중인 이메일입니다.");
      isEmailChecked.value = false;
    } else {
      alert("사용 가능한 이메일입니다!");
      isEmailChecked.value = true;
    }
  } catch {
    alert("이메일 중복 확인 실패");
  }
};

/* 정보 수정 */
const onUpdate = async () => {
  if (!isEmailChecked.value) {
    alert("이메일 중복체크를 완료해주세요.");
    return;
  }

  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/user/userUpdate`;

    await axios.post(url, {
      email: email.value,
      nickname: nickname.value,
    });

    alert("정보가 수정되었습니다.");

    /* localStorage 갱신 */
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...userInfo,
        email: email.value,
        nickname: nickname.value,
      })
    );
  } catch (e) {
    console.error(e);
    alert("정보 수정 실패");
  }
  location.reload();
};
</script>
<style scoped>
.update-page {
  padding: 16px 0;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.update-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
  gap: 8px;
}

.row input {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.check-button {
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  background: #eee;
  cursor: pointer;
  font-size: 14px;
}

.update-button {
  margin-top: 10px;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #4f9cf9;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
</style>
