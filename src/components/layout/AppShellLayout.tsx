import { useState, useRef, useLayoutEffect, type ReactNode } from "react";
import AppHeader from "../templates/AppHeader";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../ui/BottomNav";
import FilterPanel from "../ui/FilterPanel";
import type { FilterValues } from "../data/Filters";
import type { UserProfile } from "../data/UserProfile";

/** Pantallas que muestran el {@link AppHeader}. */
const headerScreens = ["home", "marketplace", "favorite", "addproduct", "productdetail"];
/** Pantallas que muestran el {@link BottomNav}. */
const bottomNavScreens = ["home", "marketplace", "favorite", "addproduct", "settings"];
/** Pantallas donde el botón de filtros del {@link AppHeader} está habilitado. */
const filterScreens = ["home", "marketplace", "favorite"];

/**
 * Props de AppShellLayout.
 */
interface AppShellLayoutProps {
  /** Nombre de la pantalla actual, controla qué chrome (header/nav/filtros) se muestra. */
  screen: string;
  /** Usuario autenticado, mostrado en {@link AppHeader}/{@link ProfileHeader}. */
  currentUser: UserProfile;
  /** Navega a otra pantalla por nombre. Usado por {@link BottomNav}. */
  onNavigate: (screen: string) => void;
  /** Se ejecuta al confirmar una búsqueda desde {@link AppHeader}. */
  onSearch: (term: string) => void;
  /** Estado del filtro actualmente aplicado. */
  appliedState: string;
  /** Precio máximo del filtro actualmente aplicado. */
  appliedPrice: number;
  /** Se ejecuta al aplicar filtros desde el {@link FilterPanel}. */
  onFilterApply: (filters: FilterValues) => void;
  /** Contenido de la pantalla actual. */
  children: ReactNode;
}

/**
 * Layout principal de las pantallas autenticadas (Home, Marketplace, Favoritos, etc.).
 *
 * Decide qué chrome mostrar según la pantalla actual (header de búsqueda,
 * header de perfil en Settings, barra de navegación inferior) y delega la
 * animación y posicionamiento del panel de filtros a {@link FilterPanel}.
 * Usado en {@link App}.
 *
 * @param screen - Nombre de la pantalla actual.
 * @param currentUser - Usuario autenticado.
 * @param onNavigate - Navega a otra pantalla.
 * @param onSearch - Se ejecuta al confirmar una búsqueda.
 * @param appliedState - Estado del filtro aplicado.
 * @param appliedPrice - Precio máximo del filtro aplicado.
 * @param onFilterApply - Se ejecuta al aplicar filtros nuevos.
 * @param children - Contenido de la pantalla actual.
 */
function AppShellLayout({ screen, currentUser, onNavigate, onSearch, appliedState, appliedPrice, onFilterApply, children }: AppShellLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerH, setHeaderH] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useLayoutEffect(() => {
    if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
  }, [screen]);

  function handleApply(filters: FilterValues) {
    setShowFilters(false);
    onFilterApply(filters);
  }

  return (
    <div className="flex flex-col h-dvh bg-beige">

      <div ref={headerRef}>
        {headerScreens.includes(screen) && (
          <AppHeader
            currentUser={currentUser}
            onSearch={onSearch}
            onFilterOpen={filterScreens.includes(screen) ? () => setShowFilters(true) : undefined}
          />
        )}
      </div>

      {screen === "settings" && (
        <ProfileHeader
          name={currentUser.username}
          email={currentUser.email}
          avatar={currentUser.avatar}
        />
      )}

      <main className="flex-1 w-full bg-beige overflow-hidden">
        <div className="max-w-6xl mx-auto h-full">
          {children}
        </div>
      </main>

      {bottomNavScreens.includes(screen) && (
        <BottomNav onNavigate={onNavigate} currentScreen={screen} />
      )}

      <FilterPanel
        open={showFilters}
        topOffset={headerH + 8}
        initialState={appliedState}
        initialPrice={appliedPrice}
        onApply={handleApply}
        onClose={() => setShowFilters(false)}
      />

    </div>
  );
}

export default AppShellLayout;
