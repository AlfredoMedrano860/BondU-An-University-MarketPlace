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
  //numero de ventas realizadas
  sales: number
}

/**
 * Vendedores de muestra para desarrollo.
 * Reemplazar con datos reales del backend cuando esté disponible.
 * IDs reservados: 1–9. Los usuarios registrados comienzan en ID 100 para evitar colisiones.
 */
export const sellers: Seller[] = [
  {
    id: 1,
    username: "Alfredo Medrano",
    email: "mc.alfredomedra@gmail.com",
    location: "Esparza, Puntarenas",
    password: "",
    avatar: avatarImg,
    createdAt: new Date(),
    rating: 3.0,
    reviews: 50,
    sales: 40,
  },
  {
    id: 2,
    username: "Camila Rojas",
    email: "camila.rojas@ucr.ac.cr",
    location: "San José, Costa Rica",
    password: "",
    avatar: avatarImg,
    createdAt: new Date(),
    rating: 4.5,
    reviews: 28,
    sales: 22,
  },
  {
    id: 3,
    username: "Diego Herrera",
    email: "diego.herrera@tec.ac.cr",
    location: "Cartago, Costa Rica",
    password: "",
    avatar: avatarImg,
    createdAt: new Date(),
    rating: 4.0,
    reviews: 15,
    sales: 11,
  },
  {
    id: 4,
    username: "Valentina Cruz",
    email: "valentina.cruz@una.ac.cr",
    location: "Heredia, Costa Rica",
    password: "",
    avatar: avatarImg,
    createdAt: new Date(),
    rating: 5.0,
    reviews: 8,
    sales: 7,
  },
];