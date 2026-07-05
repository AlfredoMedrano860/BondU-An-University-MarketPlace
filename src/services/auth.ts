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

/** Cliente HTTP para autenticación: login, registro y recuperación de contraseña. */
export const authService = {
    /** POST /auth/login → inicia sesión y devuelve el token. */
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    /** POST /auth/register → crea una cuenta y devuelve el token. */
    async register(data: RegisterData): Promise<RegisterResponse> {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        return response.data;
    },

    /** POST /auth/forgot-password → genera un token de recuperación para el correo dado. */
    async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
        const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', data);
        return response.data;
    },

    /** POST /auth/reset-password → aplica la nueva contraseña usando el token de recuperación. */
    async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', data);
        return response.data;
    },
};
