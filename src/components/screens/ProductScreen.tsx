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
    <div className="h-screen bg-[#eee7dd] overflow-y-auto no-scrollbar">

      {/* ── BARRA SUPERIOR ── espacio de color para efecto visual */}
      <div className="w-full h-15 bg-primary" />

      {/* ── IMAGEN PRINCIPAL ── cambia según la miniatura seleccionada */}
      <div className="relative w-full h-72.5 bg-white overflow-hidden">
        <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>
      </div>

      {/* ── DETALLE ── */}
      <div className="bg-[#eee7dd] px-4 pt-5 pb-10 min-h-[calc(100vh-338px)]">

        {/* Miniaturas de galería */}
        <ProductGallery
          gallery={product.gallery}
          selectedImage={selectedImage}
          onSelect={setSelectedImage}
        />

        {/* Nombre, precio y estado */}
        <ProductInfo
          name={product.name}
          price={product.price}
          state={product.state}
        />

        {/* Tabs: descripción y vendedor */}
        <ProductTabs
          product={product}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
        />

      </div>

    </div>
  );
}

export default ProductScreen;