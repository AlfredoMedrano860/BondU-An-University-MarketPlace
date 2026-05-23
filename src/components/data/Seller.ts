import avatarImg from "../../assets/imgs/IconoPerfil.png";
import type { User } from "./User";

export interface Seller extends User {
  rating: number;
  reviews: number;
}

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