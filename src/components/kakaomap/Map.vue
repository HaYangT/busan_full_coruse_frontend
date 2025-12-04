<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';

const getCurrentLocation = () =>{
    return new Promise((resolve)=>{
        if(!navigator.geolocation){
            console.error("에러 발생");
            resolve(COORDS);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (positon) =>{
                resolve({
                    LAT : positon.coords.latitude,
                    LNG: positon.coords.longitude,
                },
                {
                    timeout: 5000, //타임아웃
                }
            )
            }
        )
    })
}

const loadKakaoMap = async () => {
  const COORDS = await getCurrentLocation();
  const container = document.getElementById('map'); 
  const options = {
    center: new window.kakao.maps.LatLng(COORDS.LAT,COORDS.LNG), // 지도의 중심좌표
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