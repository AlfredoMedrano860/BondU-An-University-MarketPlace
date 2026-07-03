import { useTranslation } from "react-i18next";
import { CopySimpleIcon } from "@phosphor-icons/react";
import { appBaseUrl } from "../data/Terms";
import { notify } from "../data/NotificationStore";
import CircleButton from "../ui/CircleButton";
import InputSpace from "../ui/InputSpace";

/**
 * Props de ShareTab.
 */
interface ShareTabProps {
  /** ID del producto cuya URL se va a compartir. */
  productId: string;
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
    navigator.clipboard
      .writeText(url)
      .then(() => notify.success(t("notifications.linkCopied.title"), t("notifications.linkCopied.message")))
      .catch(() => notify.error(t("notifications.productError.title"), t("notifications.productError.message")));
  };

  return (
    <div className="mt-2">
      <p className="text-[16px] text-[hsl(26,11%,38%)] mb-3">{t("product.shareInstruction")}</p>

      <div className="relative">
        <InputSpace value={url} readOnly className="h-12 bg-search text-[13px] pr-14" />
        <CircleButton variant="secondary" onClick={handleCopy} className="absolute right-0 top-0">
          <CopySimpleIcon size={20} color="white" weight="bold" />
        </CircleButton>
      </div>
    </div>
  );
}

export default ShareTab;
