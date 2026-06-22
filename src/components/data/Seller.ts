import avatarImg from "../../assets/imgs/IconoPerfil.png";
import type { User } from "./User";

export interface ContactInfo {
  bio: string;
  phone?: string;
  instagram?: string;
  telegram?: string;
}

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
  sales: number;
  contact?: ContactInfo;
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
    contact: {
      bio: "¡Pura vida desde Esparza! Vendo rápido y a buen precio, sin rodeos. Si ves algo que te llama la atención, escribime sin pensarlo dos veces. Siempre respondo.",
      phone: "+506 8812-3456",
      instagram: "alfre.esparza",
      telegram: "alfredo_m86",
    },
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
    contact: {
      bio: "¡Hola! Soy Camila. Estudiante de la UCR y vendedora comprometida con la calidad. Respondo de lunes a viernes en horario universitario. ¡Me da gusto ayudarte!",
      phone: "+506 7723-4567",
      instagram: "camirojas.cr",
      telegram: "camila_rojas",
    },
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
    contact: {
      bio: "Diego por acá. Del TEC, vendiendo de todo un poco. Para coordinar entrega o resolver dudas técnicas, Telegram es la vía más rápida. Respondo casi al instante.",
      phone: "+506 6634-5678",
      instagram: "diegoherreracr",
      telegram: "diego_h_tec",
    },
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
    contact: {
      bio: "¡Hola! Soy Vale. Vendo con cariño desde Heredia. Cada artículo sale con mucho amor, así que no dudes en escribirme, ¡con gusto te atiendo y coordinamos todo!",
      phone: "+506 5545-6789",
      instagram: "vale.cruz.una",
      telegram: "valentina_cruz",
    },
  },
];

export function getSellerById(id: number): Seller | undefined {
  return sellers.find(s => s.id === id);
}