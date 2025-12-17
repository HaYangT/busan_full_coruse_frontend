<template>
  <div class="travel-detail-page">
    <button class="back-btn" @click="goBack">← 뒤로가기</button>

    <h2 class="title">{{ plan?.title }}</h2>
    <p class="date">{{ formatDate(plan?.createdAt) }}</p>

    <section class="route-section">
      <h3>여행 경로</h3>

      <div
        v-for="item in routeData.items"
        :key="item.placeId"
        class="route-item"
      >
        <span class="order">{{ item.order }}</span>
        <span class="name">{{ item.name }}</span>
      </div>

      <button class="edit-btn" @click="openEditModal">
        경로 수정
      </button>

      <RouteMap
        v-if="routeData.items.length > 0"
        :items="routeData.items"
      />
    </section>

    <!-- 수정 모달 -->
    <TravelEditPage
      v-if="isEditModalOpen"
      :items="routeData.items"
      @save="applyEdit"
      @close="isEditModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import RouteMap from '@/components/kakaomap/RouteMap.vue'
import TravelEditPage from '@/components/travel/TravelEditPage.vue'

const baseUrl = import.meta.env.VITE_SERVER_URL

const route = useRoute()
const router = useRouter()

const plan = ref(null)
const routeData = ref({ items: [] })
const isEditModalOpen = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toISOString().split('T')[0]
}

const fetchDetail = async () => {
  const token = localStorage.getItem('accessToken')

  const res = await axios.get(
    `${baseUrl}/travel/${route.params.id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  plan.value = res.data
  routeData.value = JSON.parse(res.data.route)
}

const goBack = () => {
  router.back()
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const applyEdit = async (updatedItems) => {
  routeData.value.items = updatedItems

  await saveRoute()
  isEditModalOpen.value = false
}

const saveRoute = async () => {
  const token = localStorage.getItem('accessToken')

  await axios.put(
    `${baseUrl}/travel/${route.params.id}`,
    {
      route: JSON.stringify(routeData.value)
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
}

onMounted(fetchDetail)
</script>

<style scoped>
.travel-detail-page {
  padding: 20px;
}

.back-btn {
  margin-bottom: 12px;
}

.route-item {
  display: flex;
  gap: 12px;
  padding: 6px 0;
}

.order {
  font-weight: bold;
  color: #2563eb;
}

.edit-btn {
  margin-top: 12px;
  padding: 8px 12px;
}
</style>
