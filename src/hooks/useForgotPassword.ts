import { useState } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "../components/data/AuthStore";
import { notify } from "../components/data/NotificationStore";

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
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  /**
   * Valida el correo y avanza al paso 2.
   * Simula el envío del código al correo ingresado.
   */
  function handleSendCode() {
    if (!email.trim()) {
      notify.warning(t("notifications.emailRequired.title"), t("notifications.emailRequired.message"));
      return;
    }
    notify.info(t("notifications.codeSent.title"), t("notifications.codeSent.message"));
    setStep(2);
  }

  /**
   * Valida que el código tenga 4 dígitos y avanza al paso 3.
   */
  function handleVerifyCode() {
    if (code.length !== 4) {
      notify.warning(t("notifications.codeIncomplete.title"), t("notifications.codeIncomplete.message"));
      return;
    }
    setStep(3);
  }

  /**
   * Valida que las contraseñas coincidan y actualiza en el AuthStore.
   * Llama a {@link onSuccess} si es exitoso.
   */
  function handleChangePassword() {
    if (!password.trim()) {
      notify.warning(t("notifications.passwordRequired.title"), t("notifications.passwordRequired.message"));
      return;
    }
    if (password !== confirm) {
      notify.warning(t("notifications.passwordMismatch.title"), t("notifications.passwordMismatch.message"));
      return;
    }
    updateUser({ password });
    notify.success(t("notifications.passwordChanged.title"), t("notifications.passwordChanged.message"));
    onSuccess();
  }

  /**
   * Retrocede al paso anterior limpiando los campos correspondientes.
   * @param onBack - Se ejecuta si se retrocede desde el paso 1.
   */
  function handleBack(onBack: () => void) {
    if (step === 2) { setStep(1); setCode(""); }
    else if (step === 3) { setStep(2); setPassword(""); setConfirm(""); }
    else onBack();
  }

  /** Vuelve al paso 1 y limpia el código. Usado en el botón Reenviar. */
  function handleResend() {
    setStep(1);
    setCode("");
  }

  return {
    step,
    fields: { email, code, password, confirm },
    setters: { setEmail, setCode, setPassword, setConfirm },
    handleSendCode,
    handleVerifyCode,
    handleChangePassword,
    handleBack,
    handleResend,
  };
}