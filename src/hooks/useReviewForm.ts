import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../components/data/UserProfile";
import { addReview } from "../components/data/Review";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook para gestionar el estado y lógica del formulario de reseñas.
 *
 * Maneja la puntuación de estrellas, el hover para previsualización y el texto.
 * Valida que se haya seleccionado al menos una estrella antes de enviar.
 * Usado en {@link ReviewForm}.
 *
 * @param reviewer - Usuario que escribe la reseña.
 * @param sellerId - ID del vendedor que recibirá la reseña.
 * @returns `rating` — puntuación seleccionada,
 * `setRating` — actualiza la puntuación,
 * `hover` — estrella bajo el cursor para previsualización,
 * `setHover` — actualiza el hover,
 * `text` — contenido textual de la reseña,
 * `setText` — actualiza el texto,
 * `handleSubmit` — valida y envía la reseña.
 */
export function useReviewForm(reviewer: UserProfile, sellerId: number) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  /**
   * Valida que se haya seleccionado una puntuación, guarda la reseña y reinicia el formulario.
   */
  function handleSubmit() {
    if (rating === 0) {
      notify.warning(
        t("notifications.reviewError.title"),
        t("notifications.reviewError.message"),
      );
      return;
    }
    addReview(sellerId, {
      reviewerId: reviewer.id,
      name: reviewer.username,
      avatar: reviewer.avatar,
      rating,
      text: text.trim(),
    });
    setRating(0);
    setHover(0);
    setText("");
    notify.success(
      t("notifications.reviewSent.title"),
      t("notifications.reviewSent.message"),
    );
  }

  return { rating, setRating, hover, setHover, text, setText, handleSubmit };
}
