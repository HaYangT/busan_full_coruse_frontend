<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <h3>여행 경로 수정</h3>

      <draggable
        v-model="localItems"
        item-key="placeId"
        handle=".drag-handle"
        animation="200"
      >
        <template #item="{ element, index }">
          <div class="edit-item">
            <span class="drag-handle">☰</span>
            <span class="order">{{ index + 1 }}</span>
            <span class="name">{{ element.name }}</span>

            <button
              @click="remove(index)"
              :disabled="localItems.length <= 1"
            >
              삭제
            </button>
          </div>
        </template>
      </draggable>

      <div class="modal-actions">
        <button @click="$emit('close')">취소</button>
        <button @click="save">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['save', 'close'])

const localItems = ref(
  JSON.parse(JSON.stringify(props.items))
)

const remove = (index) => {
  if (localItems.value.length <= 1) {
    alert('경로는 최소 1개 이상 필요합니다.')
    return
  }

  localItems.value.splice(index, 1)
}

const save = () => {
  localItems.value.forEach((item, idx) => {
    item.order = idx + 1
  })

  emit('save', localItems.value)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.modal-box {
  background: #fff;
  width: 320px;
  padding: 20px;
  border-radius: 12px;
}

.edit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

.drag-handle {
  cursor: grab;
}

.order {
  font-weight: bold;
  color: #2563eb;
}

.modal-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
