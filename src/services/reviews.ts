import { apiClient } from './api';
import type { ApiReview, CreateReviewData } from '../types/product';

/** Cliente HTTP para reseñas. */
export const reviewsService = {
    /** POST /reviews → crea una reseña. */
    async create(data: CreateReviewData): Promise<ApiReview> {
        const response = await apiClient.post<ApiReview>('/reviews', data);
        return response.data;
    },
};
