<template>
  <div class="travel-detail-page">
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

      <RouteMap
        :items="routeData.items"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import RouteMap from '../kakaomap/RouteMap.vue'

const baseUrl = import.meta.env.VITE_SERVER_URL
const router = useRoute()

const plan = ref(null)
const routeData = ref({ items: [] })

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toISOString().split('T')[0]
}

const fetchDetail = async () => {
  const token = localStorage.getItem('accessToken')

  const res = await axios.get(
    `${baseUrl}/travel/${router.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  plan.value = res.data
  routeData.value = JSON.parse(res.data.route)

  console.log('복원된 route:', routeData.value)
}

onMounted(fetchDetail)
</script>


<style scoped>
.travel-detail-page {
  padding: 20px;
}

.route-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order {
  font-weight: bold;
  color: #2563eb;
}

</style>