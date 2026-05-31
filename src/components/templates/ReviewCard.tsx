import { Star } from "lucide-react";

interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    text: string;
}

export default function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="bg-white-app rounded-2xl p-4 m-4">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            </div>
            <div>
            <div className="flex items-center gap-2">
                <h4 className="font-bold text-lg text-lime-600">{review.name}</h4>
                <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                    key={i}
                    size={14}
                    strokeWidth={1.5}
                    stroke={i < Math.round(review.rating) ? "hsl(67,100%,35%)" : "#ddd"}
                    fill={i < Math.round(review.rating) ? "hsl(67,100%,35%)" : "none"}
                    />
                ))}
                </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{review.text}</p>
            </div>
        </div>
        </div>
    );
}
