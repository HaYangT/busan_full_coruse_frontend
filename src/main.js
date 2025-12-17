import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useKakao } from 'vue3-kakao-maps'
const { VITE_KAKAO_API_KEY } = import.meta.env
const app = createApp(App)
useKakao()
app.use(createPinia(VITE_KAKAO_API_KEY))
app.use(router)
app.mount('#app')


