import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "../components/data/AuthStore";
import { notify } from "../components/data/NotificationStore";
import type { UserProfile } from "../components/data/UserProfile";

/**
 * Hook para gestionar el estado y lógica del formulario de edición de perfil.
 *
 * Inicializa los campos con los datos del usuario actual. Si el usuario
 * intenta cambiar la contraseña, primero valida la contraseña actual antes
 * de permitir el guardado. Usado en {@link AccountScreen}.
 *
 * @param currentUser - Perfil del usuario autenticado a editar.
 * @param onUpdate - Se ejecuta con el perfil actualizado tras guardar exitosamente.
 * @returns `fields` — valores actuales de cada campo del formulario,
 * `setters` — funciones para actualizar cada campo,
 * `handleSave` — valida y persiste los cambios del perfil.
 */
export function useAccountForm(currentUser: UserProfile, onUpdate: (user: UserProfile) => void) {
  const { t } = useTranslation();
  const [avatar,          setAvatar]          = useState(currentUser.avatar);
  const [username,        setUsername]        = useState(currentUser.username);
  const [email,           setEmail]           = useState(currentUser.email);
  const [university,      setUniversity]      = useState(currentUser.university ?? "");
  const [career,          setCareer]          = useState(currentUser.career ?? "");
  const [bio,             setBio]             = useState(currentUser.contact?.bio ?? "");
  const [phone,           setPhone]           = useState(currentUser.contact?.phone ?? currentUser.phone ?? "");
  const [instagram,       setInstagram]       = useState(currentUser.contact?.instagram ?? "");
  const [telegram,        setTelegram]        = useState(currentUser.contact?.telegram ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password,        setPassword]        = useState("");
  const [confirm,         setConfirm]         = useState("");

  /**
   * Valida y persiste los cambios del perfil.
   *
   * Si se ingresó una nueva contraseña, verifica que la contraseña actual
   * coincida y que la confirmación sea idéntica antes de guardar.
   */
  const handleSave = () => {
    if (!username.trim() || !email.trim()) {
      notify.warning(t("notifications.accountRequired.title"), t("notifications.accountRequired.message"));
      return;
    }

    if (password) {
      if (currentPassword !== currentUser.password) {
        notify.error(t("notifications.wrongPassword.title"), t("notifications.wrongPassword.message"));
        return;
      }
      if (password !== confirm) {
        notify.warning(t("notifications.passwordMismatch.title"), t("notifications.passwordMismatch.message"));
        return;
      }
    }

    const contact = {
      bio,
      phone:     phone     || undefined,
      instagram: instagram || undefined,
      telegram:  telegram  || undefined,
    };

    const patch: Partial<UserProfile> = { avatar, username, email, phone, university, career, contact };
    if (password) patch.password = password;

    const updated = updateUser(patch);
    if (updated) {
      notify.success(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
      onUpdate(updated);
    }
  };

  return {
    fields:  { avatar, username, email, phone, university, career, bio, instagram, telegram, currentPassword, password, confirm },
    setters: { setAvatar, setUsername, setEmail, setPhone, setUniversity, setCareer, setBio, setInstagram, setTelegram, setCurrentPassword, setPassword, setConfirm },
    handleSave,
  };
}
