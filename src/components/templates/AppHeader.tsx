import { useTranslation } from "react-i18next";
import { SlidersIcon } from "@phosphor-icons/react";
import SearchBar from "../ui/SearchBar";
import CircleButton from "../ui/CircleButton";
import type { UserProfile } from "../data/UserProfile";

/**
 * Props de AppHeader.
 */
interface AppHeaderProps {
  /** Usuario autenticado cuyo avatar y nombre se muestran. */
  currentUser: UserProfile;
  /** Callback de búsqueda; si se omite el buscador no emite eventos. */
  onSearch?: (term: string) => void;
  /** Abre el panel de filtros. */
  onFilterOpen?: () => void;
}

/**
 * Cabecera principal de la aplicación.
 *
 * Muestra el avatar y nombre del usuario, un buscador y el botón de filtros.
 * Es responsiva: apila verticalmente en móvil y en fila en `md+`.
 * Usado en {@link AppShellLayout}.
 *
 * @param currentUser - Usuario cuyo avatar y nombre se muestran.
 * @param onSearch - Callback invocado al escribir en el buscador.
 * @param onFilterOpen - Abre el panel lateral de filtros.
 */
function AppHeader({ currentUser, onSearch, onFilterOpen }: AppHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-primary px-6 sm:px-10 md:px-16 lg:px-20 pt-10 pb-6 text-white shadow-md">

      <div className="flex flex-col md:flex-row md:items-center md:gap-8">

        <div className="flex items-center gap-3 md:shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={currentUser.avatar} alt={currentUser.username} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm">{t("home.welcomeBack")}</p>
            <h2 className="text-xl font-bold">{currentUser.username}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0 md:flex-1">
          <SearchBar onSearch={onSearch} />
          <CircleButton variant="aux" onClick={onFilterOpen} shrink>
            <SlidersIcon size={25} color="white" weight="bold" />
          </CircleButton>
        </div>

      </div>

    </div>
  );
}

export default AppHeader;
