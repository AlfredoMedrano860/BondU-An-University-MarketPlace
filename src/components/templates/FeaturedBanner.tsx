import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { featuredItems } from "../data/FeaturedData";
import DotsIndicator from "../ui/DotsIndicator";

/**
 * Banner de contenido destacado con rotación automática.
 *
 * Rota entre los items de {@link featuredItems} cada 2 segundos usando
 * un intervalo limpiado al desmontar el componente.
 * Muestra un {@link DotsIndicator} para indicar el item activo.
 *
 * @see {@link https://react.dev/reference/react/useEffect Updating state based on previous state from an Effect}
 */
function FeaturedBanner() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = featuredItems[currentIndex];

  // Rotación automática cada 2 segundos
  // Ref: https://react.dev/reference/react/useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-5">

      {/* ── TÍTULO ── */}
      <h2 className="secondary-text text-2xl font-bold mb-4">{t("home.specialForYou")}</h2>

      {/* ── IMAGEN ── cambia automáticamente con indicador de puntos */}
      <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-88 xl:h-96 rounded-2xl overflow-hidden">
        <img src={currentItem.image} alt={currentItem.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <DotsIndicator currentIndex={currentIndex} total={featuredItems.length} />
        </div>
      </div>

    </div>
  );
}

export default FeaturedBanner;