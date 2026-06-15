import { useState, useEffect } from "react";
import StarRating from "../ui/StarRating";
import type { Seller } from "../data/Seller";
import { getVisibleReviews, computeRating, subscribeReviews } from "../data/Review";

interface SellerTabProps {
  seller: Seller;
  onViewProfile?: () => void;
}

function SellerTab({ seller, onViewProfile }: SellerTabProps) {
  const [reviews, setReviews] = useState(() => getVisibleReviews(seller.id));

  useEffect(() => {
    const unsub = subscribeReviews(() => setReviews(getVisibleReviews(seller.id)));
    return unsub;
  }, [seller.id]);

  const rating = computeRating(reviews);
  const reviewCount = reviews.length;

  return (
    <div
      className="flex items-center gap-4 mt-2 cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onViewProfile}
      role={onViewProfile ? "button" : undefined}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden bg-[hsl(35,33%,90%)] shrink-0 border-[3px] border-primary">
        <img src={seller.avatar} alt={seller.username} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold color-primary">{seller.username}</p>
        <StarRating rating={rating} reviews={reviewCount} />
      </div>
    </div>
  );
}

export default SellerTab;