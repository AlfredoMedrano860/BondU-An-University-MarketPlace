import { HouseHeart, Store, CirclePlus, Star, Bolt } from "lucide-react";

// Todo esto hay que trabajarlo con interfaz
// como no estan todas las screen, lo hice todo aqui
// Pueden trabajar en esto si gustan

const navItems = [
  { id: 0, icon: HouseHeart, screen: "home" },
  { id: 1, icon: Store, screen: "marketplace" },
  { id: 2, icon: CirclePlus, screen: "addproduct" },
  { id: 3, icon: Star, screen: "" },
  { id: 4, icon: Bolt, screen: "settings" },
];

const screenToIndex: Record<string, number> = {
  home: 0,
  marketplace: 1,
  settings: 4,
};

interface BottomNavProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

function BottomNav({ onNavigate, currentScreen }: BottomNavProps) {
  const selectedIndex = screenToIndex[currentScreen] ?? 0;
  const SelectedIcon = navItems[selectedIndex].icon;

  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-85 h-16 bg-primary rounded-full grid grid-cols-5 items-center z-50">

      <div
        className="absolute -top-6 w-18 h-18 rounded-full bg-beige p-2 transition-all duration-300 ease-in-out"
        style={{ left: `${(selectedIndex + 0.5) * 20}%`, transform: "translateX(-50%)"}} // Para el efecto me ayudé con IA
      >
        <div className="w-full h-full bg-secondary rounded-full flex justify-center items-center">
          <SelectedIcon size={28} color="white" strokeWidth={1.5} />
        </div>
      </div>

      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button key={item.id} onClick={() => item.screen && onNavigate(item.screen)} className="relative z-10 flex justify-center items-center transition-all duration-300">
            {index !== selectedIndex && ( <Icon size={26} color="white" strokeWidth={1.5} /> )}
          </button>
        );
      })}

    </nav>
  );
}

export default BottomNav;