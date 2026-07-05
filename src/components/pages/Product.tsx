import { useState } from "react";
import BackButton from "../ui/BackButton";
import ProductGallery from "../templates/ProductGallery";
import ProductInfo from "../templates/ProductInfo";
import ProductTabs from "../templates/ProductTabs";
import type { Product } from "../data/Product";
import type { Seller } from "../data/Seller";

/**
 * Props de ProductPage.
 */
interface ProductPageProps {
  /** Producto cuyo detalle se muestra. */
  product: Product;
  /** Navega hacia atrás. */
  onBack: () => void;
  /** Abre el perfil del vendedor. Si se omite el botón no navega. */
  onViewSellerProfile?: (seller: Seller) => void;
}

/**
 * Pantalla de detalle de un producto con galería, información y pestañas.
 *
 * Tiene diseño responsive: vista apilada en móvil y cuadrícula de dos columnas en desktop.
 * Gestiona localmente el índice de imagen y pestaña activa.
 *
 * @param product - Producto a mostrar.
 * @param onBack - Navega hacia atrás.
 * @param onViewSellerProfile - Abre el perfil del vendedor.
 */
function ProductPage({ product, onBack, onViewSellerProfile }: ProductPageProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const secondaryImages = product.gallery.slice(1);
  const displayImages = secondaryImages.length > 0 ? secondaryImages : product.gallery;

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar">

      {/* Back button desktop */}
      <div className="hidden md:block fixed left-0 top-28 z-50">
        <BackButton onClick={onBack} />
      </div>

      {/* Hero mobile */}
      <div className="relative w-full h-72.5 bg-white overflow-hidden md:hidden">
        <img src={displayImages[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-4 pt-5 pb-10 min-h-[calc(100%-290px)] md:min-h-0 md:px-16 lg:px-20 md:pt-8 md:pb-16">
        <div className="md:grid md:grid-cols-[3fr_2fr] md:gap-10 md:items-start">

          {/* Columna imagen */}
          <div>
            <div className="hidden md:block w-full h-130 bg-white rounded-3xl overflow-hidden shadow-sm">
              <img src={displayImages[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
            </div>
            <ProductGallery
              gallery={displayImages}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
              className="flex justify-between md:justify-center gap-3 md:gap-4 mb-5 md:mt-4"
            />
          </div>

          {/* Columna info */}
          <div className="md:pt-2">
            <ProductInfo name={product.name} price={product.price} state={product.state} />
            <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} onViewSellerProfile={onViewSellerProfile} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductPage;
