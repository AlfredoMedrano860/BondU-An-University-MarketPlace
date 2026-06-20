import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import AppButton from "../ui/AppButton";

/**
 * Props de StepNewPassword.
 */
interface StepNewPasswordProps {
  /** Nueva contraseña ingresada. */
  password: string;
  /** Actualiza el valor de la nueva contraseña. */
  onPasswordChange: (value: string) => void;
  /** Confirmación de la nueva contraseña. */
  confirm: string;
  /** Actualiza el valor de la confirmación. */
  onConfirmChange: (value: string) => void;
  /** Valida y actualiza la contraseña en el store. */
  onSubmit: () => void;
}

/**
 * Paso 3 del flujo de recuperación de contraseña: ingreso y confirmación de la nueva contraseña.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param password - Nueva contraseña.
 * @param onPasswordChange - Actualiza la contraseña.
 * @param confirm - Confirmación de la contraseña.
 * @param onConfirmChange - Actualiza la confirmación.
 * @param onSubmit - Valida y guarda la nueva contraseña.
 */
function StepNewPassword({ password, onPasswordChange, confirm, onConfirmChange, onSubmit }: StepNewPasswordProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.newPassword.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.newPassword.description")}
        </p>
      </div>

      <InputSpace type="password" placeholder={t("forgotPassword.newPassword.newPassword")} hint="Mínimo 8 caracteres" value={password} onChange={onPasswordChange} />
      <InputSpace type="password" placeholder={t("forgotPassword.newPassword.confirm")} hint="Repetí tu contraseña" value={confirm} onChange={onConfirmChange} />

      <AppButton text={t("forgotPassword.newPassword.submit")} onClick={onSubmit} />
    </div>
  );
}

export default StepNewPassword;
