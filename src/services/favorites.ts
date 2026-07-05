import { apiClient } from './api';
import type { ApiProduct } from '../types/product';

/** Cliente HTTP para los productos favoritos de un usuario. */
export const favoritesService = {
    /** GET /users/:id/favorites → productos favoritos del usuario. */
    async getByUser(userId: string): Promise<ApiProduct[]> {
        const response = await apiClient.get<ApiProduct[]>(`/users/${userId}/favorites`);
        return response.data;
    },

    /** POST /users/:id/favorites → agrega un producto a favoritos. */
    async add(userId: string, productId: string): Promise<void> {
        await apiClient.post(`/users/${userId}/favorites`, { product_id: productId });
    },

    /** DELETE /users/:id/favorites/:productId → quita un producto de favoritos. */
    async remove(userId: string, productId: string): Promise<void> {
        await apiClient.delete(`/users/${userId}/favorites/${productId}`);
    },
};
