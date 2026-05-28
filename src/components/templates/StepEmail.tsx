import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de StepEmail.
 */
interface StepEmailProps {
  /** Valor actual del campo correo. */
  email: string;
  /** Actualiza el valor del correo. */
  onEmailChange: (value: string) => void;
  /** Mensaje de error de validación. Vacío si no hay error. */
  error: string;
  /** Se ejecuta al presionar ENVIAR CÓDIGO. */
  onSubmit: () => void;
}

/**
 * Paso 1 del flujo de recuperación de contraseña.
 *
 * El usuario ingresa su correo para recibir el código de verificación.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param email - Valor actual del campo correo.
 * @param onEmailChange - Actualiza el valor del correo.
 * @param error - Mensaje de error de validación.
 * @param onSubmit - Se ejecuta al presionar ENVIAR CÓDIGO.
 */
function StepEmail({ email, onEmailChange, error, onSubmit }: StepEmailProps) {
  return (
    <>
      {/* Título e instrucción */}
      <div className="text-center mb-10">
        <h1 className="color-primary text-3xl font-bold">¿Olvidaste tu contraseña?</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          Ingresá tu correo y te enviaremos un código para recuperar tu cuenta.
        </p>
      </div>

      <InputSpace type="text" placeholder="Correo" value={email} onChange={onEmailChange} />

      {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
      {error && <p className="text-red-500 text-sm text-center -mt-2">{error}</p>}

      <PrimaryButton text="ENVIAR CÓDIGO" onClick={onSubmit} />
    </>
  );
}

export default StepEmail;