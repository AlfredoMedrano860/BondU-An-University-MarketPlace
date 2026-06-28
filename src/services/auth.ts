import { apiClient } from './api';
import type {
    LoginCredentials,
    LoginResponse,
    RegisterData,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from '../types/auth';

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
        const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', data);
        return response.data;
    },

    async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', data);
        return response.data;
    },
};
