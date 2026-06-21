import { SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../data/UserProfile";
import SectionCard from "../layout/SectionCard";
import InputSpace from "../ui/InputSpace";
import IconButton from "../ui/IconButton";
import StarPicker from "../ui/StarPicker";
import { useReviewForm } from "../../hooks/useReviewForm";

/**
 * Props de ReviewForm.
 */
interface ReviewFormProps {
  /** Usuario autenticado que escribe la reseña. */
  reviewer: UserProfile;
  /** ID del vendedor que recibirá la reseña. */
  sellerId: number;
}

/**
 * Formulario para escribir una reseña sobre un vendedor.
 *
 * Muestra el avatar del reseñador, un selector de estrellas y un campo de texto.
 * La lógica de estado y envío está en {@link useReviewForm}.
 * Usado en {@link ProfileReviews}.
 *
 * @param reviewer - Usuario que escribe la reseña.
 * @param sellerId - ID del vendedor receptor.
 */
export default function ReviewForm({ reviewer, sellerId }: ReviewFormProps) {
  const { t } = useTranslation();
  const { rating, setRating, text, setText, handleSubmit } = useReviewForm(reviewer, sellerId);

  return (
    <SectionCard className="bg-white-app mx-0 mt-2 mb-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 mt-0.5">
          <img src={reviewer.avatar} alt={reviewer.username} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <StarPicker rating={rating} onChange={setRating} />

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
