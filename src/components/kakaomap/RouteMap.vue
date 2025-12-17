<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

let map = null
let markers = []
let polyline = null

const loadMap = () => {
  if (!window.kakao || !window.kakao.maps) return

  const container = document.getElementById('route-map')
  if (!container) return

  const first = props.items[0]
  const center = first
    ? new window.kakao.maps.LatLng(first.y, first.x)
    : new window.kakao.maps.LatLng(37.5665, 126.9780)

  map = new window.kakao.maps.Map(container, {
    center,
    level: 5
  })

  drawRoute()
}

const drawRoute = () => {
  if (!map || !window.kakao || !window.kakao.maps) return
  if (!props.items.length) return

  markers.forEach(m => m.setMap(null))
  markers = []

  if (polyline) {
    polyline.setMap(null)
    polyline = null
  }

  const path = [...props.items]
    .sort((a, b) => a.order - b.order)
    .map(item => {
      const pos = new window.kakao.maps.LatLng(item.y, item.x)

      const marker = new window.kakao.maps.Marker({
        map,
        position: pos,
        title: `${item.order}. ${item.name}`
      })

      markers.push(marker)
      return pos
    })

  polyline = new window.kakao.maps.Polyline({
    path,
    strokeWeight: 4,
    strokeColor: '#2563eb',
    strokeOpacity: 0.8
  })

  polyline.setMap(map)
}
watch(
  () => props.items,
  (items) => {
    if (!items.length) return

    if (!map) {
      loadMap()
    } else {
      drawRoute()
    }
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  if (props.items.length && window.kakao?.maps) {
    loadMap()
  }
})
</script>


<style scoped>
#route-map {
  width: 100%;
  height: 400px;
}
</style>
