import type { AuthUser } from "./auth";

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
    /** Populated by JOIN when fetching full product data. */
    seller?: AuthUser | null;
    condition?: { condition_id: string; name_condition: string } | null;
    images?: ApiProductImage[];
}

export interface ApiProductImage {
    id: string;
    product_id: string;
    url: string;
    is_primary: boolean;
    created_at: string;
}

export interface ApiProductCategory {
    category_id: string;
    name_category: string;
}

export interface ApiProductCondition {
    condition_id: string;
    name_condition: string;
}

export interface ApiProductStatus {
    status_id: string;
    name_status: string;
}

export interface CreateProductData {
    name: string;
    description: string;
    price: number;
    seller_id?: string;
    condition_id?: string;
    status_id?: string;
}

export interface UpdateProductData {
    name?: string;
    description?: string;
    price?: number;
    condition_id?: string;
    status_id?: string;
}
