import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addProduct, updateProduct } from "../components/data/ProductStore";
import { notify } from "../components/data/NotificationStore";
import type { UserProfile } from "../components/data/UserProfile";
import type { Product } from "../components/data/Product";

/**
 * Hook para gestionar el estado y lógica del formulario de producto.
 *
 * Si se pasa `initialProduct`, inicializa los campos con sus valores (modo edición);
 * de lo contrario opera en modo creación. La validación ocurre dentro del store.
 * Usado en {@link AddProductScreen}.
 *
 * @param currentUser - Usuario autenticado que será el vendedor del producto.
 * @param onBack - Navega hacia atrás tras guardar exitosamente.
 * @param initialProduct - Producto existente a editar. Si se omite, se crea uno nuevo.
 * @returns `fields` — valores actuales de los campos,
 * `setters` — funciones para actualizar cada campo,
 * `handleSave` — valida y persiste el producto.
 */
export function useAddProductForm(currentUser: UserProfile, onBack: () => void, initialProduct?: Product) {
  const { t } = useTranslation();
  const [name, setName] = useState(initialProduct?.name        ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [state, setState] = useState(initialProduct?.state       ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [gallery, setGallery] = useState<string[]>(initialProduct?.gallery ?? []);

  /**
   * Valida y persiste el producto. En modo edición llama a `updateProduct`;
   * en modo creación llama a `addProduct`. Navega atrás si es exitoso.
   */
  const handleSave = () => {
    if (initialProduct) {
      const result = updateProduct(initialProduct.id, {
        name,
        price: parseFloat(price),
        state,
        image: gallery[0] ?? "",
        gallery,
        description,
      });
      if (result.ok) {
        notify.success(t("notifications.productUpdated.title"), t("notifications.productUpdated.message"));
        onBack();
      } else {
        notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
      }
    } else {
      const result = addProduct({
        name,
        price: parseFloat(price),
        state,
        image: gallery[0] ?? "",
        gallery,
        description,
        seller: {
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          password: "",
          avatar: currentUser.avatar,
          createdAt: currentUser.createdAt,
          location: currentUser.location ?? "",
          rating: currentUser.rating ?? 0,
          reviews: currentUser.reviews ?? 0,
          sales: currentUser.sales ?? 0,
        },
      });
      if (result.ok) {
        notify.success(t("notifications.productPublished.title"), t("notifications.productPublished.message"));
        onBack();
      } else {
        notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
      }
    }
  };

  return {
    fields:  { name, price, state, description, gallery },
    setters: { setName, setPrice, setState, setDescription, setGallery },
    handleSave,
  };
}
