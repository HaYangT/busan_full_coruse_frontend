<template>
  <div class="my-travel-overlay" @click.self="$emit('close')">
    <div class="my-travel-panel">
      <header class="panel-header">
        <h3>🧭 내 여정</h3>
        <button class="close-btn" @click="$emit('close')">
          <svg class="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <!-- 제목 -->
      <input
        v-model="tripTitle"
        class="title-input"
        placeholder="여정 이름을 입력하세요"
      />

      <!-- 빈 상태 -->
      <p v-if="store.plan.items.length === 0">
        추가된 장소가 없습니다.
      </p>

      <!-- 리스트 -->
      <draggable
        v-model="store.plan.items"
        item-key="placeId"
        handle=".drag-handle"
        animation="200"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <div class="tour-item">
            <span class="drag-handle">☰</span>
            <span class="name">
              {{ index + 1 }}. {{ element.name }}
            </span>
            <button @click="remove(element.placeId)">✕</button>
          </div>
        </template>
      </draggable>

      <!-- 하단 -->
      <div class="panel-footer">
        <div
          class="register-wrapper"
          @mouseenter="showHint = true"
          @mouseleave="showHint = false"
        >
          <button
            class="register-btn"
            :disabled="store.plan.items.length === 0"
            @click="registerTrip"
          >
            여정 등록하기
          </button>

          <div
            v-if="showHint && store.plan.items.length === 0"
            class="hint-tooltip"
          >
            최소 한 군데 이상의 장소를 지정해주세요
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useTravelPlanStore } from '@/stores/useTravelPlanStore'
import axios from 'axios'

const store = useTravelPlanStore()
const baseUrl = import.meta.env.VITE_SERVER_URL

const showHint = ref(false)
const tripTitle = ref('')

/* 드래그 끝나면 order 재정렬 */
const onDragEnd = () => {
  store.reorder(
    store.plan.items.map((item, index) => ({
      ...item,
      order: index + 1
    }))
  )
}

const remove = (placeId) => {
  store.removePlace(placeId)
}

const registerTrip = async () => {
  if (store.plan.items.length === 0) {
    alert('등록할 여정이 없습니다.')
    return
  }

  const payload = {
    title: tripTitle.value,
    route: JSON.stringify({
      title: tripTitle.value,
      items: store.plan.items.map((item, index) => ({
        ...item,
        order: index + 1
      }))
    })
  }

  try {
    const token = localStorage.getItem('accessToken')

    const res = await axios.post(
      `${baseUrl}/travel`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('여정 등록 성공:', res.data)
    alert('여정이 등록되었습니다!')

    tripTitle.value = ''
    store.clearPlan()

  } catch (err) {
    console.error('여정 등록 실패:', err)
    alert('여정 등록에 실패했습니다.')
  }
}

defineEmits(['close'])
</script>


<style scoped>
@import "/src/styles/MyTravelPanel.css";

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>