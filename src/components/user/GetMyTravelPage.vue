<template>
  <div class="my-tour-page">
    <h2 class="page-title">나의 여행 계획</h2>

    <div v-if="isLoading" class="loading-msg">데이터를 불러오는 중입니다...</div>

    <div v-else-if="travelPlans.length > 0" class="plan-list">
      <div v-for="plan in travelPlans" :key="plan.id" class="plan-card" @click="goToDetail(plan.id)">
        <div class="plan-image">
          <div class="placeholder-img">✈️</div>
        </div>

        <div class="plan-info">
          <h3 class="plan-title">{{ plan.title || "제목 없는 여행" }}</h3>
          <p class="plan-date">{{ formatDate(plan.startDate) }} ~ {{ formatDate(plan.endDate) }}</p>
          <p v-if="plan.description" class="plan-desc">{{ plan.description }}</p>
        </div>
        <button class="delete-btn" @click.stop="deletePlan(plan.id)">삭제</button>
      </div>
    </div>

    <div v-else class="empty-msg">
      <p>등록된 여행 계획이 없습니다.</p>
      <button class="create-btn">여행 계획 만들기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import api from "@/filter/filter";
const baseUrl = import.meta.env.VITE_SERVER_URL;
const travelPlans = ref([]);
const isLoading = ref(true);
import { useRouter } from "vue-router";

const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

const goToDetail = (id) => {
  router.push(`/travel/${id}`);
};

const fetchMyPlans = async () => {
  try {
    isLoading.value = true;

    const token = localStorage.getItem("accessToken");

    const response = await api.get(`${baseUrl}/api/v1/travel`, {});

    travelPlans.value = response.data;
    console.log("가져온 데이터:", travelPlans.value);
  } catch (error) {
    console.error("여행 계획을 불러오는데 실패했습니다:", error);
    alert("로그인이 필요하거나 데이터를 가져올 수 없습니다.");
  } finally {
    isLoading.value = false;
  }
};

const deletePlan = async (id) => {
  if (!confirm("정말 이 여행 계획을 삭제할까요?")) return;

  try {
    const token = localStorage.getItem("accessToken");

    await api.delete(`${baseUrl}/api/v1/travel/${id}`, {});

    travelPlans.value = travelPlans.value.filter((plan) => plan.id !== id);

    alert("여행 계획이 삭제되었습니다.");
  } catch (error) {
    console.error("삭제 실패:", error);
    alert("여행 계획 삭제에 실패했습니다.");
  }
};

onMounted(() => {
  fetchMyPlans();
});
</script>

<style scoped>
@import "/src/styles/GetMyTourPage.css";
</style>
