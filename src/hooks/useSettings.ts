import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../components/data/UserProfile";
import { usersService } from "../services/users";
import { useAuthContext } from "../contexts/AuthContext";
import { notify } from "../components/data/NotificationStore";
import { tokenStorage } from "../utils/token";
import i18n from "../i18n";

export function useSettings(currentUser: UserProfile, onLogout: () => void) {
  const { t } = useTranslation();
  const { logout } = useAuthContext();    // ← AuthContext ya conectado
  const [notifications, setNotifications] = useState(currentUser.notifications ?? true);
  const [dialog, setDialog] = useState<"logout" | "deleteAccount" | null>(null);

  const handleConfirmLogout = () => {
    setDialog(null);
    notify.info(t("notifications.loggedOut.title"), t("notifications.loggedOut.message"));
    logout();      // limpia el token del localStorage y el estado
    onLogout();    // navega a "welcome" en App.tsx
  };

  // Eliminar cuenta: primero borra en el backend, luego hace logout
  const handleConfirmDelete = async () => {
    setDialog(null);
    try {
      await usersService.remove(currentUser.id);
    } catch {
      // Si falla la eliminación en el backend, igual hace logout
      // (no queremos dejar al usuario atrapado en la pantalla)
    }
    logout();
    onLogout();
  };

  // Cambiar idioma y guardarlo en las preferencias del usuario en la BD
  const toggleLanguage = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next).then(() => {
      // Guardamos en localStorage para esta sesión
      tokenStorage.setLang(next);
      // Guardamos en la BD para que persista en futuros logins
      usersService.updatePreferences(currentUser.id, { language: next }).catch(() => {});
      notify.info(t("notifications.languageChanged.title"), t("notifications.languageChanged.message"));
    });
  };

  const handleDarkMode = () => {
    notify.info(t("notifications.darkModeComingSoon.title"), t("notifications.darkModeComingSoon.message"));
  };

  // Cambiar notificaciones y guardarlas en la BD
  const handleNotificationsToggle = async () => {
    const next = !notifications;
    setNotifications(next);
    try {
      await usersService.updatePreferences(currentUser.id, { notifications: next });
      if (next) {
        notify.success(t("notifications.notificationsEnabled.title"), t("notifications.notificationsEnabled.message"));
      } else {
        notify.warning(t("notifications.notificationsDisabled.title"), t("notifications.notificationsDisabled.message"));
      }
    } catch {
      // Si falla, revertir el toggle visual
      setNotifications(!next);
      notify.error(t("notifications.notificationsEnabled.title"), t("notifications.notificationsDisabled.message"));
    }
  };

  return {
    notifications,
    dialog,
    setDialog,
    handleConfirmLogout,
    handleConfirmDelete,
    toggleLanguage,
    handleDarkMode,
    handleNotificationsToggle,
  };
}