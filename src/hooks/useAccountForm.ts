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
  const { updateUser } = useAuthContext();  // para actualizar el usuario en el contexto y localStorage
  const [avatar,     setAvatar]     = useState(currentUser.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);  // el File real para subir
  const [username,   setUsername]   = useState(currentUser.username);
  const [email,      setEmail]      = useState(currentUser.email);
  const [university, setUniversity] = useState(currentUser.university ?? "");
  const [career,     setCareer]     = useState(currentUser.career ?? "");
  const [bio,        setBio]        = useState(currentUser.contact?.bio ?? "");
  const [phone,      setPhone]      = useState(currentUser.contact?.phone ?? currentUser.phone ?? "");
  const [instagram,  setInstagram]  = useState(currentUser.contact?.instagram ?? "");
  const [telegram,   setTelegram]   = useState(currentUser.contact?.telegram ?? "");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");

  /**
   * Valida y persiste los cambios del perfil.
   *
   * Si se ingresó una nueva contraseña, verifica que la contraseña actual
   * coincida y que la confirmación sea idéntica antes de guardar.
   */
  const handleSave = async () => {
    // Validar con Zod antes de hacer fetch
    const result = accountSchema.safeParse({ username, email, phone, university, career, password, confirm });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.accountRequired.message";
      notify.warning(t("notifications.accountRequired.title"), t(msg));
      return;
    }

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

      // Actualizar el contexto global (esto actualiza el header, el avatar en toda la app)
      updateUser(finalUser);
      notify.success(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
      onUpdate(apiUserToProfile(finalUser));
    } catch {
      notify.error(t("notifications.accountSaved.title"), t("notifications.accountSaved.message"));
    }
  };

  return {
    fields: {
      avatar, username, email, phone, university, career,
      bio, instagram, telegram,
      currentPassword: "", password, confirm
    },
    setters: {
      setAvatar,
      setAvatarFile,  // ← NUEVO: guarda el File real cuando el usuario elige foto
      setUsername, setEmail, setPhone, setUniversity, setCareer,
      setBio, setInstagram, setTelegram,
      setCurrentPassword: () => {},  // no se usa con el backend
      setPassword, setConfirm
    },
    handleSave,
  };
}
