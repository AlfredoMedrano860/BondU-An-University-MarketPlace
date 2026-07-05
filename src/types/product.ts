import type { ApiUser } from './user';

/** Producto tal como lo devuelve el backend. */
export interface ApiProduct {
    product_id: string;
    name: string;
    description: string;
    price: number;
    seller_id: string | null;
    condition_id: string | null;
    status_id: string | null;
    created_at: string;
    updated_at: string;
    /** Poblado por JOIN al pedir el producto completo. */
    seller?: ApiUser | null;
    condition?: { condition_id: string; name_condition: string } | null;
    status?: ApiProductStatus | null;
    images?: ApiProductImage[];
}

/** Estado de disponibilidad de un producto (Disponible, Vendido) del catálogo del backend. */
export interface ApiProductStatus {
    status_id: string;
    name_status: string;
}

/** Imagen de un producto tal como la devuelve el backend. */
export interface ApiProductImage {
    id: string;
    product_id: string;
    url: string;
    /** `true` si es la imagen principal del producto. Solo una por producto. */
    is_primary: boolean;
    created_at: string;
}

/** Condición de un producto (Nuevo, Usado, Detalle) del catálogo del backend. */
export interface ApiProductCondition {
    condition_id: string;
    name_condition: string;
}

/** Datos enviados al crear un producto. */
export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    seller_id?: string;
    condition_id?: string;
    status_id?: string;
}

/** Datos enviados al editar un producto. */
export interface UpdateProductData {
    name?: string;
    description?: string;
    price?: number;
    condition_id?: string;
    status_id?: string;
}

/** Reseña tal como la devuelve el backend. */
export interface ApiReview {
    id: string;
    reviewer_id: string;
    seller_id: string;
    rating: string;
    comment: string | null;
    created_at: string;
    updated_at: string;
    reviewer?: Pick<ApiUser, 'id' | 'username' | 'email' | 'avatar' | 'created_at' | 'updated_at'> | null;
}

/** Datos enviados al crear una reseña. */
export interface CreateReviewData {
    reviewer_id: string;
    seller_id: string;
    rating: number;
    comment?: string;
}
