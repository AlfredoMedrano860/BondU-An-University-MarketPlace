import { CirclePlus } from "lucide-react";
import BackButton from "../ui/BackButton";
import { MAX_PRODUCT_IMAGES } from "../data/ProductStore";
import { useImagePicker } from "../../hooks/useImagePicker";

/**
 * Props de ProductImagePicker.
 */
interface ProductImagePickerProps {
  /** Lista de URLs de imágenes seleccionadas. */
  gallery: string[];
  /** Se ejecuta al cambiar la galería con la lista actualizada. */
  onGalleryChange: (gallery: string[]) => void;
  /** Navega a la pantalla anterior. */
  onBack: () => void;
}

/**
 * Selector de imágenes para un nuevo producto.
 *
 * Muestra la imagen principal y miniaturas para cada slot disponible.
 * El número de slots está definido por {@link MAX_PRODUCT_IMAGES}.
 * Usa {@link useImagePicker} para manejar la selección de archivos del dispositivo.
 *
 * @param gallery - Lista de URLs de imágenes seleccionadas.
 * @param onGalleryChange - Se ejecuta al cambiar la galería con la lista actualizada.
 * @param onBack - Navega a la pantalla anterior.
 */
function ProductImagePicker({ gallery, onGalleryChange, onBack }: ProductImagePickerProps) {
  const { fileInputRef, handleFileChange, openPicker } = useImagePicker(gallery, onGalleryChange);

  const mainImage = gallery[0] ?? null;

  return (
    <div className="relative w-full bg-white overflow-hidden">

      {/* Input de archivo oculto ── se activa programáticamente con openPicker */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* ── IMAGEN PRINCIPAL ── muestra placeholder si no hay imagen */}
      <div className="w-full h-72.5 bg-[#d9cfc4] flex items-center justify-center">
        {mainImage
          ? <img src={mainImage} alt="preview" className="w-full h-full object-cover" />
          : <CirclePlus size={60} color="hsl(67, 100%, 35%)" strokeWidth={1} />
        }
      </div>

      {/* ── HEADER ── */}
      <div className="absolute top-4 left-0">
        <BackButton onClick={onBack} />
      </div>

      {/* Botón flotante para agregar imagen al slot 0 */}
      <button
        onClick={() => openPicker(0)}
        className="absolute bottom-24 right-4 w-11 h-11 rounded-full bg-aux flex items-center justify-center"
      >
        <CirclePlus size={24} color="white" strokeWidth={1.5} />
      </button>

      {/* ── MINIATURAS ── un slot por cada imagen permitida */}
      <div className="flex gap-3 px-4 py-3 bg-[#d9cfc4]">
        {Array.from({ length: MAX_PRODUCT_IMAGES }).map((_, slotIndex) => (
          <button
            key={slotIndex}
            onClick={() => openPicker(slotIndex)}
            className="w-20 h-20 rounded-xl overflow-hidden border-2 border-dashed border-white flex items-center justify-center"
          >
            {gallery[slotIndex]
              ? <img src={gallery[slotIndex]} alt={`imagen ${slotIndex + 1}`} className="w-full h-full object-cover" />
              : <CirclePlus size={28} color="white" strokeWidth={1.5} />
            }
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductImagePicker;