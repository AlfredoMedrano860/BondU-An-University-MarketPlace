import { useState } from "react";
import BackButton from "../ui/BackButton";
import ProductGallery from "../templates/ProductGallery";
import ProductInfo from "../templates/ProductInfo";
import ProductTabs from "../templates/ProductTabs";
import type { Product } from "../data/Product";

interface ProductScreenProps {
  product: Product;
  onBack: () => void;
}

function ProductScreen({ product, onBack}: ProductScreenProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="h-screen bg-[#eee7dd] overflow-y-auto no-scrollbar">

      <div className="w-full h-15 bg-primary" />

      <div className="relative w-full h-72.5 bg-white overflow-hidden">
        <img src={product.gallery[selectedImage]} alt={product.name} className="w-full h-full object-cover"/>
        <div className="absolute top-4 left-0">
          <BackButton onClick={onBack} />
        </div>
      </div>

      <div className="bg-[#eee7dd] px-4 pt-5 pb-10 min-h-[calc(100vh-338px)]">
        <ProductGallery gallery={product.gallery} selectedImage={selectedImage} onSelect={setSelectedImage}/>
        <ProductInfo name={product.name} price={product.price} />
        <ProductTabs product={product} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
      
    </div>
  );
}

export default ProductScreen;