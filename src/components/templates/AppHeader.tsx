import SearchBar from "./SearchBar";
import type { UserProfile } from "../data/UserProfile";

/**
 * Props de AppHeader.
 * @see UserProfile
 */
interface AppHeaderProps {
  /** Usuario actualmente autenticado. */
  currentUser: UserProfile;
}

/**
 * Encabezado principal de la aplicación.
 *
 * Muestra el avatar, nombre del usuario y la barra de búsqueda.
 * Aparece en HomeScreen, MarketPlaceScreen y FavoriteScreen.
 *
 * @param currentUser - Usuario actualmente autenticado.
 */
function AppHeader({ currentUser }: AppHeaderProps) {
  return (
    <div className="bg-primary px-6 pt-10 pb-6 text-white">

      {/* ── USUARIO ── avatar y nombre */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={currentUser.avatar} alt="user" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm">Welcome back!</p>
          <h2 className="text-xl font-bold">{currentUser.username}</h2>
        </div>
      </div>

      {/* ── BÚSQUEDA ── funcionalidad pendiente de implementar */}
      <SearchBar />

    </div>
  );
}

export default AppHeader;