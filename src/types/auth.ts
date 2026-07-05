import type { ApiUser } from './user';

/** Usuario autenticado, tal como lo devuelve el backend en login/registro. Misma forma que {@link ApiUser}. */
export type AuthUser = ApiUser;

/** Credenciales enviadas al iniciar sesión. */
export interface LoginCredentials {
    email: string;
    password: string;
}

/** Datos enviados al registrar una cuenta nueva. */
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
    university?: string;
    career?: string;
}

/** Respuesta del backend al iniciar sesión. */
export interface LoginResponse {
    message: string;
    user: AuthUser;
    token: string;
}

/** Respuesta del backend al registrarse. */
export interface RegisterResponse {
    message: string;
    token: string;
    user: AuthUser;
}

/** Datos enviados para solicitar la recuperación de contraseña. */
export interface ForgotPasswordRequest {
    email: string;
}

/** Respuesta del backend al solicitar la recuperación de contraseña. */
export interface ForgotPasswordResponse {
    message: string;
    resetToken: string;
}

/** Datos enviados para completar el cambio de contraseña. */
export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
}

/** Respuesta del backend al completar el cambio de contraseña. */
export interface ResetPasswordResponse {
    message: string;
}

/** Forma del contexto de autenticación expuesto por {@link useAuthContext}. */
export interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
}
