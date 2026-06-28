export interface AuthUser {
    id: string;
    username: string;
    email: string;
    avatar: string | null;
    phone: string | null;
    location: string | null;
    university: string | null;
    career: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
    university?: string;
    career?: string;
}

export interface LoginResponse {
    message: string;
    user: AuthUser;
    token: string;
}

export interface RegisterResponse {
    message: string;
    token: string;
    user: AuthUser;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    message: string;
    resetToken: string;
}

export interface ResetPasswordRequest {
    resetToken: string;
    newPassword: string;
}

export interface ResetPasswordResponse {
    message: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    updateUser: (user: AuthUser) => void;
}
