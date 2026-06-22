import StarRating from "../ui/StarRating";
import SectionCard from "../layout/SectionCard";
import type { Review } from "../data/Review";

interface ReviewCardProps {
  review: Review;
  onViewProfile?: () => void;
}

export default function ReviewCard({ review, onViewProfile }: ReviewCardProps) {
    return (
        <SectionCard className="bg-white-app mx-0 my-2">
          <button
            type="button"
            onClick={onViewProfile}
            className="flex items-center gap-3 w-full text-left bg-transparent border-0 p-0 cursor-pointer hover:opacity-75 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-lg text-lime-600">{review.name}</h4>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="text-gray-600 text-sm mt-2">{review.text}</p>
            </div>
          </button>
        </SectionCard>
    );
}
