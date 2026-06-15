import { useTranslation } from "react-i18next";
import type { Product } from "../components/data/Product";
import { toggleFavorite } from "../components/data/ProductStore";
import { notify } from "../components/data/NotificationStore";

/**
 * Hook que devuelve un manejador para alternar el estado favorito de un producto.
 *
 * Emite `success` al agregar e `info` al eliminar, luego llama a `refresh`
 * para que cada pantalla actualice su propio estado local.
 * Usado en {@link HomeScreen}, {@link FavoriteScreen} y {@link MarketPlaceScreen}.
 *
 * @param refresh - Callback que refresca el estado local del llamador tras el toggle.
 * @returns Función `handleToggleFavorite` que recibe un producto y alterna su favorito.
 */
export function useFavoriteToggle(refresh: () => void) {
  const { t } = useTranslation();

  return function handleToggleFavorite(product: Product) {
    const adding = !product.isFavorite;
    toggleFavorite(product.id);
    refresh();
    if (adding) {
      notify.success(t("notifications.favoriteAdded.title"), t("notifications.favoriteAdded.message"));
    } else {
      notify.info(t("notifications.favoriteRemoved.title"), t("notifications.favoriteRemoved.message"));
    }
  };
}
