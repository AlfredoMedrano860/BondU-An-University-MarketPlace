import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { UserProfile } from "../components/data/UserProfile";
import { usersService } from "../services/users";
import { apiUserToProfile } from "../utils/adapters";
import { notify } from "../components/data/NotificationStore";
import { accountSchema } from "../schemas/account.schema";
import { useAuthContext } from "../contexts/AuthContext"; 

/**
 * Hook para gestionar el estado y lógica del formulario de edición de perfil.
 *
 * Inicializa los campos con los datos del usuario actual. Si el usuario
 * intenta cambiar la contraseña, primero valida la contraseña actual antes
 * de permitir el guardado. Usado en {@link Account}.
 *
 * @param currentUser - Perfil del usuario autenticado a editar.
 * @param onUpdate - Se ejecuta con el perfil actualizado tras guardar exitosamente.
 * @returns `fields` — valores actuales de cada campo del formulario,
 * `setters` — funciones para actualizar cada campo,
 * `handleSave` — valida y persiste los cambios del perfil.
 */
export function useAccountForm(currentUser: UserProfile, onUpdate: (user: UserProfile) => void) {
  const { t } = useTranslation();
  const { updateUser } = useAuthContext();  // para actualizar el usuario en el contexto y localStorage
  const [avatar,     setAvatar]     = useState(currentUser.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);  // el File real para subir
  const [username,   setUsername]   = useState(currentUser.username);
  const [email,      setEmail]      = useState(currentUser.email);
  const [university, setUniversity] = useState(currentUser.university ?? "");
  const [career,     setCareer]     = useState(currentUser.career ?? "");
  const [bio,        setBio]        = useState(currentUser.contact?.bio ?? "");
  const [phone,      setPhone]      = useState(currentUser.phone ?? "");
  const [instagram,  setInstagram]  = useState(currentUser.contact?.instagram ?? "");
  const [telegram,   setTelegram]   = useState(currentUser.contact?.telegram ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");
  const [isSaving,   setIsSaving]   = useState(false);

  /**
   * Valida y persiste los cambios del perfil.
   *
   * Si se ingresó una nueva contraseña, verifica que la contraseña actual
   * coincida y que la confirmación sea idéntica antes de guardar.
   */
  const handleSave = async () => {
    if (isSaving) return;
    // Validar con Zod antes de hacer fetch
    const result = accountSchema.safeParse({ username, email, phone, university, career, currentPassword, password, confirm });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.accountRequired.message";
      notify.warning(t("notifications.accountRequired.title"), t(msg));
      return;
    }

    setIsSaving(true);
    try {
      // Guardar datos del usuario Y del contacto en paralelo (más rápido)
      const [updated] = await Promise.all([
        usersService.update(currentUser.id, {
          username,
          email,
          phone:      phone      || undefined,
          university: university || undefined,
          career:     career     || undefined,
        }),
        usersService.updateContact(currentUser.id, {
          bio:       bio       || undefined,
          instagram: instagram || undefined,
          telegram:  telegram  || undefined,
        }),
      ]);

      // Si el usuario eligió una foto nueva, subirla
      let finalUser = updated;
      if (avatarFile) {
        finalUser = await usersService.uploadAvatar(currentUser.id, avatarFile);
      }

      // Reflejar los cambios ya guardados en la UI de inmediato, sin esperar
      // al cambio de contraseña: si este falla, el resto no debe perderse de vista.
      updateUser(finalUser);
      onUpdate(apiUserToProfile(finalUser));

      // Si ingresó una nueva contraseña, cambiarla por separado (requiere la actual)
      let passwordChanged = true;
      if (password) {
        try {
          await usersService.changePassword(currentUser.id, { currentPassword, newPassword: password });
          setCurrentPassword("");
          setPassword("");
          setConfirm("");
        } catch (err: any) {
          passwordChanged = false;
          const status = err?.response?.status;
          const msg = status === 400
            ? t("account.errors.currentPasswordIncorrect")
            : t("notifications.passwordChangeError.message");
          notify.error(t("notifications.passwordChangeError.title"), msg);
        }
      }

      if (passwordChanged) {
        notify.success(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
      }
    } catch {
      notify.error(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
    } finally {
      setIsSaving(false);
    }
  };

  return {
    fields: {
      avatar, username, email, phone, university, career,
      bio, instagram, telegram,
      currentPassword, password, confirm
    },
    setters: {
      setAvatar,
      setAvatarFile,  // guarda el File real para subirlo al backend al guardar
      setUsername, setEmail, setPhone, setUniversity, setCareer,
      setBio, setInstagram, setTelegram,
      setCurrentPassword,
      setPassword, setConfirm
    },
    handleSave,
    isSaving,
  };
}
