import { useTranslation } from "react-i18next";
import AppButton from "../ui/AppButton";
import InputSpace from "../ui/InputSpace";
import AuthLayout from "../layout/AuthLayout";
import AuthHeader from "../templates/AuthHeader";
import { useSignUp } from "../../hooks/useSignUp";

/**
 * Props de SignUp.
 */
interface SignUpProps {
  /** Navega hacia atrás a {@link Login}. */
  onBack: () => void;
  /** Se ejecuta al registrarse exitosamente. */
  onRegister: () => void;
}

/**
 * Pantalla de registro de nuevo usuario con nombre, correo y contraseña.
 *
 * Delega el estado y la validación a {@link useSignUp}.
 *
 * @param onBack - Navega hacia atrás (a la pantalla de login).
 * @param onRegister - Se ejecuta al registrarse exitosamente.
 */
function SignUp({ onBack, onRegister }: SignUpProps) {
  const { t } = useTranslation();
  const { fields, setters, handleRegister } = useSignUp(onRegister);

  return (
    <AuthLayout>
      <AuthHeader onBack={onBack} title={t("signup.title")} description={t("signup.description")} />

      <InputSpace type="text" placeholder={t("signup.username")} hint={t("signup.usernameHint")} value={fields.username} onChange={setters.setUsername} />
      <InputSpace type="text" placeholder={t("signup.email")} hint={t("signup.emailHint")} value={fields.email} onChange={setters.setEmail} />
      <InputSpace type="password" placeholder={t("signup.password")} hint={t("signup.passwordHint")} value={fields.password} onChange={setters.setPassword} />

      <AppButton text={t("signup.submit")} onClick={handleRegister} />

      <p className="text-center text-sm text-gray-400">
        {t("signup.alreadyHaveAccount")}{" "}
        <button onClick={onBack} className="color-primary font-bold hover:underline">{t("signup.loginLink")}</button>
      </p>

    </AuthLayout>
  );
}

export default SignUp;
