interface ProductGalleryProps {
  gallery: string[];
  selectedImage: number;
  onSelect: (index: number) => void;
}

function ProductGallery({ gallery, selectedImage, onSelect }: ProductGalleryProps) {
  return (
    <div className="flex justify-between gap-3 mb-5">
      {gallery.map((img, i) => {

        const borderClass = selectedImage === i ? "border-primary" : "border-transparent";

        return (
          <button key={i} onClick={() => onSelect(i)} className={`w-23 h-23 rounded-xl overflow-hidden transition-all border-[5px] ${borderClass}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        );
        
      })}
    </div>
  );
}

export default ProductGallery;