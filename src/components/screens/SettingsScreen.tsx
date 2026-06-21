import { useTranslation } from "react-i18next";
import { Contrast, LogOut, CircleUserRound, Package, Bell, Globe } from "lucide-react";
import AboutAccordion from "../templates/AboutAccordion";
import FaqAccordion from "../templates/FaqAccordion";
import TermsAccordion from "../templates/TermsAccordion";
import { SettingRow } from "../templates/SettingRow";
import { SettingsSection } from "../templates/SettingsSection";
import Toggle from "../ui/Toggle";
import CloseOrDelete from "../templates/CloseOrDelete";
import type { UserProfile } from "../data/UserProfile";
import { useSettings } from "../../hooks/useSettings";

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
  const { notifications, dialog, setDialog, handleConfirmLogout, handleConfirmDelete, toggleLanguage, handleDarkMode, handleNotificationsToggle } = useSettings(currentUser, onLogout);

  return (
    <>
    <div className="h-full bg-beige overflow-y-auto no-scrollbar pb-28">

      {/* ── SECCIONES ── */}
      <div className="flex flex-col gap-3 px-6 sm:px-10 md:px-16 lg:px-20 pt-4">

        <SettingsSection title={t("settings.myProfile")}>
          <SettingRow icon={CircleUserRound} label={t("settings.profile")} onClick={() => onNavigate("profile")} border={false} />
          <SettingRow icon={Package} label={t("settings.myProducts")} onClick={() => onNavigate("myproducts")} border={false} />
        </SettingsSection>

        <SettingsSection title={t("settings.preferences")}>
          <SettingRow icon={Contrast} label={t("settings.darkTheme")} border={false}
            right={<Toggle value={false} onToggle={handleDarkMode} />}
          />
          <SettingRow icon={Bell} label={t("settings.notifications")} border={false}
            right={<Toggle value={notifications} onToggle={handleNotificationsToggle} />}
          />
          <SettingRow icon={Globe} label={t("settings.language")} border={false}
            right={
              <button onClick={toggleLanguage} className="text-sm font-bold color-primary hover:opacity-75 transition-opacity">
                {t("settings.langLabel")}
              </button>
            }
          />
        </SettingsSection>

        <SettingsSection title={t("settings.information")}>
          <FaqAccordion />
          <AboutAccordion />
          <TermsAccordion />
        </SettingsSection>

        <SettingsSection title={t("settings.session")}>
          <SettingRow icon={LogOut} label={t("settings.logout")} onClick={() => setDialog("logout")} danger border={false} />
          <SettingRow icon={LogOut} label={t("settings.deleteAccount")} onClick={() => setDialog("deleteAccount")} danger border={false} />
        </SettingsSection>

      </div>

    </div>

    {dialog === "logout" && (
      <CloseOrDelete
        variant="logout"
        title={t("dialogs.logout.title")}
        message={t("dialogs.logout.message")}
        cancelText={t("dialogs.logout.no")}
        confirmText={t("dialogs.logout.confirm")}
        icon={t("dialogs.logout.icon")}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmLogout}
      />
    )}

    {dialog === "deleteAccount" && (
      <CloseOrDelete
        variant="delete"
        title={t("dialogs.deleteAccount.title")}
        message={t("dialogs.deleteAccount.message")}
        cancelText={t("dialogs.deleteAccount.no")}
        confirmText={t("dialogs.deleteAccount.confirm")}
        icon={t("dialogs.deleteAccount.icon")}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmDelete}
      />
    )}
    </>
  );
}

export default SettingsScreen;