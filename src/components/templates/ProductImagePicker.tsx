import { CirclePlus } from "lucide-react";
import BackButton from "../ui/BackButton";
import { MAX_PRODUCT_IMAGES } from "../data/ProductStore";
import { useImagePicker } from "../../hooks/useImagePicker";

interface ProductImagePickerProps {
  gallery: string[];
  onGalleryChange: (gallery: string[]) => void;
  onBack: () => void;
}

function ProductImagePicker({ gallery, onGalleryChange, onBack }: ProductImagePickerProps) {
  const { fileInputRef, handleFileChange, openPicker } = useImagePicker(gallery, onGalleryChange);

  const mainImage = gallery[0] ?? null;

  return (
    <div className="relative w-full bg-white overflow-hidden">

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      <div className="w-full h-72.5 bg-[#d9cfc4] flex items-center justify-center">
        {mainImage ? <img src={mainImage} alt="preview" className="w-full h-full object-cover" /> : <CirclePlus size={60} color="hsl(67, 100%, 35%)" strokeWidth={1} />}
      </div>

      <div className="absolute top-4 left-0">
        <BackButton onClick={onBack} />
      </div>

      <button onClick={() => openPicker(0)} className="absolute bottom-24 right-4 w-11 h-11 rounded-full bg-aux flex items-center justify-center">
        <CirclePlus size={24} color="white" strokeWidth={1.5} />
      </button>

      <div className="flex gap-3 px-4 py-3 bg-[#d9cfc4]">
        {Array.from({ length: MAX_PRODUCT_IMAGES }).map((_, i) => (
          <button key={i} onClick={() => openPicker(i)} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-dashed border-white flex items-center justify-center">
            {gallery[i] ? <img src={gallery[i]} alt={`imagen ${i + 1}`} className="w-full h-full object-cover" /> : <CirclePlus size={28} color="white" strokeWidth={1.5} />}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ProductImagePicker;