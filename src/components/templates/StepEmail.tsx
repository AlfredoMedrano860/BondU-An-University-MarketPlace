import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de StepEmail.
 */
interface StepEmailProps {
  /** Valor actual del campo de correo electrónico. */
  email: string;
  /** Actualiza el valor del correo. */
  onEmailChange: (value: string) => void;
  /** Valida el correo y avanza al paso 2. */
  onSubmit: () => void;
}

/**
 * Paso 1 del flujo de recuperación de contraseña: ingreso del correo electrónico.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param email - Valor del campo de correo.
 * @param onEmailChange - Actualiza el correo.
 * @param onSubmit - Avanza al siguiente paso.
 */
function StepEmail({ email, onEmailChange, onSubmit }: StepEmailProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.email.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.email.description")}
        </p>
      </div>

      <InputSpace type="text" placeholder={t("forgotPassword.email.email")} hint="ejemplo@gmail.com" value={email} onChange={onEmailChange} />

      <PrimaryButton text={t("forgotPassword.email.submit")} onClick={onSubmit} />
    </div>
  );
}

export default StepEmail;
