import CodeInput from "../ui/CodeInput";
import PrimaryButton from "../ui/PrimaryButton";

/**
 * Props de StepCode.
 */
interface StepCodeProps {
  /** Correo al que se envió el código, mostrado en el mensaje. */
  email: string;
  /** Valor actual del código de 4 dígitos. */
  code: string;
  /** Actualiza el valor del código. */
  onCodeChange: (value: string) => void;
  /** Mensaje de error de validación. Vacío si no hay error. */
  error: string;
  /** Se ejecuta al presionar VERIFICAR. */
  onSubmit: () => void;
  /** Se ejecuta al presionar Reenviar para volver al paso 1. */
  onResend: () => void;
}

/**
 * Paso 2 del flujo de recuperación de contraseña.
 *
 * El usuario ingresa el código de 4 dígitos recibido en su correo.
 * Usa {@link CodeInput} para la entrada por cajas separadas.
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param email - Correo al que se envió el código.
 * @param code - Valor actual del código de 4 dígitos.
 * @param onCodeChange - Actualiza el valor del código.
 * @param error - Mensaje de error de validación.
 * @param onSubmit - Se ejecuta al presionar VERIFICAR.
 * @param onResend - Se ejecuta al presionar Reenviar.
 */
function StepCode({ email, code, onCodeChange, error, onSubmit, onResend }: StepCodeProps) {
  return (
    <>
      {/* Título e instrucción */}
      <div className="text-center mb-7">
        <h1 className="color-primary text-3xl font-bold">Verificar código</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          Ingresá el código enviado a{" "}
          <span className="color-primary font-semibold">{email}</span>.
        </p>
        <div className="mt-12">
        <CodeInput value={code} onChange={onCodeChange} />
        </div>
      </div>

      

      {/* Mensaje de error ── reemplazar con sistema de notificaciones */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <PrimaryButton text="VERIFICAR" onClick={onSubmit} />

      {/* Reenviar código */}
      <p className="text-center text-sm text-gray-500">
        ¿No recibiste el código?{" "}
        <button onClick={onResend} className="color-primary font-bold">
          Reenviar
        </button>
      </p>
    </>
  );
}

export default StepCode;