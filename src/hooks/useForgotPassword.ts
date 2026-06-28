import { useState } from "react";
import { useTranslation } from "react-i18next";
import { authService } from "../services/auth";
import { notify } from "../components/data/NotificationStore";
import { forgotPasswordSchema, resetPasswordSchema } from "../schemas/auth.schema";

export function useForgotPassword(onSuccess: () => void) {
  const { t } = useTranslation();
  const [step,       setStep]       = useState<1 | 2 | 3>(1);
  const [email,      setEmail]      = useState("");
  const [code,       setCode]       = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password,   setPassword]   = useState("");
  const [confirm,    setConfirm]    = useState("");

  async function handleSendCode() {
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      notify.warning(t("notifications.emailRequired.title"), t("notifications.emailRequired.message"));
      return;
    }
    try {
      const res = await authService.forgotPassword({ email });
      setResetToken(res.resetToken);
      notify.info(t("notifications.codeSent.title"), t("notifications.codeSent.message"));
      setStep(2);
    } catch {
      notify.error(t("notifications.emailRequired.title"), t("notifications.emailRequired.message"));
    }
  }

  function handleVerifyCode() {
    if (code.length !== 4) {
      notify.warning(t("notifications.codeIncomplete.title"), t("notifications.codeIncomplete.message"));
      return;
    }
    setStep(3);
  }

  async function handleChangePassword() {
    const result = resetPasswordSchema.safeParse({ password, confirm });
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "notifications.passwordRequired.message";
      notify.warning(t("notifications.passwordRequired.title"), t(msg));
      return;
    }
    try {
      await authService.resetPassword({ resetToken, newPassword: password });
      notify.success(t("notifications.passwordChanged.title"), t("notifications.passwordChanged.message"));
      onSuccess();
    } catch {
      notify.error(t("notifications.passwordRequired.title"), t("notifications.passwordRequired.message"));
    }
  }

  function handleBack(onBack: () => void) {
    if (step === 2) { setStep(1); setCode(""); }
    else if (step === 3) { setStep(2); setPassword(""); setConfirm(""); }
    else onBack();
  }

  function handleResend() {
    setStep(1);
    setCode("");
  }

  return {
    step,
    fields:  { email, code, password, confirm },
    setters: { setEmail, setCode, setPassword, setConfirm },
    handleSendCode,
    handleVerifyCode,
    handleChangePassword,
    handleBack,
    handleResend,
  };
}
