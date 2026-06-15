import type { ReactNode } from "react";
import AppLayout from "./AppLayout";
import AppHeader from "../templates/AppHeader";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../ui/BottomNav";
import type { UserProfile } from "../data/UserProfile";

const headerScreens     = ["home", "marketplace", "favorite", "addproduct", "productdetail"];
const bottomNavScreens = ["home", "marketplace", "favorite", "addproduct", "settings"];

/**
 * Props de MainLayout.
 */
interface MainLayoutProps {
  /** Nombre de la pantalla activa, usado para mostrar u ocultar header y nav. */
  screen: string;
  /** Usuario autenticado para pasar al header y al perfil. */
  currentUser: UserProfile;
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Propaga el término de búsqueda hacia {@link App}. */
  onSearch: (term: string) => void;
  /** Contenido de la pantalla activa. */
  children: ReactNode;
}

/**
 * Layout principal de la app autenticada.
 *
 * Compone {@link AppHeader} o {@link ProfileHeader} según la pantalla activa,
 * envuelve el contenido en {@link AppLayout} y muestra {@link BottomNav}
 * en las pantallas que lo requieren.
 * Usado directamente en {@link App}.
 *
 * @param screen - Pantalla activa.
 * @param currentUser - Usuario autenticado.
 * @param onNavigate - Navega a otra pantalla.
 * @param onSearch - Propaga el término de búsqueda.
 * @param children - Contenido de la pantalla.
 */
function MainLayout({ screen, currentUser, onNavigate, onSearch, children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-beige">

      {headerScreens.includes(screen) && (
        <AppHeader currentUser={currentUser} onSearch={onSearch} />
      )}

      {screen === "settings" && (
        <ProfileHeader
          name={currentUser.username}
          email={currentUser.email}
          avatar={currentUser.avatar}
        />
      )}

      <AppLayout>
        {children}
      </AppLayout>

      {bottomNavScreens.includes(screen) && (
        <BottomNav onNavigate={onNavigate} currentScreen={screen} />
      )}

    </div>
  );
}

export default MainLayout;
