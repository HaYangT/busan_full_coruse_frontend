<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';

const loadKakaoMap = () => {
  const container = document.getElementById('map'); 

  const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표 (현재 사용자의 위치로 고정 예정)
    level: 3 // 지도의 확대 레벨
  };

  new window.kakao.maps.Map(container, options); 
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
#map {
  width: 100%;
  height: 400px; 
}
</style>