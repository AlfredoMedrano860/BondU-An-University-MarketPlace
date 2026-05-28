import { useState } from "react";
import { updateUser } from "../components/data/AuthStore";

/**
 * Hook para manejar el estado y lógica del flujo de recuperación de contraseña.
 *
 * Gestiona los tres pasos del flujo:
 * - **Paso 1**: validación del correo.
 * - **Paso 2**: validación del código de 4 dígitos.
 * - **Paso 3**: validación y actualización de la nueva contraseña.
 *
 * Usado en {@link ForgotPasswordScreen}.
 *
 * @param onSuccess - Se ejecuta al completar el proceso exitosamente.
 * @returns Estado de cada campo, funciones de actualización y handlers de cada paso.
 */
export function useForgotPassword(onSuccess: () => void) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  /**
   * Valida el correo y avanza al paso 2.
   * Simula el envío del código al correo ingresado.
   */
  function handleSendCode() {
    if (!email.trim()) { setError("Ingresá tu correo."); return; }
    setError("");
    setStep(2);
  }

  /**
   * Valida que el código tenga 4 dígitos y avanza al paso 3.
   */
  function handleVerifyCode() {
    if (code.length !== 4) { setError("Ingresá los 4 dígitos del código."); return; }
    setError("");
    setStep(3);
  }

  /**
   * Valida que las contraseñas coincidan y actualiza en el AuthStore.
   * Llama a {@link onSuccess} si es exitoso.
   */
  function handleChangePassword() {
    if (!password.trim()) { setError("Ingresá una nueva contraseña."); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden."); return; }
    updateUser({ password });
    setError("");
    onSuccess();
  }

  /**
   * Retrocede al paso anterior limpiando los campos correspondientes.
   * @param onBack - Se ejecuta si se retrocede desde el paso 1.
   */
  function handleBack(onBack: () => void) {
    if (step === 2) { setStep(1); setCode(""); setError(""); }
    else if (step === 3) { setStep(2); setPassword(""); setConfirm(""); setError(""); }
    else onBack();
  }

  /** Vuelve al paso 1 y limpia el código. Usado en el botón Reenviar. */
  function handleResend() {
    setStep(1);
    setCode("");
    setError("");
  }

  return {
    step,
    fields: { email, code, password, confirm },
    setters: { setEmail, setCode, setPassword, setConfirm },
    error,
    handleSendCode,
    handleVerifyCode,
    handleChangePassword,
    handleBack,
    handleResend,
  };
}