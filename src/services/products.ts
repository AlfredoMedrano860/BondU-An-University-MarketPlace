import { apiClient } from './api';
import type {
    ApiProduct,
    ApiProductImage,
    ApiProductCondition,
    CreateProductData,
    UpdateProductData,
} from '../types/product';

/** Cliente HTTP para productos, sus imágenes y catálogo de condiciones. */
export const productsService = {
    /** GET /products → todos los productos del marketplace. */
    async getAll(): Promise<ApiProduct[]> {
        const response = await apiClient.get<ApiProduct[]>('/products');
        return response.data;
    },

    /** POST /products → crea un producto nuevo. */
    async create(data: CreateProductData): Promise<ApiProduct> {
        const response = await apiClient.post<ApiProduct>('/products', data);
        return response.data;
    },

    /** PUT /products/:id → edita un producto existente. */
    async update(id: string, data: UpdateProductData): Promise<ApiProduct> {
        const response = await apiClient.put<ApiProduct>(`/products/${id}`, data);
        return response.data;
    },

    /** DELETE /products/:id → elimina un producto. */
    async remove(id: string): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    },

    /** PATCH /products/:id/sell → marca un producto como vendido. */
    async sell(id: string): Promise<void> {
        await apiClient.patch(`/products/${id}/sell`);
    },

    /** POST /products/:id/images → sube una imagen (FormData porque es un archivo). */
    async uploadImage(productId: string, file: File): Promise<ApiProductImage> {
        const form = new FormData();
        form.append('image', file);
        const response = await apiClient.post<ApiProductImage>(`/products/${productId}/images`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /** PATCH /products/:id/images/:imageId/primary → marca una imagen como principal. */
    async setPrimaryImage(productId: string, imageId: string): Promise<void> {
        await apiClient.patch(`/products/${productId}/images/${imageId}/primary`);
    },

    /** GET /products/conditions → catálogo de condiciones (Nuevo, Usado, Detalle). */
    async getConditions(): Promise<ApiProductCondition[]> {
        const response = await apiClient.get<ApiProductCondition[]>('/products/conditions');
        return response.data;
    },
};
