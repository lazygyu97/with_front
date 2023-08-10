import axios from 'axios';
import Cookies from 'js-cookie';


const instance = axios.create({
    baseURL: "http://localhost:8080/api", // baseURL 설정
    // 기타 필요한 설정 추가
});

instance.interceptors.request.use(
    (config) => {
        // accessToken 추가
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }

        // refreshToken 추가
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            config.headers['RefreshToken'] = refreshToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;