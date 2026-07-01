import avatarDefault from '../assets/imgs/IconoPerfil.png';
import type { AuthUser } from '../types/auth';
import type { ApiProduct } from '../types/product';
import type { Product } from '../components/data/Product';
import type { Seller } from '../components/data/Seller';

export function apiUserToSeller(user: AuthUser): Seller {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: '',
        avatar: user.avatar ?? avatarDefault,
        location: user.location ?? '',
        createdAt: new Date(user.created_at),
        rating: 0,
        reviews: 0,
        sales: 0,
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
        ? apiUserToSeller(product.seller)
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
