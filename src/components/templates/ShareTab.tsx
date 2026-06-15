import { useTranslation } from "react-i18next";
import { CopySimpleIcon } from "@phosphor-icons/react";
import { appBaseUrl } from "../data/Terms";
import { notify } from "../data/NotificationStore";

/**
 * Props de ShareTab.
 */
interface ShareTabProps {
  /** ID del producto cuya URL se va a compartir. */
  productId: number;
}

/**
 * Pestaña de compartir en el detalle de un producto.
 *
 * Muestra la URL pública del producto y permite copiarla al portapapeles.
 * Emite una notificación de éxito tras copiar.
 * Usado en {@link ProductTabs}.
 *
 * @param productId - ID del producto para construir la URL.
 */
function ShareTab({ productId }: ShareTabProps) {
  const { t } = useTranslation();
  const url = `${appBaseUrl}/product/${productId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      notify.success(t("notifications.linkCopied.title"), t("notifications.linkCopied.message"));
    });
  };

  return (
    <div className="mt-2">

      <p className="text-[16px] text-[hsl(26,11%,38%)] mb-3">{t("product.shareInstruction")}</p>

      <div className="flex items-center gap-0">
        <div className="relative flex-1">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full h-12 rounded-full pl-5 pr-5 bg-search text-black text-[13px]"
          />
          <button
            onClick={handleCopy}
            className="cursor-pointer absolute right-0 top-0 h-12 w-12 bg-secondary rounded-full flex items-center justify-center"
          >
            <CopySimpleIcon size={20} color="white" weight="bold" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default ShareTab;
