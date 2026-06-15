import { useState } from "react";
import { useTranslation } from "react-i18next";
import iconoPerfil from "../../assets/imgs/IconoPerfil.png";
import PrimaryButton from "../ui/PrimaryButton";
import InputSpace from "../ui/InputSpace";
import { register as registerUser } from "../data/AuthStore";
import { notify } from "../data/NotificationStore";
import AuthLayout from "../layout/AuthLayout";

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
    <AuthLayout onBack={onBack}>
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 py-10">
      <div className="max-w-sm w-full mx-auto flex flex-col gap-5">

      {/* Avatar */}
      <div className="flex justify-center mb-2">
        <div className="w-24 h-24 rounded-full bg-soft flex items-center justify-center overflow-hidden">
          <img src={iconoPerfil} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h1 className="color-primary text-2xl font-bold">{t("signup.title")}</h1>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{t("signup.description")}</p>
      </div>

      {/* Username */}
      <InputSpace type="text" placeholder={t("signup.username")} hint="Tu nombre completo" value={username} onChange={setUsername} />

      {/* Email */}
      <InputSpace type="text" placeholder={t("signup.email")} hint="ejemplo@gmail.com" value={email} onChange={setEmail} />

      {/* Password */}
      <InputSpace type="password" placeholder={t("signup.password")} hint="Mínimo 8 caracteres" value={password} onChange={setPassword} />

      <PrimaryButton text={t("signup.submit")} onClick={handleRegister} />

      <p className="text-center text-sm text-gray-400">
        {t("signup.alreadyHaveAccount")}{" "}
        <button onClick={onBack} className="color-primary font-bold">{t("signup.loginLink")}</button>
      </p>

      </div>
      </div>
    </AuthLayout>
  );
}

export default SignUpScreen;
