import { useState } from "react";
import register from "../../assets/imgs/RegisterCard.png";
import BackButton from "../ui/BackButton";
import StepEmail from "../templates/StepEmail";
import StepCode from "../templates/StepCode";
import StepNewPassword from "../templates/StepNewPassword";
import { useForgotPassword } from "../../hooks/useForgotPassword";

/**
 * Props de ForgotPasswordScreen.
 */
interface ForgotPasswordScreenProps {
  /** Navega a la pantalla anterior. */
  onBack: () => void;
  /** Se ejecuta al completar el proceso de recuperación exitosamente. */
  onSuccess: () => void;
}

/**
 * Pantalla de recuperación de contraseña en tres pasos.
 *
 * Delega el estado y validaciones a {@link useForgotPassword}.
 * Renderiza el paso activo con:
 * - {@link StepEmail} — paso 1.
 * - {@link StepCode} — paso 2.
 * - {@link StepNewPassword} — paso 3.
 *
 * @param onBack - Navega a la pantalla anterior.
 * @param onSuccess - Se ejecuta al completar el proceso exitosamente.
 */
function ForgotPasswordScreen({ onBack, onSuccess }: ForgotPasswordScreenProps) {
  const { step, fields, setters, error, handleSendCode, handleVerifyCode, handleChangePassword, handleBack, handleResend, } = useForgotPassword(onSuccess);

  return (
    <>
    <div className="min-h-screen flex flex-col bg-beige">

      {/* ── HEADER ── */}
      <div className="pt-10">
        <BackButton onClick={() => handleBack(onBack)} />
      </div>

      {/* ── ILUSTRACIÓN ── */}
      <div className="relative w-full h-52 mt-10">
        <img src={register} alt="Mascota" className="w-50 absolute bottom-0 left-1/2 -translate-x-1/2 z-0" />
      </div>

      {/* ── CONTENIDO ── paso activo según el estado */}
      <div className="info-card bg-white-app w-full mt-5 px-8 pt-20 pb-20 flex flex-col gap-5 relative z-10">
        {step === 1 && (
          <StepEmail email={fields.email} onEmailChange={setters.setEmail} error={error} onSubmit={handleSendCode} />
        )}
        {step === 2 && (
          <StepCode email={fields.email} code={fields.code} onCodeChange={setters.setCode} error={error} onSubmit={handleVerifyCode} onResend={handleResend} />
        )}
        {step === 3 && (
          <StepNewPassword password={fields.password} onPasswordChange={setters.setPassword} confirm={fields.confirm} onConfirmChange={setters.setConfirm} error={error} onSubmit={handleChangePassword} />
        )}
      </div>

    </div>
    </>
  );
}

export default ForgotPasswordScreen;