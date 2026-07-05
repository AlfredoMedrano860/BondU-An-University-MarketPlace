/** Usuario tal como lo devuelve el backend. */
export interface ApiUser {
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

/** Estadísticas de un usuario (ventas, calificación, reseñas). */
export interface ApiUserStats {
    id: string;
    user_id: string;
    rating_avg: string | null;
    review_count: number;
    sales_count: number;
    updated_at: string;
}

/** Preferencias de idioma y notificaciones de un usuario. */
export interface ApiUserPreferences {
    id: string;
    user_id: string;
    language: string;
    notifications: boolean;
}

/** Información de contacto (bio, Instagram, Telegram) de un usuario. */
export interface ApiUserContact {
    id: string;
    user_id: string;
    bio: string | null;
    instagram: string | null;
    telegram: string | null;
    updated_at: string;
}

/** Datos enviados al editar un usuario. */
export interface UpdateUserData {
    username?: string;
    email?: string;
    avatar?: string;
    phone?: string;
    location?: string;
    university?: string;
    career?: string;
}
