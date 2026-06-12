import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";
import ErrorMessage from "../ui/ErrorMessage";

interface StepNewPasswordProps {
  password: string;
  onPasswordChange: (value: string) => void;
  confirm: string;
  onConfirmChange: (value: string) => void;
  error: string;
  onSubmit: () => void;
}

function StepNewPassword({ password, onPasswordChange, confirm, onConfirmChange, error, onSubmit }: StepNewPasswordProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.newPassword.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.newPassword.description")}
        </p>
      </div>

      <InputSpace type="password" placeholder={t("forgotPassword.newPassword.newPassword")} value={password} onChange={onPasswordChange} />
      <InputSpace type="password" placeholder={t("forgotPassword.newPassword.confirm")} value={confirm} onChange={onConfirmChange} />

      <ErrorMessage message={error} />

      <PrimaryButton text={t("forgotPassword.newPassword.submit")} onClick={onSubmit} />
    </>
  );
}

export default StepNewPassword;
