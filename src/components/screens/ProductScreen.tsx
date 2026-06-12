import { useState } from "react";
import BackButton from "../ui/BackButton";
import ProductGallery from "../templates/ProductGallery";
import ProductInfo from "../templates/ProductInfo";
import ProductTabs from "../templates/ProductTabs";
import type { Product } from "../data/Product";

/**
 * Props de ProductScreen.
 * @see Product
 */
interface ProductScreenProps {
  /** Producto a mostrar en detalle. */
  product: Product;
  /** Navega a la pantalla anterior. */
  onBack: () => void;
}

/**
 * Pantalla de detalle de un producto.
 *
 * Muestra la galería de imágenes, información del producto y tabs con
 * descripción y datos del vendedor.
 * La imagen principal cambia según la miniatura seleccionada en {@link ProductGallery}.
 *
 * @param product - Producto a mostrar en detalle.
 * @param onBack - Navega a la pantalla anterior.
 */
function ProductScreen({ product, onBack }: ProductScreenProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="h-screen bg-beige overflow-y-auto no-scrollbar">

      {/* ════════════════ MOBILE ════════════════ */}

      {/* Imagen principal full-bleed */}
      <div className="relative w-full h-72.5 bg-white overflow-hidden md:hidden">
        <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>
      </div>

      {/* Detalle mobile */}
      <div className="md:hidden bg-beige px-4 pt-5 pb-10 min-h-[calc(100vh-290px)]">
        <ProductGallery gallery={product.gallery} selectedImage={selectedImage} onSelect={setSelectedImage} />
        <ProductInfo name={product.name} price={product.price} state={product.state} />
        <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>

      {/* ════════════════ DESKTOP ════════════════ */}

      {/* Back button — fuera del wrapper, pegado al borde izquierdo */}
      <div className="hidden md:block pt-6">
        <BackButton onClick={onBack} />
      </div>

      <div className="hidden md:block px-10 md:px-16 lg:px-20 pb-16">
        <div className="grid grid-cols-[3fr_2fr] gap-10 items-start">

          {/* ── COLUMNA IZQUIERDA ── imagen grande + miniaturas centradas */}
          <div>
            <div className="w-full h-130 bg-white rounded-3xl overflow-hidden shadow-sm">
              <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
            </div>
            <div className="mt-4">
              <ProductGallery
                gallery={product.gallery}
                selectedImage={selectedImage}
                onSelect={setSelectedImage}
                className="flex justify-center gap-4 mb-5"
              />
            </div>
          </div>

          {/* ── COLUMNA DERECHA ── info + tabs */}
          <div className="pt-2">
            <ProductInfo name={product.name} price={product.price} state={product.state} />
            <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductScreen;