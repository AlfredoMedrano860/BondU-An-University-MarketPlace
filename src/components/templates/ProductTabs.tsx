import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import type { Seller } from "../data/Seller";
import SellerTab from "./SellerTab";
import ShareTab from "./ShareTab";

interface ProductTabsProps {
  product: Product;
  selectedTab: number;
  onSelectTab: (index: number) => void;
  onViewSellerProfile?: (seller: Seller) => void;
}

function ProductTabs({ product, selectedTab, onSelectTab, onViewSellerProfile }: ProductTabsProps) {
  const { t } = useTranslation();
  const tabLabels = [t("product.tabs.info"), t("product.tabs.seller"), t("product.tabs.share")];

  return (
    <div>

      <div className="flex mb-5">
        {tabLabels.map((tabLabel, tabIndex) => (
          <button
            key={tabLabel}
            onClick={() => onSelectTab(tabIndex)}
            className={`relative px-5 py-3 text-sm font-semibold transition-colors rounded-t-sm ${
              selectedTab === tabIndex
                ? "color-primary"
                : "text-gray-500 hover:bg-neutral-100 hover:text-gray-700"
            }`}
          >
            {tabLabel}
            {selectedTab === tabIndex && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="text-[16px] color-inactive leading-8 text-justify">

        {selectedTab === 0 && <p>{product.description || t("product.noDescription")}</p>}

        {selectedTab === 1 && (
          <div>
            <p>{t("product.verifiedSeller")}</p>
            <SellerTab seller={product.seller} onViewProfile={() => onViewSellerProfile?.(product.seller)} />
          </div>
        )}

        {selectedTab === 2 && <ShareTab productId={product.id} />}

      </div>
    </div>
  );
}

export default ProductTabs;
