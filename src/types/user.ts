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

export interface ApiUserStats {
    id: string;
    user_id: string;
    rating_avg: string | null;
    review_count: number;
    sales_count: number;
    updated_at: string;
}

export interface ApiUserPreferences {
    id: string;
    user_id: string;
    language: string;
    notifications: boolean;
}

export interface ApiUserContact {
    id: string;
    user_id: string;
    bio: string | null;
    instagram: string | null;
    telegram: string | null;
    updated_at: string;
}

export interface UpdateUserData {
    username?: string;
    email?: string;
    avatar?: string;
    phone?: string;
    location?: string;
    university?: string;
    career?: string;
}
