<template>
  <button class="floating-my-travel" @click="$emit('click')">
    🧭
    <span v-if="count > 0" class="badge">{{ count }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useTravelPlanStore } from '@/stores/useTravelPlanStore';

const store = useTravelPlanStore()
const count = computed(() => store.totalCount)

defineEmits(['click'])
</script>

<style scoped>
.floating-my-travel {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  font-size: 24px;
  border: none;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  cursor: pointer;
  z-index: 1500;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
</style>
