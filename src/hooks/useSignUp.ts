import { useState } from "react";
import { useTranslation } from "react-i18next";
import { authService } from "../services/auth";
import { notify } from "../components/data/NotificationStore";
import { registerSchema } from "../schemas/auth.schema";

/**
 * Hook para gestionar el estado y lógica del formulario de registro.
 *
 * Valida el formato con {@link registerSchema} y luego llama a `authService.register`.
 * Usado en {@link SignUp}.
 *
 * @param onRegister - Se ejecuta al registrarse exitosamente.
 * @returns `fields`/`setters` — campos del formulario,
 * `handleRegister` — valida y registra al usuario.
 */
export function useSignUp(onRegister: () => void) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const result = registerSchema.safeParse({ username, email, password });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.signupError.message";
      notify.warning(t("notifications.signupError.title"), t(msg));
      return;
    }

    try {
      await authService.register({ username, email, password });
      notify.success(t("notifications.signupSuccess.title"), t("notifications.signupSuccess.message"));
      onRegister();
    } catch {
      notify.error(t("notifications.signupError.title"), t("notifications.signupError.message"));
    }
  }

  return {
    fields: { username, email, password },
    setters: { setUsername, setEmail, setPassword },
    handleRegister,
  };
}
