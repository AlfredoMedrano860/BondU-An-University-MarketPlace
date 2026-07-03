import { apiClient } from './api';
import type { ApiProduct } from '../types/product';

export const favoritesService = {
    async getByUser(userId: string): Promise<ApiProduct[]> {
        const response = await apiClient.get<ApiProduct[]>(`/users/${userId}/favorites`);
        return response.data;
    },

    async add(userId: string, productId: string): Promise<void> {
        await apiClient.post(`/users/${userId}/favorites`, { product_id: productId });
    },

    async remove(userId: string, productId: string): Promise<void> {
        await apiClient.delete(`/users/${userId}/favorites/${productId}`);
    },
};
