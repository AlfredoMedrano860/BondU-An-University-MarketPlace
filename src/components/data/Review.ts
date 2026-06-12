import reviewerAvatar from "../../assets/imgs/IconoPerfil.png";

export interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

export const sellerReviews: Review[] = [
  {
    id: 1,
    name: "Sophia Kane",
    avatar: reviewerAvatar,
    rating: 4,
    text: "Muy buen vendedor, llegó a tiempo y el producto estaba tal cual.",
  },
  {
    id: 2,
    name: "Aaron Mayorga",
    avatar: reviewerAvatar,
    rating: 5,
    text: "Excelente comunicación y producto en perfectas condiciones.",
  },
  {
    id: 3,
    name: "Alfredo Medrano",
    avatar: reviewerAvatar,
    rating: 3,
    text: "Todo bien, aunque el envío tardó un poco más de lo esperado.",
  },
];
