import { useTranslation } from "react-i18next";
import type { Product } from "../data/Product";
import SellerTab from "./SellerTab";
import ShareTab from "./ShareTab";

interface ProductTabsProps {
  product: Product;
  selectedTab: number;
  onSelectTab: (index: number) => void;
}

function ProductTabs({ product, selectedTab, onSelectTab }: ProductTabsProps) {
  const { t } = useTranslation();
  const tabLabels = [t("product.tabs.info"), t("product.tabs.seller"), t("product.tabs.share")];

  return (
    <div>

      <div className="flex justify-between mb-5">
        {tabLabels.map((tabLabel, tabIndex) => {
          const tabClass = selectedTab === tabIndex ? "color-primary underline underline-offset-4" : "color-inactive";
          return (
            <button
              key={tabLabel}
              onClick={() => onSelectTab(tabIndex)}
              className={`text-17px transition-colors pb-1 ${tabClass}`}
            >
              {tabLabel}
            </button>
          );
        })}
      </div>

      <div className="text-[16px] color-inactive leading-8 text-justify">

        {selectedTab === 0 && <p>{product.description || t("product.noDescription")}</p>}

        {selectedTab === 1 && (
          <div>
            <p>{t("product.verifiedSeller")}</p>
            <SellerTab seller={product.seller} />
          </div>
        )}

        {selectedTab === 2 && <ShareTab productId={product.id} />}

      </div>
    </div>
  );
}

export default ProductTabs;
