import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "../components/data/AuthStore";
import { notify } from "../components/data/NotificationStore";
import type { UserProfile } from "../components/data/UserProfile";

/**
 * Hook para manejar el estado y lógica del formulario de edición de cuenta.
 *
 * Inicializa los campos con los datos del usuario actual y valida
 * que las contraseñas coincidan antes de guardar.
 * Usado en {@link AccountScreen}.
 *
 * @param currentUser - Usuario actualmente autenticado cuyos datos se precargan.
 * @param onUpdate - Se ejecuta al guardar exitosamente con el perfil actualizado.
 * @returns `fields` — valores actuales de los campos,
 * `setters` — funciones para actualizar cada campo,
 * `status` — estado de error,
 * `handleSave` — función que valida y guarda los cambios.
 */
export function useAccountForm(currentUser: UserProfile, onUpdate: (user: UserProfile) => void) {
  const { t } = useTranslation();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone ?? "");
  const [university, setUniversity] = useState(currentUser.university ?? "");
  const [career, setCareer] = useState(currentUser.career ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  /**
   * Valida y guarda los cambios del perfil en el AuthStore.
   * Llama a {@link onUpdate} con el perfil actualizado si es exitoso.
   */
  const handleSave = () => {
    if (!username.trim() || !email.trim()) {
      notify.warning(t("notifications.accountRequired.title"), t("notifications.accountRequired.message"));
      return;
    }

    if (password && password !== confirm) {
      notify.warning(t("notifications.passwordMismatch.title"), t("notifications.passwordMismatch.message"));
      return;
    }

    const fields: Partial<UserProfile> = { username, email, phone, university, career };
    if (password) fields.password = password;

    const updated = updateUser(fields);
    if (updated) {
      notify.success(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
      onUpdate(updated);
    }
  };

  return {
    fields: { username, email, phone, university, career, password, confirm },
    setters: { setUsername, setEmail, setPhone, setUniversity, setCareer, setPassword, setConfirm },
    handleSave,
  };
}
