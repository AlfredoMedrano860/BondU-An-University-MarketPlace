import { useTranslation } from "react-i18next";
import InputSpace from "../ui/InputSpace";
import PrimaryButton from "../ui/PrimaryButton";
import ErrorMessage from "../ui/ErrorMessage";

interface StepEmailProps {
  email: string;
  onEmailChange: (value: string) => void;
  error: string;
  onSubmit: () => void;
}

function StepEmail({ email, onEmailChange, error, onSubmit }: StepEmailProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.email.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.email.description")}
        </p>
      </div>

      <InputSpace type="text" placeholder={t("forgotPassword.email.email")} value={email} onChange={onEmailChange} />

      <ErrorMessage message={error} />

      <PrimaryButton text={t("forgotPassword.email.submit")} onClick={onSubmit} />
    </>
  );
}

export default StepEmail;
