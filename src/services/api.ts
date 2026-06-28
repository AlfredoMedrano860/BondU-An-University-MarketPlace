import axios from 'axios';
import { tokenStorage } from '../utils/token';

const API_BASE_URL = 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url ?? '';
        if (error.response?.status === 401 && !url.startsWith('/auth/')) {
            tokenStorage.clear();
            window.dispatchEvent(new Event('bondu:unauthorized'));
        }
        return Promise.reject(error);
    }
);
