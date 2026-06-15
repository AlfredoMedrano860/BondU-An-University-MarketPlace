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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 mt-5">

      <h2 className="secondary-text text-2xl font-bold mb-4">{t("home.specialForYou")}</h2>

      <div className="rounded-2xl overflow-hidden shadow-sm bg-white">

        {/* Imagen + overlay de texto */}
        <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-80">
          <img
            src={currentItem.image}
            alt={currentItem.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 px-4 pb-4">
            <h3 className="text-white font-bold text-lg leading-snug drop-shadow">
              {currentItem.title}
            </h3>
            <p className="text-white/80 text-sm mt-0.5 drop-shadow">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Dots en franja blanca */}
        <div className="flex justify-center py-3">
          <DotsIndicator currentIndex={currentIndex} total={featuredItems.length} />
        </div>

      </div>
    </div>
  );
}

export default FeaturedBanner;