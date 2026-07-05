import StepEmail from "../templates/StepEmail";
import StepCode from "../templates/StepCode";
import StepNewPassword from "../templates/StepNewPassword";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import AuthLayout from "../layout/AuthLayout";

/**
 * Props de ForgotPassword.
 */
interface ForgotPasswordProps {
  /** Navega hacia atrás (o retrocede dentro del flujo de pasos). */
  onBack: () => void;
  /** Se ejecuta al completar el cambio de contraseña exitosamente. */
  onSuccess: () => void;
}

/**
 * Pantalla de recuperación de contraseña en 3 pasos.
 *
 * Delega el estado y los handlers a {@link useForgotPassword} y renderiza
 * el sub-componente correspondiente al paso activo:
 * {@link StepEmail} → {@link StepCode} → {@link StepNewPassword}.
 *
 * @param onBack - Navega hacia atrás o retrocede el flujo.
 * @param onSuccess - Callback tras cambio exitoso de contraseña.
 */

function ForgotPassword({ onBack, onSuccess }: ForgotPasswordProps) {
  const { step, fields, setters, handleSendCode, handleVerifyCode, handleChangePassword, handleBack, handleResend } = useForgotPassword(onSuccess);

  return (
    <AuthLayout onBack={() => handleBack(onBack)}>
      {step === 1 && <StepEmail email={fields.email} onEmailChange={setters.setEmail} onSubmit={handleSendCode} />}
      {step === 2 && <StepCode email={fields.email} code={fields.code} onCodeChange={setters.setCode} onSubmit={handleVerifyCode} onResend={handleResend} />}
      {step === 3 && <StepNewPassword password={fields.password} onPasswordChange={setters.setPassword} confirm={fields.confirm} onConfirmChange={setters.setConfirm} onSubmit={handleChangePassword} />}
    </AuthLayout>
  );
}

export default ForgotPassword;
