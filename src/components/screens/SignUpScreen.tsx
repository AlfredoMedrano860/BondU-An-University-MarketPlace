import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import InputSpace from "../ui/InputSpace";
import { register as registerUser } from "../data/AuthStore";
import { notify } from "../data/NotificationStore";
import AuthLayout from "../layout/AuthLayout";
import AuthHeader from "../templates/AuthHeader";

/**
 * Props de SignUpScreen.
 */
interface SignUpScreenProps {
  /** Navega hacia atrás a {@link LoginScreen}. */
  onBack: () => void;
  /** Se ejecuta al registrarse exitosamente. */
  onRegister: () => void;
}

/**
 * Pantalla de registro de nuevo usuario con nombre, correo y contraseña.
 *
 * Llama a `register` del {@link AuthStore} y emite notificación según el resultado.
 *
 * @param onBack - Navega hacia atrás.
 * @param onRegister - Callback tras registro exitoso.
 */
function SignUpScreen({ onBack, onRegister }: SignUpScreenProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const result = registerUser(username, email, password);
    if (result.ok) {
      notify.success(t("notifications.signupSuccess.title"), t("notifications.signupSuccess.message"));
      onRegister();
    } else {
      notify.error(t("notifications.signupError.title"), t("notifications.signupError.message"));
    }
  }

  return (
    <AuthLayout>
      <AuthHeader onBack={onBack} title={t("signup.title")} description={t("signup.description")} />

      <InputSpace type="text" placeholder={t("signup.username")} hint="Tu nombre completo" value={username} onChange={setUsername} />
      <InputSpace type="text" placeholder={t("signup.email")} hint="ejemplo@gmail.com" value={email} onChange={setEmail} />
      <InputSpace type="password" placeholder={t("signup.password")} hint="Mínimo 8 caracteres" value={password} onChange={setPassword} />

      <AppButton text={t("signup.submit")} onClick={handleRegister} />

      <p className="text-center text-sm text-gray-400">
        {t("signup.alreadyHaveAccount")}{" "}
        <button onClick={onBack} className="color-primary font-bold hover:underline">{t("signup.loginLink")}</button>
      </p>

    </AuthLayout>
  );
}

export default SignUpScreen;
