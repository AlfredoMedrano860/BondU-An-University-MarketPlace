import { apiClient } from './api';
import type {
    ApiProduct,
    ApiProductImage,
    ApiProductCategory,
    ApiProductCondition,
    ApiProductStatus,
    CreateProductData,
    UpdateProductData,
} from '../types/product';

export const productsService = {
    async getAll(): Promise<ApiProduct[]> {
        const response = await apiClient.get<ApiProduct[]>('/products');
        return response.data;
    },

    async getById(id: string): Promise<ApiProduct> {
        const response = await apiClient.get<ApiProduct>(`/products/${id}`);
        return response.data;
    },

    async create(data: CreateProductData): Promise<ApiProduct> {
        const response = await apiClient.post<ApiProduct>('/products', data);
        return response.data;
    },

    async update(id: string, data: UpdateProductData): Promise<ApiProduct> {
        const response = await apiClient.put<ApiProduct>(`/products/${id}`, data);
        return response.data;
    },

    async remove(id: string): Promise<void> {
        await apiClient.delete(`/products/${id}`);
    },

    async sell(id: string): Promise<void> {
        await apiClient.patch(`/products/${id}/sell`);
    },

    // Imágenes
    async getImages(productId: string): Promise<ApiProductImage[]> {
        const response = await apiClient.get<ApiProductImage[]>(`/products/${productId}/images`);
        return response.data;
    },

    async uploadImage(productId: string, file: File): Promise<ApiProductImage> {
        const form = new FormData();
        form.append('image', file);
        const response = await apiClient.post<ApiProductImage>(`/products/${productId}/images`, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    async deleteImage(productId: string, imageId: string): Promise<void> {
        await apiClient.delete(`/products/${productId}/images/${imageId}`);
    },

    async setPrimaryImage(productId: string, imageId: string): Promise<void> {
        await apiClient.patch(`/products/${productId}/images/${imageId}/primary`);
    },

    // Catálogos
    async getCategories(): Promise<ApiProductCategory[]> {
        const response = await apiClient.get<ApiProductCategory[]>('/products/categories');
        return response.data;
    },

    async getConditions(): Promise<ApiProductCondition[]> {
        const response = await apiClient.get<ApiProductCondition[]>('/products/conditions');
        return response.data;
    },

    async getStatuses(): Promise<ApiProductStatus[]> {
        const response = await apiClient.get<ApiProductStatus[]>('/products/status');
        return response.data;
    },
};
