<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import api from "@/filter/filter"; // 인터셉터가 적용된 axios 객체

const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
  searchDist: {
    type: Number,
    default: 1,
  },
  searchTagId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update-places", "update-center", "select-place"]);

/* ================= 상태 관리 ================= */
const map = ref(null);
const markers = ref([]);
const places = ref([]);
const centerLat = ref(0);
const centerLng = ref(0);

const DEFAULT_COORDS = {
  LAT: 33.450701,
  LNG: 126.570667,
};

/* ================= 외부 노출 함수 (Expose) ================= */
const panTo = (lat, lng) => {
  if (!map.value) return;
  const moveLatLng = new window.kakao.maps.LatLng(lat, lng);
  map.value.setLevel(3);
  map.value.panTo(moveLatLng);
};

const loadData = async () => {
  if (!map.value) return;

  const latlng = map.value.getCenter();
  const lat = latlng.getLat();
  const lng = latlng.getLng();

  centerLat.value = lat;
  centerLng.value = lng;

  // 검색어가 있으면 검색 API, 없으면 주변 장소 API 호출
  if (props.searchQuery && props.searchQuery.trim() !== "") {
    await fetchPlacesByQuery(lat, lng, props.searchQuery);
  } else {
    await fetchPlaces(lat, lng);
  }
};

defineExpose({ panTo, reload: loadData });

/* ================= 핵심 로직: 데이터 로드 통합 ================= */

// 검색어 여부에 따라 적절한 API를 호출하는 통합 함수

// 1. 일반 주변 장소 가져오기
const fetchPlaces = async (lat, lng) => {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/place/getPlaces`;
    const response = await api.post(url, null, {
      params: {
        x: lng,
        y: lat,
        dist: props.searchDist,
      },
    });

    processResponse(response.data, lat, lng);
  } catch (error) {
    console.error("장소 목록 조회 에러:", error);
  }
};

// 2. 검색어로 장소 가져오기
const fetchPlacesByQuery = async (lat, lng, query) => {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/place/search/${query}`;
    const response = await api.get(url, {
      params: {
        x: lng,
        y: lat,
        dist: props.searchDist,
      },
    });

    processResponse(response.data, lat, lng);
  } catch (error) {
    console.error("검색 API 에러:", error);
  }
};

const fetchPlacesByTag = async (lat, lng, tagId) => {
  try {
    const baseUrl = import.meta.env.VITE_SERVER_URL;
    const url = `${baseUrl}/api/v1/place/tag/${tagId}`;

    const response = await api.get(url, {
      params: {
        x: lng,
        y: lat,
        dist: props.searchDist,
      },
    });

    processResponse(response.data, lat, lng);
  } catch (error) {
    console.error("태그 검색 API 에러:", error);
  }
};

// 3. API 응답 공통 처리 (마커 표시 및 부모에게 알림)
const processResponse = (data, lat, lng) => {
  places.value = data || [];
  displayMarkers(places.value);
  emit("update-places", places.value);
  emit("update-center", { lat, lng, dist: props.searchDist });
};

/* ================= 지도 마커 제어 ================= */
const removeMarkers = () => {
  markers.value.forEach((marker) => marker.setMap(null));
  markers.value = [];
};

const displayMarkers = (placeList) => {
  if (!map.value) return;
  removeMarkers();

  placeList.forEach((place) => {
    const position = new window.kakao.maps.LatLng(place.y, place.x);
    const marker = new window.kakao.maps.Marker({
      map: map.value,
      position: position,
      title: place.name,
      clickable: true,
    });

    markers.value.push(marker);
    window.kakao.maps.event.addListener(marker, "click", () => {
      emit("select-place", place);
    });
  });
};

/* ================= 초기화 및 위치 정보 ================= */
const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_COORDS);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ LAT: pos.coords.latitude, LNG: pos.coords.longitude }),
      () => resolve(DEFAULT_COORDS),
      { timeout: 5000 }
    );
  });
};

const loadKakaoMap = async () => {
  const coords = await getCurrentLocation();
  const container = document.getElementById("map");

  const options = {
    center: new window.kakao.maps.LatLng(coords.LAT, coords.LNG),
    level: 3,
  };

  map.value = new window.kakao.maps.Map(container, options);

  // 초기 데이터 로드
  loadData();

  // 드래그 종료 시 새로운 중심좌표로 데이터 로드
  window.kakao.maps.event.addListener(map.value, "dragend", () => {
    loadData();
  });
};

/* ================= 감시자 (Watchers) ================= */

// 검색어 또는 반경이 변경될 때마다 데이터를 다시 불러옴
watch(
  () => [props.searchQuery, props.searchTagId, props.searchDist],
  ([query, tagId]) => {
    if (query) {
      fetchPlacesByQuery(centerLat.value, centerLng.value, query);
    } else if (tagId) {
      fetchPlacesByTag(centerLat.value, centerLng.value, tagId);
    }
  }
);
onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadKakaoMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_API_KEY}`;
    script.onload = () => {
      window.kakao.maps.load(loadKakaoMap);
    };
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
@import "/src/styles/Map.css";
#map {
  width: 100%;
  height: 100%;
}
</style>
