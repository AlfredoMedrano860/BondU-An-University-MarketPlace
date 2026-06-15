import { useTranslation } from "react-i18next";
import CodeInput from "../ui/CodeInput";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de StepCode.
 */
interface StepCodeProps {
  /** Correo al que se envió el código (se muestra en el texto). */
  email: string;
  /** Valor actual del código de 4 dígitos. */
  code: string;
  /** Actualiza el valor del código. */
  onCodeChange: (value: string) => void;
  /** Valida el código y avanza al paso 3. */
  onSubmit: () => void;
  /** Reenvía el código volviendo al paso 1. */
  onResend: () => void;
}

/**
 * Paso 2 del flujo de recuperación de contraseña: ingreso del código de verificación.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param email - Correo mostrado en el texto de instrucción.
 * @param code - Valor del código de 4 dígitos.
 * @param onCodeChange - Actualiza el código.
 * @param onSubmit - Valida y avanza al siguiente paso.
 * @param onResend - Vuelve al paso 1 para reenviar el código.
 */
function StepCode({ email, code, onCodeChange, onSubmit, onResend }: StepCodeProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.code.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.code.description")}{" "}
          <span className="color-primary font-semibold">{email}</span>.
        </p>
      </div>

      <div className="flex justify-center">
        <CodeInput value={code} onChange={onCodeChange} />
      </div>

      <PrimaryButton text={t("forgotPassword.code.submit")} onClick={onSubmit} />

      <p className="text-center text-sm text-gray-500">
        {t("forgotPassword.code.noCode")}{" "}
        <button onClick={onResend} className="color-primary font-bold">
          {t("forgotPassword.code.resend")}
        </button>
      </p>
    </div>
  );
}

export default StepCode;
