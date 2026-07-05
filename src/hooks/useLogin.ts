import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../contexts/AuthContext";
import { notify } from "../components/data/NotificationStore";
import { loginSchema } from "../schemas/auth.schema";

/**
 * Hook para gestionar el estado y lógica del formulario de inicio de sesión.
 *
 * Valida el formato con {@link loginSchema} y luego llama a `AuthContext.login`.
 * Usado en {@link Login}.
 *
 * @param onLogin - Se ejecuta al autenticar exitosamente.
 * @returns `fields`/`setters` — campos del formulario,
 * `handleLogin` — valida y autentica al usuario.
 */
export function useLogin(onLogin: () => void) {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.loginError.message";
      notify.warning(t("notifications.loginError.title"), t(msg));
      return;
    }

    try {
      await login({ email, password });
      onLogin();
    } catch {
      notify.error(t("notifications.loginError.title"), t("notifications.loginError.message"));
    }
  }

  return {
    fields: { email, password },
    setters: { setEmail, setPassword },
    handleLogin,
  };
}
