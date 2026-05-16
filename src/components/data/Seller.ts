import avatarImg from "../../assets/imgs/IconoPerfil.png";

export interface Seller {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
}

export const sellers: Seller[] = [
  {
    id: 1,
    name: "Alfredo Medrano Saravia",
    avatar: avatarImg,
    rating: 3.0,
    reviews: 50,
  },
];

