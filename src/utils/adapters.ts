import avatarDefault from '../assets/imgs/IconoPerfil.webp';
import type { ApiUser, ApiUserStats, ApiUserContact } from '../types/user';
import type { ApiProduct, ApiReview } from '../types/product';
import type { UserProfile } from '../components/data/UserProfile';
import type { Product } from '../components/data/Product';
import type { Review } from '../components/data/Review';
import type { Seller } from '../components/data/Seller';

/**
 * Convierte un usuario del API al formato {@link Seller} usado por las pantallas.
 * @param user - Usuario tal como lo devuelve el backend.
 * @param stats - Estadísticas del usuario (ventas, calificación, reseñas), si se cargaron.
 */
function apiUserToSeller(user: ApiUser, stats?: ApiUserStats | null): Seller {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? avatarDefault,
        location: user.location ?? '',
        createdAt: new Date(user.created_at),
        rating: Number(stats?.rating_avg ?? 0),
        reviews: stats?.review_count ?? 0,
        sales: stats?.sales_count ?? 0,
    };
}

/**
 * Convierte un usuario del API al formato {@link UserProfile} usado por las pantallas,
 * combinando estadísticas, preferencias e información de contacto opcionales.
 * @param user - Usuario tal como lo devuelve el backend.
 * @param stats - Estadísticas del usuario, si se cargaron.
 * @param preferences - Preferencias de idioma/notificaciones, si se cargaron.
 * @param contact - Información de contacto, si se cargó.
 */
export function apiUserToProfile(
    user: ApiUser,
    stats?: ApiUserStats | null,
    preferences?: { notifications?: boolean; language?: string } | null,
    contact?: ApiUserContact | null,
): UserProfile {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? avatarDefault,
        location: user.location ?? '',
        createdAt: new Date(user.created_at),
        university: user.university ?? undefined,
        career: user.career ?? undefined,
        phone: user.phone ?? undefined,
        rating: Number(stats?.rating_avg ?? 0),
        reviews: stats?.review_count ?? undefined,
        sales: stats?.sales_count ?? undefined,
        notifications: preferences?.notifications ?? undefined,
        language: (preferences?.language as 'es' | 'en') ?? undefined,
        contact: contact ? {
            bio: contact.bio ?? '',
            instagram: contact.instagram ?? undefined,
            telegram: contact.telegram ?? undefined,
        } : undefined,
    };
}

/**
 * Convierte un producto del API al formato {@link Product} usado por las pantallas.
 * La imagen principal (`is_primary`) queda siempre en `gallery[0]`.
 * @param product - Producto tal como lo devuelve el backend.
 * @param favoriteIds - IDs de productos favoritos del usuario actual, para marcar `isFavorite`.
 */
export function apiProductToProduct(
    product: ApiProduct,
    favoriteIds?: Set<string>,
): Product {
    const images = product.images ?? [];
    const primary = images.find(i => i.is_primary) ?? images[0];
    const primaryImage = primary?.url ?? '';

    const gallery = primary
        ? [primary.url].concat(images.filter(i => i.id !== primary.id).map(i => i.url))
        : [];

    const seller: Seller = product.seller
        ? apiUserToSeller(product.seller as ApiUser)
        : {
              id: product.seller_id ?? '',
              username: 'Vendedor',
              email: '',
              avatar: avatarDefault,
              location: '',
              createdAt: new Date(),
              rating: 0,
              reviews: 0,
              sales: 0,
          };

    return {
        id: product.product_id,
        name: product.name,
        price: product.price,
        state: product.condition?.name_condition ?? '',
        image: primaryImage,
        gallery,
        description: product.description,
        seller,
        isFavorite: favoriteIds ? favoriteIds.has(product.product_id) : false,
        status: product.status?.name_status ?? '',
    };
}

/**
 * Convierte una reseña del API al formato {@link Review} usado por las pantallas.
 * @param review - Reseña tal como la devuelve el backend.
 */
export function apiReviewToReview(review: ApiReview): Review {
    return {
        id: review.id,
        reviewerId: review.reviewer_id,
        name: review.reviewer?.username ?? 'Usuario',
        avatar: review.reviewer?.avatar ?? avatarDefault,
        rating: Number(review.rating),
        text: review.comment ?? '',
    };
}