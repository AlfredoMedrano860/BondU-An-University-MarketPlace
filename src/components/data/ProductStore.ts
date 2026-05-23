import type { Product } from "./Product";
import type { Seller } from "./Seller";
import { products as initialProducts } from "./Product";
import { validateProduct } from "./ProductValidations";
export const MAX_PRODUCT_IMAGES = 3;

let products: Product[] = initialProducts.slice();
let nextId = initialProducts.length + 1;

export interface NewProductInput {
  name: string;
  price: number;
  state: string;
  image: string;
  gallery: string[];
  description: string;
  seller: Seller;
}

export type ProductResult = | { ok: true; product: Product } | { ok: false; error: string };

export function getProducts(): Product[] {
  return products;
}

export function getProductsByUser(userId: number): Product[] {
  return products.filter(p => p.seller.id === userId);
}

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
    description:input.description,
    seller: input.seller,
  };

  products = [product].concat(products);
  return { ok: true, product };
}

export function removeProduct(productId: number): void {
  products = products.filter(p => p.id !== productId);
}