import type { Product } from "../data/Product";
import { productTabs } from "../data/Navigation";
import SellerTab from "./SellerTab";
import ShareTab from "./ShareTab";

interface ProductTabsProps {
  product: Product;
  selectedTab: number;
  onSelectTab: (index: number) => void;
}

function ProductTabs({ product, selectedTab, onSelectTab }: ProductTabsProps) {
  return (
    <div>
      <div className="flex justify-between mb-5">
        {productTabs.map((tab, i) => {
          const tabClass = selectedTab === i ? "color-primary underline underline-offset-4" : "color-inactive";
          return (
            <button key={i} onClick={() => onSelectTab(i)} className={`text-17px transition-colors pb-1 ${tabClass}`}>
              {tab}
            </button>
          );
        })}
      </div>

      <div className="text-[16px] color-inactive leading-8 text-justify">
        {selectedTab === 0 && <p>{product.description || "Sin descripción"}</p>}
        {selectedTab === 1 && (
          <div>
            <p>Vendedor verificado.</p>
            <SellerTab seller={product.seller} />
          </div>
        )}
        {selectedTab === 2 && <ShareTab productId={product.id} />}
      </div>
    </div>
  );
}

export default ProductTabs;