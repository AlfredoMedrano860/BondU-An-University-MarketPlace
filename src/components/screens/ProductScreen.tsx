import { useState } from "react";
import BackButton from "../ui/BackButton";
import ProductGallery from "../templates/ProductGallery";
import ProductInfo from "../templates/ProductInfo";
import ProductTabs from "../templates/ProductTabs";
import type { Product } from "../data/Product";
import type { Seller } from "../data/Seller";

/**
 * Props de ProductScreen.
 */
interface ProductScreenProps {
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
function ProductScreen({ product, onBack, onViewSellerProfile }: ProductScreenProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="h-full bg-beige overflow-y-auto no-scrollbar">

      {/* ════════════════ MOBILE ════════════════ */}

      {/* Imagen principal */}
      <div className="relative w-full h-72.5 bg-white overflow-hidden md:hidden">
        <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>
      </div>

      {/* Detalle mobile */}
      <div className="md:hidden bg-beige px-4 pt-5 pb-10 min-h-[calc(100%-290px)]">
        <ProductGallery gallery={product.gallery} selectedImage={selectedImage} onSelect={setSelectedImage} />
        <ProductInfo name={product.name} price={product.price} state={product.state} />
        <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} onViewSellerProfile={onViewSellerProfile} />
      </div>

      {/* ════════════════ DESKTOP ════════════════ */}

      {/* Back button  */}
      <div className="hidden md:block fixed left-0 top-28 z-50">
        <BackButton onClick={onBack} />
      </div>

      <div className="hidden md:block px-10 md:px-16 lg:px-20 pt-8 pb-16">
        <div className="grid grid-cols-[3fr_2fr] gap-10 items-start">

          {/*  COLUMNA IZQUIERDA  */}
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

          {/* COLUMNA DERECHA */}
          <div className="pt-2">
            <ProductInfo name={product.name} price={product.price} state={product.state} />
            <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} onViewSellerProfile={onViewSellerProfile} />
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProductScreen;
