import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../components/data/UserProfile";
import type { Product } from "../components/data/Product";
import { productsService } from "../services/products";
import type { ApiProductCondition } from "../types/product";
import { notify } from "../components/data/NotificationStore";
import { productSchema } from "../schemas/product.schema";

/**
 * Hook para gestionar el estado y lógica del formulario de producto.
 *
 * Si se pasa `initialProduct`, inicializa los campos con sus valores (modo edición);
 * de lo contrario opera en modo creación. Valida con {@link productSchema} y persiste
 * en el backend a través de `productsService` (crea o edita el producto y sube las
 * imágenes seleccionadas). Usado en {@link AddProduct}.
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
  const [name,        setName]        = useState(initialProduct?.name        ?? "");
  const [price,       setPrice]       = useState(initialProduct?.price?.toString() ?? "");
  const [state,       setState]       = useState(initialProduct?.state       ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [gallery,     setGallery]     = useState<string[]>(initialProduct?.gallery ?? []);
  const [files,       setFiles]       = useState<(File | null)[]>([]);
  const [conditions,  setConditions]  = useState<ApiProductCondition[]>([]);
  const [conditionsLoaded, setConditionsLoaded] = useState(false);
  const [isSaving,    setIsSaving]    = useState(false);

  // Cargar las condiciones disponibles (Nuevo, Usado, Detalle) del backend.
  // El botón de guardar queda deshabilitado hasta que esto resuelva (éxito o error),
  // para no enviar un condition_id vacío si el usuario guarda antes de que cargue.
  useEffect(() => {
    productsService.getConditions()
      .then(setConditions)
      .catch(() => {})
      .finally(() => setConditionsLoaded(true));
  }, []);

  /**
   * Recibe la galería actualizada del {@link ProductImagePicker} junto con el
   * archivo real seleccionado y su slot, para poder subirlo al guardar.
   */
  function handleGalleryChange(newGallery: string[], file: File, slotIndex: number) {
    setGallery(newGallery);
    setFiles(prev => {
      const updated = prev.slice();
      updated[slotIndex] = file;
      return updated;
    });
  }

  /**
   * Sube las imágenes pendientes (una por slot) al producto ya creado/editado.
   * La del slot 0 se marca como imagen principal.
   * @returns Cantidad de imágenes que fallaron al subir.
   */
  async function uploadFiles(productId: string): Promise<number> {
    let failures = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      try {
        const img = await productsService.uploadImage(productId, file);
        if (i === 0) {
          await productsService.setPrimaryImage(productId, img.id);
        }
      } catch {
        failures++;
      }
    }
    return failures;
  }

  /**
   * Valida y persiste el producto. En modo edición llama a `productsService.update`;
   * en modo creación llama a `productsService.create`. Sube las imágenes pendientes
   * y navega atrás si es exitoso.
   */
  const handleSave = async () => {
    if (isSaving) return;
    const result = productSchema.safeParse({ name, price, state, description });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.productError.message";
      notify.error(t("notifications.productError.title"), t(msg));
      return;
    }
    const parsedPrice = parseFloat(price);
    const condition = conditions.find(c => c.name_condition === state);
    if (state && !condition) {
      notify.error(t("notifications.productConditionError.title"), t("notifications.productConditionError.message"));
      return;
    }

    setIsSaving(true);
    try {
      let failures = 0;
      if (initialProduct) {
        const hasChanged =
          name !== initialProduct.name ||
          parsedPrice !== initialProduct.price ||
          state !== initialProduct.state ||
          description !== initialProduct.description ||
          files.some(f => f != null);

        if (!hasChanged) {
          onBack();
          return;
        }

        await productsService.update(initialProduct.id, {
          name,
          price: parsedPrice,
          description,
          condition_id: condition?.condition_id,
        });
        failures = await uploadFiles(initialProduct.id);
        if (failures === 0) {
          notify.success(t("notifications.productUpdated.title"), t("notifications.productUpdated.message"));
        }
      } else {
        const created = await productsService.create({
          name,
          price: parsedPrice,
          description,
          seller_id: currentUser.id,
          condition_id: condition?.condition_id,
        });
        failures = await uploadFiles(created.product_id);
        if (failures === 0) {
          notify.success(t("notifications.productPublished.title"), t("notifications.productPublished.message"));
        }
      }
      if (failures > 0) {
        notify.warning(
          t("notifications.productImagesPartialFail.title"),
          t("notifications.productImagesPartialFail.message", { count: failures }),
        );
      }
      onBack();
    } catch {
      notify.error(t("notifications.productError.title"), t("notifications.productError.message"));
    } finally {
      setIsSaving(false);
    }
  };

  return {
    fields:  { name, price, state, description, gallery },
    setters: { setName, setPrice, setState, setDescription, setGallery: handleGalleryChange },
    handleSave,
    isSaving: isSaving || !conditionsLoaded,
  };
}
