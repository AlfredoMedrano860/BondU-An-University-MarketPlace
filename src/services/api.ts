import axios from 'axios';
import { tokenStorage } from '../utils/token';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Cliente HTTP compartido por todos los servicios.
 * Inyecta el token de autenticación en cada request y, ante un 401 en un
 * endpoint que no sea de auth, limpia la sesión y emite `bondu:unauthorized`
 * (escuchado por {@link useAuthContext} para desloguear al usuario).
 */
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
