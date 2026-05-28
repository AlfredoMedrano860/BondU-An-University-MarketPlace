import { navItems } from "../data/Navigation";

const screenToIndex: Record<string, number> = {
  home: 0,
  marketplace: 1,
  favorite: 3,
  settings: 4,
};

/**
 * Props de BottomNav.
 */
interface BottomNavProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Nombre de la pantalla actualmente activa para resaltar el ícono correspondiente. */
  currentScreen: string;
}

/**
 * Barra de navegación inferior de la aplicación.
 *
 * Muestra cinco íconos de navegación en una píldora flotante.
 * Los items se obtienen de {@link navItems} en Navigation.ts.
 * El ícono activo se eleva con un círculo destacado que se desplaza
 * según la pantalla seleccionada.
 *
 * @param onNavigate - Navega a otra pantalla por nombre.
 * @param currentScreen - Nombre de la pantalla actualmente activa.
 */
function BottomNav({ onNavigate, currentScreen }: BottomNavProps) {
  const selectedIndex = screenToIndex[currentScreen] ?? 0;
  const SelectedIcon = navItems[selectedIndex].icon;

  return (
    <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-85 h-16 bg-primary rounded-full grid grid-cols-5 items-center z-50">

      {/* ── ÍCONO ACTIVO ── círculo elevado que se desplaza según la pantalla */}
      {/* Para el efecto de posición dinámica me ayudé con IA */}
      <div
        className="absolute -top-6 w-18 h-18 rounded-full bg-beige p-2 transition-all duration-300 ease-in-out"
        style={{ left: `${(selectedIndex + 0.5) * 20}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-full h-full bg-secondary rounded-full flex justify-center items-center">
          <SelectedIcon size={28} color="white" strokeWidth={1.5} />
        </div>
      </div>

      {/* ── ÍCONOS ── se oculta el ícono activo para evitar duplicado */}
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => item.screen && onNavigate(item.screen)}
            className="relative z-10 flex justify-center items-center transition-all duration-300"
          >
            {index !== selectedIndex && (
              <Icon size={26} color="white" strokeWidth={1.5} />
            )}
          </button>
        );
      })}

    </nav>
  );
}

export default BottomNav;