import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Contrast, LogOut, CircleUserRound, Package, Bell, Globe } from "lucide-react";
import AboutAccordion from "../templates/AboutAccordion";
import FaqAccordion from "../templates/FaqAccordion";
import TermsAccordion from "../templates/TermsAccordion";
import { SettingRow, Toggle, SectionTitle } from "../templates/SettingRow";
import { logout, deleteUser } from "../data/AuthStore";
import CloseOrDelete from "../templates/CloseOrDelete";
import type { UserProfile } from "../data/UserProfile";
import i18n from "../../i18n";
import { notify } from "../data/NotificationStore";

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
  const [notifications, setNotifications] = useState(currentUser.notifications ?? true);
  const [dialog, setDialog] = useState<"logout" | "deleteAccount" | null>(null);

  const handleConfirmLogout = () => {
    setDialog(null);
    notify.info(t("notifications.loggedOut.title"), t("notifications.loggedOut.message"));
    logout();
    onLogout();
  };

  const handleConfirmDelete = () => {
    setDialog(null);
    deleteUser();
    onLogout();
  };

  const toggleLanguage = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next).then(() => {
      notify.info(t("notifications.languageChanged.title"), t("notifications.languageChanged.message"));
    });
  };

  const handleDarkMode = () => {
    notify.info(t("notifications.darkModeComingSoon.title"), t("notifications.darkModeComingSoon.message"));
  };

  const handleNotificationsToggle = () => {
    const next = !notifications;
    setNotifications(next);
    if (next) {
      notify.success(t("notifications.notificationsEnabled.title"), t("notifications.notificationsEnabled.message"));
    } else {
      notify.warning(t("notifications.notificationsDisabled.title"), t("notifications.notificationsDisabled.message"));
    }
  };

  return (
    <>
    <div className="h-full bg-beige overflow-y-auto no-scrollbar pb-28">

      {/* ── SECCIONES ── */}
      <div className="flex flex-col gap-3 px-6 sm:px-10 md:px-16 lg:px-20 pt-4">

        <SectionTitle title={t("settings.myProfile")} />
        <div className="bg-white-app rounded-3xl">
          <SettingRow icon={CircleUserRound} label={t("settings.profile")} onClick={() => onNavigate("profile")} />
          <SettingRow icon={Package} label={t("settings.myProducts")} onClick={() => onNavigate("myproducts")} border={false} />
        </div>

        <SectionTitle title={t("settings.preferences")} />
        <div className="bg-white-app rounded-3xl divide-y divide-gray-200">
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
        </div>

        <SectionTitle title={t("settings.information")} />
        <div className="bg-white-app rounded-3xl divide-y divide-gray-200">
          <FaqAccordion />
          <AboutAccordion />
          <TermsAccordion />
        </div>

        <SectionTitle title={t("settings.session")} />
        <div className="bg-white-app rounded-3xl divide-y divide-gray-200">
          <SettingRow icon={LogOut} label={t("settings.logout")} onClick={() => setDialog("logout")} danger border={false} />
          <SettingRow icon={LogOut} label={t("settings.deleteAccount")} onClick={() => setDialog("deleteAccount")} danger border={false} />
        </div>

      </div>

    </div>

    {dialog === "logout" && (
      <CloseOrDelete
        title={t("dialogs.logout.title")}
        message={t("dialogs.logout.message")}
        cancelText={t("dialogs.logout.no")}
        confirmText={t("dialogs.logout.confirm")}
        color={t("dialogs.logout.color")}
        icon={t("dialogs.logout.icon")}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmLogout}
      />
    )}

    {dialog === "deleteAccount" && (
      <CloseOrDelete
        title={t("dialogs.deleteAccount.title")}
        message={t("dialogs.deleteAccount.message")}
        cancelText={t("dialogs.deleteAccount.no")}
        confirmText={t("dialogs.deleteAccount.confirm")}
        color={t("dialogs.deleteAccount.color")}
        icon={t("dialogs.deleteAccount.icon")}
        onCancel={() => setDialog(null)}
        onConfirm={handleConfirmDelete}
      />
    )}
    </>
  );
}

export default SettingsScreen;