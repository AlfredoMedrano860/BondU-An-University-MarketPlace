import { useEffect, useState } from "react";
import { featuredItems } from "../data/FeaturedData";
import DotsIndicator from "../ui/DotsIndicator";

function FeaturedBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = featuredItems[currentIndex];

  // Ref: https://react.dev/reference/react/useEffect
  // En la sección: Updating state based on previous state from an Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 mt-5">
      <h2 className="secondary-text text-2xl font-bold mb-4"> #EspecialParaTi</h2>

      <div className="relative w-full h-40 rounded-2xl overflow-hidden">
        <img src={currentItem.image} alt={currentItem.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <DotsIndicator currentIndex={currentIndex} total={featuredItems.length} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedBanner;