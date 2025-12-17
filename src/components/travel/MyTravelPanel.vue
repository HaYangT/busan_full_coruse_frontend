<template>
  <div class="my-travel-overlay" @click.self="$emit('close')">
    <div class="my-travel-panel">
      <header class="panel-header">
        <h3>🧭 내 여정</h3>
        <button @click="$emit('close')">✕</button>
      </header>

      <p v-if="localItems.length === 0">
        추가된 장소가 없습니다.
      </p>

      <draggable v-model="localItems" item-key="placeId" handle=".drag-handle" animation="200" @end="onDragEnd">
        <template #item="{ element }">
          <div class="tour-item">
            <span class="drag-handle">☰</span>
            <span class="name">
              {{ element.order }}. {{ element.name }}
            </span>
            <button @click="remove(element.placeId)">✕</button>
          </div>
        </template>
      </draggable>

      <div class="panel-footer">
        <div class="register-wrapper" @mouseenter="showHint = true" @mouseleave="showHint = false">
          <button class="register-btn" :disabled="localItems.length === 0" @click="registerTrip">
            여정 등록하기
          </button>

          <div v-if="showHint && localItems.length === 0" class="hint-tooltip">
            최소 한 군데 이상의 장소를 지정해주세요
          </div>
        </div>
      </div>

    </div>
  </div>


</template>

<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import { useTravelPlanStore } from '@/stores/useTravelPlanStore'
import axios from 'axios';


const store = useTravelPlanStore();
const localItems = ref([]);
const baseUrl = import.meta.env.VITE_SERVER_URL;
const showHint = ref(false)


watch(
  () => store.plan.items,
  (newItems) => {
    localItems.value = [...newItems]
  },
  { immediate: true }
)

const onDragEnd = () => {
  store.reorder(localItems.value)
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
    title: store.plan.title ?? '나의 여행 계획',
    route: JSON.stringify({
      ...store.plan,
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

  } catch (err) {
    console.error('여정 등록 실패:', err)
    alert('여정 등록에 실패했습니다.')
  }
}

defineEmits(['close'])
</script>

<style scoped>
.my-travel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}

.my-travel-panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 320px;
  height: 100%;
  background: #fff;
  padding: 16px;
  animation: slideIn 0.3s ease;
}

.panel-footer {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.register-btn:hover {
  background: #1d4ed8;
}

.register-wrapper {
  position: relative;
}

.hint-tooltip {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.hint-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #111827 transparent transparent transparent;
}
.register-btn:disabled {
  background: #cbd5f5;
  cursor: not-allowed;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}
</style>