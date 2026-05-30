import { useState } from "react";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";

import ProductGrid from "../templates/ProductGrid";

import CommentHeader from "./CommentHeader";
import { getFavorites, toggleFavorite } from "../data/ProductStore";

type Choice = "contacto" | "productos" | "reseñas";

interface ProfileInfoProps {
  choice: Choice;
  currentUser: UserProfile;
}

function ProfileInfo({ currentUser, choice }: ProfileInfoProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Product[]>(getFavorites());

    const handleToggleFavorite = (product: Product) => {
      toggleFavorite(product.id);
      setFavorites(getFavorites());
    };
    
  return (
    <div>
      {choice === "contacto" && (
        <>
        <div className="bg-white px-6 pt-4 pb-4 rounded-2xl m-4 flex items-center justify-center">

          <p className="m-1 text-[12px] text-gray-400">
            Estafa
        </p>
        </div>
        </>
      )}

      {choice === "productos" && (
        <ProductGrid
            products={favorites}
            onBuy={setSelectedProduct}
            onToggleFavorite={handleToggleFavorite}
          />
      )}

      {choice === "reseñas" && (
        <CommentHeader
            name={currentUser.username}
            avatar={currentUser.avatar}
          />
      )}
    </div>
  );
}

interface ProfileProps {
  currentUser: UserProfile;
}

export default function Profile({ currentUser }: ProfileProps) {
  const [choice, setChoice] = useState<Choice>("contacto");

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex gap-2 justify-between">
        <button
          onClick={() => setChoice("contacto")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border
            border-white rounded-3xl text-white bg-[#9BAB00] text-[18px]"
        >
          Contactos
        </button>

        <button
          onClick={() => setChoice("productos")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border
            border-white rounded-3xl text-white bg-[#9BAB00] text-[18px]"
        >
          Productos
        </button>

        <button
          onClick={() => setChoice("reseñas")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border
          border-white rounded-3xl text-white bg-[#9BAB00] text-[18px]"
        >
          Reseñas
        </button>
      </div>

      <ProfileInfo
        choice={choice}
        currentUser={currentUser}
      />
    </div>
  );
}