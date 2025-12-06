<template>
  <div id="map"></div>
  
  <div class="coords-info">
    <h3>현재 지도 중심 좌표</h3>
    <p>위도: **{{ centerLat.toFixed(6) }}**</p>
    <p>경도: **{{ centerLng.toFixed(6) }}**</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const centerLat = ref(0);
const centerLng = ref(0);

const DEFAULT_COORDS = {
    LAT: 33.450701, 
    LNG: 126.570667,
};

const getCurrentLocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      resolve(DEFAULT_COORDS);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          LAT: position.coords.latitude,
          LNG: position.coords.longitude,
        });
      },
      (error) => {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        resolve(DEFAULT_COORDS);
      },
      {
        timeout: 5000, 
      }
    );
  });
};

const loadKakaoMap = async () => {
  const COORDS = await getCurrentLocation();
  const container = document.getElementById('map');

  centerLat.value = COORDS.LAT;
  centerLng.value = COORDS.LNG;

  const options = {
    center: new window.kakao.maps.LatLng(COORDS.LAT, COORDS.LNG),
    level: 3
  };

  const map = new window.kakao.maps.Map(container, options);

  window.kakao.maps.event.addListener(map, 'dragend', () => {
    const latlng = map.getCenter();
    centerLat.value = latlng.getLat();
    centerLng.value = latlng.getLng();
    /*
    여기에 거리별로 불러오는 쿼리 날려야함
    */
    console.log(`변경된 지도 중심좌표: 위도 ${centerLat.value}, 경도 ${centerLng.value}`);
  });
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadKakaoMap();
  } else {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${import.meta.env.VITE_KAKAO_API_KEY}`;
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        loadKakaoMap();
      });
    };
    
    document.head.appendChild(script);
  }
});
</script>

<style scoped>
@import '/src/styles/Map.css';
</style>