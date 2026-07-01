import { ImagePlus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useImagePicker } from "../../hooks/useImagePicker";

const maxProductImages = 3;

/**
 * Props de ProductImagePicker.
 */
interface ProductImagePickerProps {
  /** Arreglo de URLs de imágenes; el índice 0 es la imagen principal. */
  gallery: string[];
  /** Se ejecuta con la galería actualizada, el archivo real y el slot al seleccionar una imagen. */
  onGalleryChange: (gallery: string[], file: File, slotIndex: number) => void;
}

/**
 * Selector de imágenes para el formulario de producto.
 *
 * Muestra un slot principal y miniaturas secundarias (hasta {@link maxProductImages}).
 * Al pulsar cualquier slot abre el selector de archivos del sistema.
 * Usado en {@link AddProductScreen}.
 *
 * @param gallery - URLs de imágenes actuales.
 * @param onGalleryChange - Callback con la galería actualizada.
 */
function ProductImagePicker({ gallery, onGalleryChange }: ProductImagePickerProps) {
  const { t } = useTranslation();
  const { fileInputRef, handleFileChange, openPicker } = useImagePicker(gallery, onGalleryChange);
  const mainImage = gallery[0] ?? null;

  return (
    <div className="flex flex-col gap-3 px-4 pt-5 pb-2">

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      <p className="text-sm font-semibold color-text">{t("addProduct.photos")}</p>

      {/* ── SLOT PRINCIPAL ── */}
      <button
        type="button"
        onClick={() => openPicker(0)}
        className="w-full h-52 rounded-2xl overflow-hidden bg-white-app border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:opacity-80 active:opacity-70 transition-opacity"
      >
        {mainImage ? (
          <img src={mainImage} alt={t("addProduct.mainPhoto")} className="w-full h-full object-cover" />
        ) : (
          <>
            <ImagePlus size={36} color="hsl(67,100%,35%)" strokeWidth={1.5} />
            <span className="text-xs text-gray-400 font-medium">{t("addProduct.mainPhoto")}</span>
          </>
        )}
      </button>

      {/* ── MINIATURAS ── */}
      <div className="flex gap-2">
        {Array.from({ length: maxProductImages }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openPicker(i + 1)}
            className="flex-1 aspect-square rounded-xl overflow-hidden bg-white-app border border-dashed border-gray-200 flex items-center justify-center hover:opacity-80 active:opacity-70 transition-opacity"
          >
            {gallery[i + 1] ? (
              <img src={gallery[i + 1]} alt={t("addProduct.photo", { n: i + 2 })} className="w-full h-full object-cover" />
            ) : (
              <Plus size={20} color="#9ca3af" strokeWidth={1.5} />
            )}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductImagePicker;
