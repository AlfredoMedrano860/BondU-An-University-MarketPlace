/**
 * Props de ProductGallery.
 */
interface ProductGalleryProps {
  /** Lista de URLs de imágenes del producto. */
  gallery: string[];
  /** Índice de la imagen actualmente seleccionada. */
  selectedImage: number;
  /** Se ejecuta al seleccionar una miniatura con su índice. */
  onSelect: (index: number) => void;
}

/**
 * Galería de miniaturas de un producto.
 *
 * Muestra las imágenes del producto como botones seleccionables.
 * La miniatura activa se resalta con un borde de color primario.
 * Usada en {@link ProductScreen} para cambiar la imagen principal.
 *
 * @param gallery - Lista de URLs de imágenes del producto.
 * @param selectedImage - Índice de la imagen actualmente seleccionada.
 * @param onSelect - Se ejecuta al seleccionar una miniatura con su índice.
 */
function ProductGallery({ gallery, selectedImage, onSelect }: ProductGalleryProps) {
  return (
    <div className="flex justify-between gap-3 mb-5">
      {gallery.map((img, i) => {

        const borderClass = selectedImage === i ? "border-primary" : "border-transparent";

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-23 h-23 rounded-xl overflow-hidden transition-all border-[5px] ${borderClass}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        );

      })}
    </div>
  );
}

export default ProductGallery;