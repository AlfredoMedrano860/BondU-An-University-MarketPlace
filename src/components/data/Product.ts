import Producto from "../../assets/imgs/AudifonoProducto.png";
import itemProduct from "../../assets/imgs/AudifonosGallery1.png";
import itemProduct2 from "../../assets/imgs/AudifonosGallery2.png";
import itemProduct3 from "../../assets/imgs/AudifonosGallery3.png";
import type { Seller } from "./Seller";
import { sellers } from "./Seller";

/**
 * Producto publicado en el marketplace.
 * @see Seller
 */
export interface Product {
  /** Identificador único del producto. */
  id: number;
  /** Nombre del producto. */
  name: string;
  /** Precio del producto en dólares. */
  price: number;
  /** Estado del producto (Nuevo / Usado). */
  state: string;
  /** URL de la imagen principal, equivalente a `gallery[0]`. */
  image: string;
  /** Lista de URLs de imágenes del producto. */
  gallery: string[];
  /** Descripción detallada del producto. */
  description: string;
  /** Vendedor que publicó el producto. */
  seller: Seller;
  /** Indica si el usuario lo marcó como favorito. */
  isFavorite: boolean;
}

/**
 * Productos de muestra para desarrollo.
 * Reemplazar con datos reales del backend cuando esté disponible.
 */
export const products: Product[] = [
  {
    id: 1,
    name: "Audífonos",
    price: 60,
    state: "Nuevo",
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description: "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
    isFavorite: false,
  },
  {
    id: 2,
    name: "Audífonos",
    price: 60,
    state: "Usado",
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description: "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
    isFavorite: false,
  },
  {
    id: 3,
    name: "Audífonos",
    price: 60,
    state: "Nuevo",
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description: "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
    isFavorite: false,
  },
  {
    id: 4,
    name: "Audífonos",
    price: 60,
    state: "Usado",
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description: "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
    isFavorite: false,
  },
];