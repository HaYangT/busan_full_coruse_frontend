import axios from 'axios';

const api = axios.create({
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
    const originalRequest = error.config;

    // 401 error
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem('refreshToken');
            
            // 엔드포인트로 새 토큰 요청
            const baseUrl = import.meta.env.VITE_SERVER_URL;
            const res = await axios.post(`${baseUrl}/api/v1/auth/refresh`, {
                refreshToken: refreshToken
            });
            console.log("refresh token");

            if (res.status === 200) {
                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // 재시도
                console.log("재시도")
                return api(originalRequest);
            }
            } catch (refreshError) {
                // Refresh Token도 만료되었거나 오류가 난 경우
                console.error('세션이 만료되었습니다. 다시 로그인해주세요.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;