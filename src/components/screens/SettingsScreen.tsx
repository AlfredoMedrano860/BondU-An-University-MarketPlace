import { useState } from "react";
import { Contrast, LogOut, CircleUserRound, Package, Bell, Globe } from "lucide-react";
import ProfileHeader from "../templates/ProfileHeader";
import BottomNav from "../templates/BottomNav";
import AboutAccordion from "../templates/AboutAccordion";
import FaqAccordion from "../templates/FaqAccordion";
import TermsAccordion from "../templates/TermsAccordion";
import { SettingRow, Toggle, SectionTitle } from "../templates/SettingRow";
import { logout } from "../data/AuthStore";
import type { UserProfile } from "../data/UserProfile";

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
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(currentUser.notifications ?? true);
  const [language, setLanguage] = useState(currentUser.language ?? "es");

  /**
   * Cierra la sesión del usuario en el AuthStore y redirige al flujo de login.
   */
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="h-screen bg-beige flex flex-col">

      {/* ── HEADER ── avatar, nombre y correo del usuario */}
      <ProfileHeader
        name={currentUser.username}
        email={currentUser.email}
        avatar={currentUser.avatar}
      />

      {/* ── SECCIONES ── */}
      <div className="flex flex-col gap-3 px-5 pt-4 flex-1 overflow-y-auto no-scrollbar pb-32">

        {/* Mi Perfil */}
        <SectionTitle title="Mi Perfil" />
        <div className="bg-white-app rounded-3xl">
          <SettingRow icon={CircleUserRound} label="Cuenta" onClick={() => onNavigate("account")} />
          <SettingRow icon={Package} label="Mis Productos" onClick={() => onNavigate("myproducts")} border={false} />
        </div>

        {/* Preferencias ── darkMode sin persistencia aún */}
        <SectionTitle title="Preferencias" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={Contrast} label="Tema oscuro" border={false}
            right={<Toggle value={darkMode} onToggle={() => setDarkMode(!darkMode)} />}
          />
          <SettingRow icon={Bell} label="Notificaciones" border={false}
            right={<Toggle value={notifications} onToggle={() => setNotifications(!notifications)} />}
          />
          <SettingRow icon={Globe} label="Idioma" border={false}
            right={
              <button
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="text-sm font-bold color-primary"
              >
                {language === "es" ? "Español" : "English"}
              </button>
            }
          />
        </div>

        {/* Información */}
        <SectionTitle title="Información" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <FaqAccordion />
          <AboutAccordion />
          <TermsAccordion />
        </div>

        {/* Sesión ── eliminar cuenta pendiente de implementar */}
        <SectionTitle title="Sesión" />
        <div className="bg-white-app rounded-3xl divide-y divide-beige">
          <SettingRow icon={LogOut} label="Cerrar Sesión" onClick={handleLogout} danger border={false} />
          <SettingRow icon={LogOut} label="Eliminar Cuenta" danger border={false} right={null} />
        </div>

      </div>

      {/* ── NAVEGACIÓN ── */}
      <BottomNav onNavigate={onNavigate} currentScreen="settings" />

    </div>
  );
}

export default SettingsScreen;