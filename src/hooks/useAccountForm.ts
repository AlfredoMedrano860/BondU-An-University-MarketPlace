import { useState } from "react";
import { updateUser } from "../components/data/AuthStore";
import type { UserProfile } from "../components/data/UserProfile";

/**
 * Hook para manejar el estado y lógica del formulario de edición de cuenta.
 *
 * Inicializa los campos con los datos del usuario actual y valida
 * que las contraseñas coincidan antes de guardar.
 * El mensaje de confirmación desaparece automáticamente después de 2 segundos.
 * Usado en {@link AccountScreen}.
 *
 * @param currentUser - Usuario actualmente autenticado cuyos datos se precargan.
 * @param onUpdate - Se ejecuta al guardar exitosamente con el perfil actualizado.
 * @returns `fields` — valores actuales de los campos,
 * `setters` — funciones para actualizar cada campo,
 * `status` — estado de error y confirmación de guardado,
 * `handleSave` — función que valida y guarda los cambios.
 */
export function useAccountForm(currentUser: UserProfile, onUpdate: (user: UserProfile) => void) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone ?? "");
  const [university, setUniversity] = useState(currentUser.university ?? "");
  const [career, setCareer] = useState(currentUser.career ?? "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  /**
   * Valida y guarda los cambios del perfil en el AuthStore.
   * Muestra error si las contraseñas no coinciden.
   * Llama a {@link onUpdate} con el perfil actualizado si es exitoso.
   */
  const handleSave = () => {
    if (password && password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const fields: Partial<UserProfile> = { username, email, phone, university, career };
    if (password) fields.password = password;

    const updated = updateUser(fields);
    if (updated) {
      setError("");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      onUpdate(updated);
    }
  };

  return {
    fields: { username, email, phone, university, career, password, confirm },
    setters: { setUsername, setEmail, setPhone, setUniversity, setCareer, setPassword, setConfirm },
    status: { error, saved },
    handleSave,
  };
}