<template>
  <div id="route-map"></div>
</template>

<script setup>
import { onMounted, watch } from "vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

let map = null;
let overlays = [];
let polyline = null;

const COLORS = ["#3B82F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#06B6D4"];

const loadMap = () => {
  if (!window.kakao || !window.kakao.maps) return;

  const container = document.getElementById("route-map");
  if (!container) return;

  const first = props.items[0];
  const center = first
    ? new window.kakao.maps.LatLng(first.y, first.x)
    : new window.kakao.maps.LatLng(37.5665, 126.978);

  map = new window.kakao.maps.Map(container, {
    center,
    level: 5,
  });

  drawRoute();
};

const drawRoute = () => {
  if (!map || !window.kakao?.maps) return;
  if (!props.items || props.items.length === 0) return;

  // 1. 기존 오버레이 및 선 제거
  overlays.forEach((o) => o.setMap(null));
  overlays = [];
  if (polyline) polyline.setMap(null);

  const sortedItems = [...props.items].sort((a, b) => a.order - b.order);
  const path = [];
  const bounds = new window.kakao.maps.LatLngBounds();

  sortedItems.forEach((item, index) => {
    const pos = new window.kakao.maps.LatLng(item.y, item.x);
    path.push(pos);
    bounds.extend(pos);

    const color = COLORS[index % COLORS.length];

    // 2. 커스텀 오버레이 생성 (HTML 구조 단순화 및 인라인 스타일 보강)
    const overlay = new window.kakao.maps.CustomOverlay({
      position: pos,
      content: `
        <div class="custom-pin" style="--bg-color: ${color}">
          <div class="pin-label">${item.order}</div>
          <div class="pin-tip"></div>
        </div>
      `,
      xAnchor: 0.5,
      yAnchor: 1.0,
      zIndex: 10,
    });

    overlay.setMap(map);
    overlays.push(overlay);
  });

  // 3. 선 그리기
  polyline = new window.kakao.maps.Polyline({
    path,
    strokeWeight: 4,
    strokeColor: "#2563eb",
    strokeOpacity: 0.6,
    strokeStyle: "dash",
  });
  polyline.setMap(map);

  // 4. 모든 마커가 보이도록 지도 범위 조정
  if (path.length > 0) {
    map.setBounds(bounds);
  }
};

watch(
  () => props.items,
  (newItems) => {
    if (!newItems || newItems.length === 0) return;
    if (!map) loadMap();
    else drawRoute();
  },
  { deep: true }
);

onMounted(() => {
  // 스크립트 로드 대기를 위해 살짝 지연 실행하거나 체크
  if (window.kakao && window.kakao.maps) {
    loadMap();
  }
});
</script>

<style>
/* ⚠️ 중요: scoped를 제거하거나, 전역 스타일로 정의해야 마커가 보입니다. */
#route-map {
  width: 100%;
  height: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-pin {
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.pin-label {
  width: 28px;
  height: 28px;
  background-color: var(--bg-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid white;
}

.pin-tip {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--bg-color);
  margin-top: -2px;
}
</style>
