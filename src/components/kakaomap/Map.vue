<template>
  <div id="map"></div>
  
  <div class="coords-info">
    <h3>현재 지도 중심 좌표</h3>
    <div class="input-group">
      <label for="distInput">검색 반경(Km): </label>
      <input 
        id="distInput" 
        type="number" 
        v-model="dist" 
        @change="handleDistChange"
        step="0.1"
        min="0.1"
      />
    </div>
    <p>위도: **{{ centerLat.toFixed(6) }}**</p>
    <p>경도: **{{ centerLng.toFixed(6) }}**</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios'
const centerLat = ref(0);
const centerLng = ref(0);
const dist = ref(0.1);
const places = ref([]);
const emit = defineEmits(['update-places','update-center']);
const map = ref(null); 
const markers = ref([]);
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
const removeMarkers = () => {
    for (let i = 0; i < markers.value.length; i++) {
        markers.value[i].setMap(null);
    }   
    markers.value = [];
};

const displayMarkers = (placeList) => {
    if (!map.value) return;

    removeMarkers(); 

    for (let i = 0; i < placeList.length; i++) {
        const place = placeList[i];
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        
        const marker = new window.kakao.maps.Marker({
            map: map.value, 
            position: position,
            title: place.place_name, 
        });

        markers.value.push(marker);
        const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        });
        window.kakao.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.open(map.value, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', function() {
              infowindow.close();
        });
    }
};
const MOCK_PLACES = [
  {id:123, name: '제주도청', x: 126.514457, y: 33.486242 },
  {id:456, name: '제주공항', x: 126.493051, y: 33.507041 },
  {id:789, name: '한라산', x: 126.533281, y: 33.361665 },
];
  const fetchPlaces = async(lat,lng) => {
    /* 테스트용 후에 주석 제어해야함
    try{
      const baseUrl = import.meta.env.VITE_SERVER_URL;
      const url = `${baseUrl}/api/v1/place/getPlaces`
      const response = await axios.get(url,{
        params:{
          x: lng,
          y: lat,
          dist: dist.value
        }
      });
      emit('update-places',response.data);
      emit('update-center',{lat: lat, lng : lng, dist: dist.value});
      places.value = response.data;
      displayMarkers(places.value);

    }    catch(error){
      console.error("에러발생", error);
    }
    */
    console.log(`Mock: 중심 좌표 (Lat: ${lat}, Lng: ${lng})에서 반경 ${dist.value}Km로 장소 검색 시뮬레이션`);
    const mockResponse = MOCK_PLACES.map(place => ({
        ...place,
        y: lat + (place.y - DEFAULT_COORDS.LAT) * (dist.value / 10), 
        x: lng + (place.x - DEFAULT_COORDS.LNG) * (dist.value / 10),
    }));

    emit('update-places', mockResponse);
    emit('update-center', {lat: lat, lng : lng, dist: dist.value});
    places.value = mockResponse;
    displayMarkers(places.value);
  }

  const handleDistChange = () =>{
    if(centerLat.value && centerLng.value) {
      fetchPlaces(centerLat.value,centerLng.value);
    }
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

    const kakaoMap = new window.kakao.maps.Map(container, options);
    map.value = kakaoMap; 

    fetchPlaces(COORDS.LAT, COORDS.LNG); 
    window.kakao.maps.event.addListener(map.value, 'dragend', async () => {
        const latlng = map.value.getCenter(); 
        const lat = latlng.getLat();
        const lng = latlng.getLng();
        centerLat.value = lat;
        centerLng.value = lng;
        
        fetchPlaces(lat,lng);
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