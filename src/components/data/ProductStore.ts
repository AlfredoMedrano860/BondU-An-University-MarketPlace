import type { Product } from "./Product";
import type { Seller } from "./Seller";
import { products as initialProducts } from "./Product";
import { validateProduct } from "./ProductValidations";

/** Número máximo de imágenes permitidas por producto. */
export const maxProductImages = 3;

let products: Product[] = initialProducts.slice();
let nextId = initialProducts.length + 1;
const subscribers: Array<() => void> = [];

function notifySubscribers() {
  subscribers.forEach((s) => s());
}

/**
 * Datos necesarios para publicar un nuevo producto.
 * @see Product
 */
export interface NewProductInput {
  /** Nombre del producto. */
  name: string;
  /** Precio del producto en dólares. */
  price: number;
  /** Estado del producto (Nuevo / Usado). */
  state: string;
  /** URL de la imagen principal. */
  image: string;
  /** Lista de URLs de imágenes del producto. */
  gallery: string[];
  /** Descripción detallada del producto. */
  description: string;
  /** Vendedor que publica el producto. */
  seller: Seller;
}

/**
 * Resultado de una operación sobre un producto.
 * Retorna el producto si fue exitosa o un mensaje de error si falló.
 */
export type ProductResult = | { ok: true; product: Product } | { ok: false; error: string };

/**
 * Retorna todos los productos disponibles en el store.
 * @returns Lista completa de productos.
 */
export function getProducts(): Product[] {
  return products;
}

/**
 * Retorna los productos publicados por un usuario específico.
 * @param userId - ID del usuario vendedor.
 * @returns Lista de productos del usuario.
 */
export function getProductsByUser(userId: number): Product[] {
  return products.filter(p => p.seller.id === userId);
}

/**
 * Publica un nuevo producto en el store.
 *
 * Valida los datos con {@link validateProduct} antes de agregar.
 * El nuevo producto se inserta al inicio de la lista.
 *
 * @param input - Datos del producto a publicar.
 * @returns {@link ProductResult} con el producto creado o un mensaje de error.
 */
export function addProduct(input: NewProductInput): ProductResult {
  const error = validateProduct(input);
  if (error) return { ok: false, error };

  const product: Product = {
    id: nextId++,
    name: input.name,
    price: input.price,
    state: input.state,
    image: input.gallery[0],
    gallery: input.gallery,
    description: input.description,
    seller: input.seller,
    isFavorite: false,
  };

  products = [product].concat(products);
  notifySubscribers();
  return { ok: true, product };
}

/**
 * Elimina un producto del store por su ID.
 * @param productId - ID del producto a eliminar.
 */
export function removeProduct(productId: number): void {
  products = products.filter(p => p.id !== productId);
  notifySubscribers();
}

/**
 * Actualiza los datos de un producto existente.
 * @param productId - ID del producto a actualizar.
 * @param input - Campos a modificar (parcial).
 * @returns {@link ProductResult} con el producto actualizado o un mensaje de error.
 */
export function updateProduct(productId: number, input: Omit<NewProductInput, "seller">): ProductResult {
  const existing = products.find(p => p.id === productId);
  if (!existing) return { ok: false, error: "Producto no encontrado." };

  const merged: NewProductInput = { ...input, seller: existing.seller };
  const error = validateProduct(merged);
  if (error) return { ok: false, error };

  const updated: Product = {
    ...existing,
    name: input.name,
    price: input.price,
    state: input.state,
    image: input.gallery[0],
    gallery: input.gallery,
    description: input.description,
  };

  products = products.map(p => p.id === productId ? updated : p);
  notifySubscribers();
  return { ok: true, product: updated };
}

/**
 * Invierte el estado de favorito de un producto.
 * Reconstruye el objeto completo para mantener inmutabilidad.
 *
 * @param productId - ID del producto a modificar.
 */
export function toggleFavorite(productId: number): void {
  products = products.map(p => {
    if (p.id !== productId) return p;

    const updated: Product = {
      id: p.id,
      name: p.name,
      price: p.price,
      state: p.state,
      image: p.image,
      gallery: p.gallery,
      description: p.description,
      seller: p.seller,
      isFavorite: !p.isFavorite,
    };

    return updated;
  });
  notifySubscribers();
}

/**
 * Retorna los productos marcados como favoritos por el usuario.
 * @returns Lista de productos con `isFavorite` en `true`.
 */
export function getFavorites(): Product[] {
  return products.filter(p => p.isFavorite);
}

/**
 * Subscribe to store changes. Returns an unsubscribe function.
 */
export function subscribeProducts(cb: () => void) {
  subscribers.push(cb);
  return () => {
    const idx = subscribers.indexOf(cb);
    if (idx >= 0) subscribers.splice(idx, 1);
  };
}