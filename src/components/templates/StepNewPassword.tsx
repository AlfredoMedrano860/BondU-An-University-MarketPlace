import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de StepNewPassword.
 */
interface StepNewPasswordProps {
  /** Valor actual del campo nueva contraseña. */
  password: string;
  /** Actualiza el valor de la nueva contraseña. */
  onPasswordChange: (value: string) => void;
  /** Valor actual del campo confirmar contraseña. */
  confirm: string;
  /** Actualiza el valor de confirmar contraseña. */
  onConfirmChange: (value: string) => void;
  /** Mensaje de error de validación. Vacío si no hay error. */
  error: string;
  /** Se ejecuta al presionar CAMBIAR CONTRASEÑA. */
  onSubmit: () => void;
}

/**
 * Paso 3 del flujo de recuperación de contraseña.
 *
 * El usuario ingresa y confirma su nueva contraseña.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param password - Valor actual del campo nueva contraseña.
 * @param onPasswordChange - Actualiza el valor de la nueva contraseña.
 * @param confirm - Valor actual del campo confirmar contraseña.
 * @param onConfirmChange - Actualiza el valor de confirmar contraseña.
 * @param error - Mensaje de error de validación.
 * @param onSubmit - Se ejecuta al presionar CAMBIAR CONTRASEÑA.
 */
function StepNewPassword({ password, onPasswordChange, confirm, onConfirmChange, error, onSubmit }: StepNewPasswordProps) {
  return (
    <>
      {/* Título e instrucción */}
      <div className="text-center mb-10">
        <h1 className="color-primary text-3xl font-bold">Nueva contraseña</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          Ingresá tu nueva contraseña para recuperar el acceso.
        </p>
      </div>

      <InputSpace type="password" placeholder="Nueva contraseña" value={password} onChange={onPasswordChange} />
      <InputSpace type="password" placeholder="Confirmar contraseña" value={confirm} onChange={onConfirmChange} />

      {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
      {error && <p className="text-red-500 text-sm text-center -mt-2">{error}</p>}

      <PrimaryButton text="CAMBIAR CONTRASEÑA" onClick={onSubmit} />
    </>
  );
}

export default StepNewPassword;