import { useTranslation } from "react-i18next";

function CloseSession() {
  const { t } = useTranslation();

  return (
    <div className="mx-7.5 flex items-center justify-center min-h-screen">
      <div className="w-full bg-white border-[0.5px] border-black rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center p-3.75 gap-3.75">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            !
          </div>

          <p className="text-gray-500 text-center">
            {t("dialogs.logout.message")}
          </p>

          <button className="w-[calc(100%-60px)] mx-7.5 bg-white text-blue-600 border-[0.5px] border-blue-600 rounded-xl py-2">
            {t("dialogs.logout.no")}
          </button>

          <button className="w-[calc(100%-60px)] mx-7.5 bg-blue-600 text-white rounded-xl py-2">
            {t("dialogs.logout.confirm")}
          </button>
        </div>

        <div className="h-8 bg-blue-600"></div>
      </div>
    </div>
  );
}

export default CloseSession;
