import { useState, useEffect } from "react";
import type { Product } from "../data/Product";
import type { UserProfile } from "../data/UserProfile";

import CommentHeader from "./CommentHeader";
import EmptyState from "../ui/EmptyState";
import MyProductCard from "./MyProductCard";
import ReviewCard from "./ReviewCard";
import { getProductsByUser, removeProduct, subscribeProducts } from "../data/ProductStore";
import { getReviewsByUser } from "../data/Reviews";

type Choice = "contacto" | "productos" | "reseñas";

interface ProfileInfoProps {
  choice: Choice;
  currentUser: UserProfile;
}

function ProfileInfo({ currentUser, choice }: ProfileInfoProps) {
  const [userProducts, setUserProducts] = useState<Product[]>(getProductsByUser(currentUser.id));
  const [userReviews, setUserReviews] = useState(getReviewsByUser(currentUser.id));

  useEffect(() => {
    const unsub = subscribeProducts(() => setUserProducts(getProductsByUser(currentUser.id)));
    return unsub;
  }, [currentUser.id]);

  const handleRemove = (productId: number) => {
    removeProduct(productId);
  };
    
  return (
    <div>
      {choice === "contacto" && (
        <>
        <div className="bg-white px-6 pt-4 pb-4 rounded-2xl m-4 flex items-center justify-center">

          <p className="m-1 text-[20px] text-gray-600">
            Contactame! 
            Soy confiable 
        </p>
        </div>
        </>
      )}

      {choice === "productos" && (
        <div className="px-5 pb-6">
          {userProducts.length === 0 ? (
            <EmptyState message="No tenés productos publicados" />
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {userProducts.map((product) => (
                <MyProductCard key={product.id} product={product} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      )}

      {choice === "reseñas" && (
        <div className="w-full max-w-md">
          {userReviews.length === 0 ? (
            <EmptyState message="Este perfil no tiene comentarios" />
          ) : (
            <>
              <CommentHeader name={currentUser.username} avatar={currentUser.avatar} />
              {userReviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </>
          )}
        </div>
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
    <div className="flex flex-wrap justify-center mt-6">
      <div className="flex gap-2 justify-between mb-8">
        <button
          onClick={() => setChoice("contacto")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border border-white rounded-3xl text-white bg-[#9BAB00] text-[18px] transition-colors duration-200 hover:bg-[#accb30] hover:shadow-md"
        >
          Contactos
        </button>

        <button
          onClick={() => setChoice("productos")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border border-white rounded-3xl text-white bg-[#9BAB00] text-[18px] transition-colors duration-200 hover:bg-[#accb30] hover:shadow-md"
        >
          Productos
        </button>

        <button
          onClick={() => setChoice("reseñas")}
          className="flex items-center justify-center h-[40px] w-auto px-4 border border-white rounded-3xl text-white bg-[#9BAB00] text-[18px] transition-colors duration-200 hover:bg-[#accb30] hover:shadow-md"
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