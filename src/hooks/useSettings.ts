import { useState } from "react";
import { useTranslation } from "react-i18next";
import { logout, deleteUser } from "../components/data/AuthStore";
import { notify } from "../components/data/NotificationStore";
import type { UserProfile } from "../components/data/UserProfile";
// Using the i18n instance provided by `useTranslation()` instead of a top-level import

/**
 * Lógica de estado y acciones de {@link SettingsScreen}.
 */
export function useSettings(currentUser: UserProfile, onLogout: () => void) {
  const { t, i18n } = useTranslation();
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
