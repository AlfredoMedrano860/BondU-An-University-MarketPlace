import { apiClient } from './api';
import type { ApiUser, ApiUserStats, ApiUserPreferences, ApiUserContact, UpdateUserData } from '../types/user';
import type { ApiProduct, ApiReview } from '../types/product';


export const usersService = {
    // GET /users  → todos los usuarios
    async getAll(): Promise<ApiUser[]> {
        const response = await apiClient.get<ApiUser[]>('/users');
        return response.data;
    },

    // GET /users/:id  → un usuario específico
    async getById(id: string): Promise<ApiUser> {
        const response = await apiClient.get<ApiUser>(`/users/${id}`);
        return response.data;
    },

    // PUT /users/:id  → actualiza datos del usuario (nombre, email, universidad, etc.)
    async update(id: string, data: UpdateUserData): Promise<ApiUser> {
        const response = await apiClient.put<ApiUser>(`/users/${id}`, data);
        return response.data;
    },

    // PATCH /users/:id/avatar  → sube una foto de perfil
    // Usa FormData porque es un archivo, igual que uploadImage de productos
    async uploadAvatar(id: string, file: File): Promise<ApiUser> {
        const form = new FormData();
        form.append('avatar', file);
        const response = await apiClient.patch<ApiUser>(`/users/${id}/avatar`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // DELETE /users/:id  → elimina la cuenta
    async remove(id: string): Promise<void> {
        await apiClient.delete(`/users/${id}`);
    },

    // GET /users/:id/products  → productos publicados por el usuario
    async getProducts(userId: string): Promise<ApiProduct[]> {
        const response = await apiClient.get<ApiProduct[]>(`/users/${userId}/products`);
        return response.data;
    },

    // GET /users/:id/reviews  → reseñas recibidas por el usuario
    async getReviews(userId: string): Promise<ApiReview[]> {
        const response = await apiClient.get<ApiReview[]>(`/users/${userId}/reviews`);
        return response.data;
    },

    // GET /users/stats/:id  → ventas, calificación promedio, conteo de reseñas
    async getStats(userId: string): Promise<ApiUserStats> {
        const response = await apiClient.get<ApiUserStats>(`/users/stats/${userId}`);
        return response.data;
    },

    // GET /users/contact/:id  → bio, instagram, telegram
    async getContact(userId: string): Promise<ApiUserContact> {
        const response = await apiClient.get<ApiUserContact>(`/users/contact/${userId}`);
        return response.data;
    },

    // PUT /users/contact/:id  → actualiza bio, instagram, telegram
    async updateContact(
        userId: string,
        data: Partial<Pick<ApiUserContact, 'bio' | 'instagram' | 'telegram'>>
    ): Promise<ApiUserContact> {
        const response = await apiClient.put<ApiUserContact>(`/users/contact/${userId}`, data);
        return response.data;
    },

    // GET /users/preferences/:id  → idioma y notificaciones guardados
    async getPreferences(userId: string): Promise<ApiUserPreferences> {
        const response = await apiClient.get<ApiUserPreferences>(`/users/preferences/${userId}`);
        return response.data;
    },

    // PUT /users/preferences/:id  → guarda idioma y notificaciones
    async updatePreferences(
        userId: string,
        data: Partial<ApiUserPreferences>
    ): Promise<ApiUserPreferences> {
        const response = await apiClient.put<ApiUserPreferences>(`/users/preferences/${userId}`, data);
        return response.data;
    },
};