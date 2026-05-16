import Producto from "../../assets/imgs/AudifonoProducto.png";
import itemProduct from "../../assets/imgs/AudifonosGallery1.png";
import itemProduct2 from "../../assets/imgs/AudifonosGallery2.png";
import itemProduct3 from "../../assets/imgs/AudifonosGallery3.png";
import type { Seller } from "./Seller";
import { sellers } from "./Seller";


export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  seller: Seller;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Audífonos",
    price: 60,
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description:
      "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
  },
  {
    id: 2,
    name: "Audífonos",
    price: 60,
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description:
      "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
  },
  {
    id: 3,
    name: "Audífonos",
    price: 60,
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description:
      "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
  },
  {
    id: 4,
    name: "Audífonos",
    price: 60,
    image: Producto,
    gallery: [itemProduct, itemProduct2, itemProduct3],
    description:
      "Audífonos inalámbricos negros con diseño moderno y acabado minimalista. Cuentan con almohadillas cómodas para uso prolongado y diadema ajustable para mejor adaptación.",
    seller: sellers[0],
  },
];