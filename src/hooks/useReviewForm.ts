import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../components/data/UserProfile";
import { reviewsService } from "../services/reviews";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook para gestionar el estado y lógica del formulario de reseñas.
 *
 * Maneja la puntuación de estrellas y el texto de la reseña.
 * Valida que se haya seleccionado al menos una estrella antes de enviar.
 * Usado en {@link ReviewForm}.
 *
 * @param reviewer - Usuario que escribe la reseña.
 * @param sellerId - ID del vendedor que recibirá la reseña.
 * @param onSubmitted - Se ejecuta al enviar la reseña exitosamente.
 * @returns `rating` — puntuación seleccionada,
 * `setRating` — actualiza la puntuación,
 * `text` — contenido textual de la reseña,
 * `setText` — actualiza el texto,
 * `handleSubmit` — valida y envía la reseña,
 * `isSubmitting` — `true` mientras la reseña se está enviando.
 */
export function useReviewForm(reviewer: UserProfile, sellerId: string, onSubmitted?: () => void) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Valida que se haya seleccionado una puntuación, envía la reseña al backend
   * y reinicia el formulario.
   */
  async function handleSubmit() {
    if (isSubmitting) return;
    if (rating === 0) {
      notify.warning(
        t("notifications.reviewError.title"),
        t("notifications.reviewError.message"),
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewsService.create({
        reviewer_id: reviewer.id,
        seller_id: sellerId,
        rating,
        comment: text.trim() || undefined,
      });
      setRating(0);
      setText("");
      notify.success(
        t("notifications.reviewSent.title"),
        t("notifications.reviewSent.message"),
      );
      onSubmitted?.();
    } catch (err: any) {
      if (err?.response?.status === 409) {
        notify.error(t("notifications.reviewDuplicate.title"), t("notifications.reviewDuplicate.message"));
      } else {
        notify.error(t("notifications.reviewSaveError.title"), t("notifications.reviewSaveError.message"));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return { rating, setRating, text, setText, handleSubmit, isSubmitting };
}
