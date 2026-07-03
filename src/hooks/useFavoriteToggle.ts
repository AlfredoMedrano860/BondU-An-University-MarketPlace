import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { favoritesService } from "../services/favorites";
import { notify } from "../components/data/NotificationStore";

export function useFavoriteToggle(userId: string, refresh: () => void | Promise<void>) {
  const { t } = useTranslation();

  return async function handleToggleFavorite(product: Product) {
    const adding = !product.isFavorite;
    try {
      if (adding) await favoritesService.add(userId, product.id);
      else        await favoritesService.remove(userId, product.id);

      await refresh();

      if (adding) {
        notify.success(t("notifications.favoriteAdded.title"), t("notifications.favoriteAdded.message"));
      } else {
        notify.info(t("notifications.favoriteRemoved.title"), t("notifications.favoriteRemoved.message"));
      }
    } catch {
      notify.error(t("notifications.favoriteError.title"), t("notifications.favoriteError.message"));
    }
  };
}
