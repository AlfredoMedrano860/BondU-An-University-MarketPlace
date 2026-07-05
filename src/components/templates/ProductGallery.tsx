/** @see {@link https://cva.style/docs class-variance-authority} */
import { cva } from "class-variance-authority";

const thumbnail = cva(
  "w-23 h-23 rounded-xl overflow-hidden transition-all border-[5px] hover:scale-[1.04] active:scale-[0.97]",
  {
    variants: {
      selected: {
        true:  "border-primary",
        false: "border-transparent",
      },
    },
    defaultVariants: { selected: false },
  }
);

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
  /** Clases del contenedor. Por defecto distribuye las miniaturas con justify-between. */
  className?: string;
}

/**
 * Galería de miniaturas de un producto.
 *
 * Muestra las imágenes del producto como botones seleccionables.
 * La miniatura activa se resalta con un borde de color primario.
 * Usada en {@link ProductPage} para cambiar la imagen principal.
 *
 * @param gallery - Lista de URLs de imágenes del producto.
 * @param selectedImage - Índice de la imagen actualmente seleccionada.
 * @param onSelect - Se ejecuta al seleccionar una miniatura con su índice.
 */
function ProductGallery({ gallery, selectedImage, onSelect, className = "flex justify-between gap-3 mb-5" }: ProductGalleryProps) {
  return (
    <div className={className}>
      {gallery.map((imageUrl, imageIndex) => (
        <button
          key={imageIndex}
          onClick={() => onSelect(imageIndex)}
          className={thumbnail({ selected: selectedImage === imageIndex })}
        >
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
}

export default ProductGallery;
