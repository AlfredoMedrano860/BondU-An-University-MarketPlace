import avatarDefault from '../assets/imgs/IconoPerfil.png';
import type { ApiUser, ApiUserStats, ApiUserContact } from '../types/user';
import type { ApiProduct, ApiReview } from '../types/product';
import type { UserProfile } from '../components/data/UserProfile';
import type { Product } from '../components/data/Product';
import type { Review } from '../components/data/Review';
import type { Seller } from '../components/data/Seller';

export function apiUserToSeller(user: ApiUser, stats?: ApiUserStats | null): Seller {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: '',
        avatar: user.avatar ?? avatarDefault,
        location: user.location ?? '',
        createdAt: new Date(user.created_at),
        rating: Number(stats?.rating_avg ?? 0),
        reviews: stats?.review_count ?? 0,
        sales: stats?.sales_count ?? 0,
    };
}

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
        password: '',
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
            phone: user.phone ?? undefined,
            instagram: contact.instagram ?? undefined,
            telegram: contact.telegram ?? undefined,
        } : undefined,
    };
}

export function apiProductToProduct(
    product: ApiProduct,
    favoriteIds?: Set<string>,
): Product {
    const primaryImage =
        product.images?.find(i => i.is_primary)?.url ??
        product.images?.[0]?.url ??
        '';

    const gallery = product.images?.filter(i => !i.is_primary).map(i => i.url) ?? [];

    const seller: Seller = product.seller
        ? apiUserToSeller(product.seller as ApiUser)
        : {
              id: product.seller_id ?? '',
              username: 'Vendedor',
              email: '',
              password: '',
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
    };
}

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