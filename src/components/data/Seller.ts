import avatarImg from "../../assets/imgs/IconoPerfil.png";
import type { User } from "./User";

/**
 * Vendedor de un producto en el marketplace.
 * Extiende {@link User} con datos de reputación.
 */
export interface Seller extends User {
  /** Calificación promedio del vendedor entre 0 y 5. */
  rating: number;
  /** Número total de reseñas recibidas. */
  reviews: number;
}

/**
 * Vendedores de muestra para desarrollo.
 * Reemplazar con datos reales del backend cuando esté disponible.
 */
export const sellers: Seller[] = [
  {
    id: 1,
    username: "Alfredo Medrano",
    email: "mc.alfredomedra@gmail.com",
    password: "",
    avatar: avatarImg,
    createdAt: new Date("2024-01-15"),
    rating: 3.0,
    reviews: 50,
  },
];