<template>
  <div class="mypage-page">
    <div class="mypage-box">
      <button class="back-btn" @click="goBack">뒤로가기</button>

      <h2 class="mypage-title">{{ plan?.title }}</h2>
      <p class="date">{{ formatDate(plan?.createdAt) }}</p>

      <section class="route-section">
        <h3 class="section-title">여행 경로</h3>

        <div v-for="item in routeData.items" :key="item.placeId" class="info-row">
          <span class="order">{{ item.order }}</span>
          <span class="name">{{ item.name }}</span>
        </div>

        <button class="edit-btn" @click="openEditModal">경로 수정</button>

        <RouteMap v-if="routeData.items.length > 0" :items="routeData.items" />
      </section>

      <!-- 수정 모달 -->
      <TravelEditPage
        v-if="isEditModalOpen"
        :items="routeData.items"
        @save="applyEdit"
        @close="isEditModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import api from "@/filter/filter";
import RouteMap from "@/components/kakaomap/RouteMap.vue";
import TravelEditPage from "@/components/travel/TravelEditPage.vue";

const baseUrl = import.meta.env.VITE_SERVER_URL;

const route = useRoute();
const router = useRouter();

const plan = ref(null);
const routeData = ref({ items: [] });
const isEditModalOpen = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

const fetchDetail = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await api.get(`${baseUrl}/travel/${route.params.id}`, {});

  plan.value = res.data;
  routeData.value = JSON.parse(res.data.route);
};

const goBack = () => {
  router.back();
};

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const applyEdit = async (updatedItems) => {
  routeData.value.items = updatedItems;

  await saveRoute();
  isEditModalOpen.value = false;
};

const saveRoute = async () => {
  const token = localStorage.getItem("accessToken");

  await api.put(
    `${baseUrl}/travel/${route.params.id}`,
    {
      route: JSON.stringify(routeData.value),
    },
    {}
  );
};

onMounted(fetchDetail);
</script>

<style scoped>
.mypage-page {
  min-height: 100vh;
  background: #f4f6f8;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.mypage-box {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.mypage-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
}

.date {
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-bottom: 16px;
}

.route-section {
  margin-top: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  background-color: #f6f6f6;
  margin-bottom: 12px;
}

.order {
  font-weight: bold;
  color: #2563eb;
}

.name {
  font-size: 15px;
  color: #333;
}
.back-btn {
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: none;
  color: #888;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
}
.back-btn:hover {
  color: #555;
}
.edit-btn {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #2563eb;
  color: #fff;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #1e50b8;
}
</style>
