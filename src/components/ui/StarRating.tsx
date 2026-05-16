import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviews: number;
}
const stars = [1, 2, 3, 4, 5];

function StarRating({ rating, reviews }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <Star key={star} size={20} strokeWidth={1.5} stroke="hsl(67, 100%, 35%)"fill={star <= Math.round(rating) ? "border-primary" : "none"}/>
      ))}
      <span className="text-[14px] text-[hsl(26,11%,38%)] ml-1">
        {rating.toFixed(1)} ({reviews})
      </span>
    </div>
  );
}

export default StarRating;