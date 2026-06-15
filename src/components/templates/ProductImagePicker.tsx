import { ImagePlus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { maxProductImages } from "../data/ProductStore";
import { useImagePicker } from "../../hooks/useImagePicker";

interface ProductImagePickerProps {
  gallery: string[];
  onGalleryChange: (gallery: string[]) => void;
}

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
        onClick={() => openPicker(0)}
        className="w-full h-52 rounded-2xl overflow-hidden bg-white-app border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 active:opacity-80 transition-opacity"
      >
        {mainImage ? (
          <img src={mainImage} alt="preview" className="w-full h-full object-cover" />
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
            onClick={() => openPicker(i)}
            className="flex-1 aspect-square rounded-xl overflow-hidden bg-white-app border border-dashed border-gray-200 flex items-center justify-center active:opacity-80 transition-opacity"
          >
            {gallery[i] ? (
              <img src={gallery[i]} alt={`imagen ${i + 1}`} className="w-full h-full object-cover" />
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
