import { Star, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../data/UserProfile";
import SectionCard from "../layout/SectionCard";
import InputSpace from "../ui/InputSpace";
import IconButton from "../ui/IconButton";
import { useReviewForm } from "../../hooks/useReviewForm";

interface ReviewFormProps {
  reviewer: UserProfile;
  sellerId: number;
}

export default function ReviewForm({ reviewer, sellerId }: ReviewFormProps) {
  const { t } = useTranslation();
  const { rating, setRating, hover, setHover, text, setText, handleSubmit } = useReviewForm(reviewer, sellerId);

  return (
    <SectionCard className="bg-white-app mx-0 mt-2 mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 mt-0.5">
          <img src={reviewer.avatar} alt={reviewer.username} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform hover:scale-110 active:scale-95 duration-100"
              >
                <Star
                  size={20}
                  strokeWidth={1.5}
                  stroke="var(--color-primary)"
                  fill={star <= (hover || rating) ? "var(--color-primary)" : "none"}
                />
              </button>
            ))}
          </div>

          <InputSpace
            multiline
            hint={t("review.placeholder")}
            value={text}
            onChange={setText}
          />

          <div className="flex justify-end">
            <IconButton label={t("review.send")} icon={SendHorizonal} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
