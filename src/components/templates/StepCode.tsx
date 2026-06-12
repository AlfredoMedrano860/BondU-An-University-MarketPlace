import { useTranslation } from "react-i18next";
import CodeInput from "../ui/CodeInput";
import PrimaryButton from "../ui/PrimaryButton";
import ErrorMessage from "../ui/ErrorMessage";

interface StepCodeProps {
  email: string;
  code: string;
  onCodeChange: (value: string) => void;
  error: string;
  onSubmit: () => void;
  onResend: () => void;
}

function StepCode({ email, code, onCodeChange, error, onSubmit, onResend }: StepCodeProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-7">
        <h1 className="color-primary text-3xl font-bold">{t("forgotPassword.code.title")}</h1>
        <p className="text-gray-400 text-sm mt-3 leading-5">
          {t("forgotPassword.code.description")}{" "}
          <span className="color-primary font-semibold">{email}</span>.
        </p>
        <div className="mt-12">
          <CodeInput value={code} onChange={onCodeChange} />
        </div>
      </div>

      <ErrorMessage message={error} />

      <PrimaryButton text={t("forgotPassword.code.submit")} onClick={onSubmit} />

      <p className="text-center text-sm text-gray-500">
        {t("forgotPassword.code.noCode")}{" "}
        <button onClick={onResend} className="color-primary font-bold">
          {t("forgotPassword.code.resend")}
        </button>
      </p>
    </>
  );
}

export default StepCode;
