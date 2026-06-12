import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Contrast, LogOut, CircleUserRound, Package, Bell, Globe } from "lucide-react";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../templates/BottomNav";
import AboutAccordion from "../templates/AboutAccordion";
import FaqAccordion from "../templates/FaqAccordion";
import TermsAccordion from "../templates/TermsAccordion";
import { SettingRow, Toggle, SectionTitle } from "../templates/SettingRow";
import { logout } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";
import i18n from "../../i18n";

/**
 * Props de SettingsScreen.
 * @see UserProfile
 */
interface SettingsScreenProps {
  /** Navega a otra pantalla por nombre. */
  onNavigate: (screen: string) => void;
  /** Usuario actualmente autenticado. */
  currentUser: UserProfile;
  /** Se ejecuta al cerrar sesión exitosamente. */
  onLogout: () => void;
}

/**
 * Pantalla de configuración y perfil del usuario.
 *
 * Agrupa las opciones en cuatro secciones:
 * - **Mi Perfil**: acceso a cuenta y productos del usuario.
 * - **Preferencias**: tema, notificaciones e idioma.
 * - **Información**: FAQ, acerca de y términos y condiciones.
 * - **Sesión**: cerrar sesión y eliminar cuenta.
 *
 * @param onNavigate - Navega a otra pantalla por nombre.
 * @param currentUser - Usuario actualmente autenticado.
 * @param onLogout - Se ejecuta al cerrar sesión exitosamente.
 */
function SettingsScreen({ onNavigate, currentUser, onLogout }: SettingsScreenProps) {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(currentUser.notifications ?? true);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const toggleLanguage = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
  };

  return (
    <div className="h-screen bg-beige flex flex-col">

      {/* ── HEADER ── */}
      <ProfileHeader
        name={currentUser.username}
        email={currentUser.email}
        avatar={currentUser.avatar}
      />

      {/* ── SECCIONES ── */}
      <div className="flex flex-col gap-3 px-6 sm:px-10 md:px-16 lg:px-20 pt-4 flex-1 overflow-y-auto no-scrollbar pb-32">

        <SectionTitle title={t("settings.myProfile")} />
        <div className="bg-white-app rounded-3xl">
          <SettingRow icon={CircleUserRound} label={t("settings.profile")} onClick={() => onNavigate("profile")} />
          <SettingRow icon={Package} label={t("settings.myProducts")} onClick={() => onNavigate("myproducts")} border={false} />
        </div>

        <SectionTitle title={t("settings.preferences")} />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={Contrast} label={t("settings.darkTheme")} border={false}
            right={<Toggle value={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
          />
          <SettingRow icon={Bell} label={t("settings.notifications")} border={false}
            right={<Toggle value={notifications} onToggle={() => setNotifications(!notifications)} />}
          />
          <SettingRow icon={Globe} label={t("settings.language")} border={false}
            right={
              <button onClick={toggleLanguage} className="text-sm font-bold color-primary">
                {t("settings.langLabel")}
              </button>
            }
          />
        </div>

        <SectionTitle title={t("settings.information")} />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <FaqAccordion />
          <AboutAccordion />
          <TermsAccordion />
        </div>

        <SectionTitle title={t("settings.session")} />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={LogOut} label={t("settings.logout")} onClick={handleLogout} danger border={false} />
          <SettingRow icon={LogOut} label={t("settings.deleteAccount")} danger border={false} right={null} />
        </div>

      </div>

      <BottomNav onNavigate={onNavigate} currentScreen="settings" />

    </div>
  );
}

export default SettingsScreen;